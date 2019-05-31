const express = require('express');
const router = express.Router();
const truffle_connect = require('../truffle-connect');
const socket = require('../server');
const Candidate = require('../models/candidate-model');
const Vote = require('../models/vote-model');
const Hash = require('../models/hash-model');
const sha = require('crypto-js/sha1');

const io_client = require('socket.io-client');
const socket_client = io_client.connect('http://localhost:6000');
socket_client.on('vote', function(vote) {
    saveVote(vote);
});

// Save vote
router.post('/saveVote', function(req, res) {
    transaction_id = generateTransactionID().toString();
    voter_id = req.body.voter_id.toString();
    voter_hash = sha(voter_id).toString();
    candidate_id = req.body.candidate_id.toString();
    
    Hash.getCurrentHash(function(err, current_hash) {
        let newVote = new Vote({
            transaction_id: this.transaction_id,
            hash_voter_id: this.voter_hash,
            candidate_id: this.candidate_id,
            timestamp: Date.now(),
            previous_hash: current_hash
        });

        broadcast(newVote);
        var new_hash = sha(newVote.toString()).toString();
        Hash.updateHash(new_hash, function(err, hash) {
            res.json({success:true, msg: newVote.transaction_id});
        });
    });

    

});

// Get results
router.get('/getResults', function(req, res) {
    Vote.getVotes(function(err, votes) {
        if (err) throw err;
        res.json(votes);
    });
});

// Generate random tx id
function generateTransactionID() {
    var result = '';
    var length = 16;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function broadcast(newVote) {
    socket_client.emit('vote', newVote);
}

function saveVote(vote) {
    let newVote = new Vote(vote);
    Vote.saveVote(newVote, function(err, vote) {
        if (err) {
            console.log(err);
        }
        else {
            result = newVote.transaction_id.concat(newVote.candidate_id);
            verifier_hash = sha(result).toString();
            truffle_connect.saveRecord(newVote.transaction_id, verifier_hash, function(reply) { });
        }
    });
}

module.exports = router;