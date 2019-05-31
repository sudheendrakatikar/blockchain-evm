const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate-model');
const Vote = require('../models/vote-model');
const sha = require('crypto-js/sha1');

//Add candidate
router.post('/addCandidate', function(req, res) {
    let newCandidate = new Candidate({
        _id: req.body._id,
        name: req.body.name,
        party: req.body.party,
        symbol: req.body.symbol
    });
    Candidate.addCandidate(newCandidate, function(err) {
        if (err) {
            res.json({
                status: false,
                msg: "Failed to add candidate"
            });
        }
        else {
            res.json({
                status: true,
                msg: "Candidate added"
            });
        }
    });
});

//Get candidates
router.get('/getCandidates', function(req, res) {
    Candidate.getCandidates(function(err, candidates) {
        if (err) throw err;
        else res.json(candidates);
    });
});

router.delete('/removeCandidate', function(req, res) {
    Candidate.removeCandidate(req.body.id, function(err) {
        if (err) {
            res.json({"msg": "delete fail"});
        }
        else {
            res.json({"msg": "success"});
        }
    });
});

router.post('/checkVoter', function(req, res) {
    voter_hash = sha(req.body.voter_id.toString()).toString();
    Vote.checkVoter(voter_hash, function(err, voter) {
        if (err) throw err;
        if (voter == undefined) {
            res.send(false);
        }
        else {
            res.send(voter);
        }
    });
});

module.exports = router;