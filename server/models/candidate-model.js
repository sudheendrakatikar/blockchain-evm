const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema(
    {
        _id: {
            type: String
        },
        name: {
            type: String
        },
        party: {
            type: String
        },
        symbol: {
            type: String
        }
    }
);

const Candidate = module.exports = mongoose.model('Candidate', CandidateSchema);

//Add candidate
module.exports.addCandidate = function(newCandidate, callback) {
    newCandidate.save(callback);
}

//Get candidates
module.exports.getCandidates = function(callback) {
    Candidate.find(callback);
}

module.exports.getCandidateID = function(callback) {
    Candidate.find({}, { _id:0, id:1 }, callback);
}

//Remove candidate
module.exports.removeCandidate = function(candidate_id, callback) {
    Candidate.findOneAndDelete({id: candidate_id}, callback);
}