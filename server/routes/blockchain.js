const express = require('express');
const router = express.Router();
const sha = require('crypto-js/sha1');
const truffle_connect = require('../truffle-connect');

// Write vote to the blockchain
router.post('/saveRecord', function(req, res) {
    let transaction_id = req.body.transaction_id.toString();
    let candidate_id = req.body.candidate_id.toString();
    var result = transaction_id.concat(candidate_id).toString();
    verifier_hash = sha(result).toString();
    truffle_connect.saveRecord(transaction_id, verifier_hash, function(reply) {
        res.json({"msg": reply});
    });
});

// Verify vote from blockchain  
router.post('/verifyVote', function(req, res) {
    let transaction_id = req.body.transaction_id.toString();
    let candidate_id = req.body.candidate_id.toString();
    var result = transaction_id.concat(candidate_id).toString();
    verifier_hash = sha(result).toString();
    //res.send('Reading '+verifier_hash_maybe+' from BC');
    truffle_connect.verifyRecord(transaction_id, verifier_hash, function(reply) {
        res.send(reply);
    });
});

module.exports = router;