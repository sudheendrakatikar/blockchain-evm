const mongoose = require('mongoose');

const VoteSchema = mongoose.Schema(
    {   
        transaction_id: {
            type: String
        },
        hash_voter_id: {
            type: String
        },
        candidate_id: {
            type: String
        },
        timestamp: {
            type: String
        },
        previous_hash: {
            type: String
        }
    }
);

const Vote = module.exports = mongoose.model('Vote', VoteSchema);

// Check voter
module.exports.checkVoter = function(voter_hash, callback) {
    Vote.findOne({ hash_voter_id: voter_hash },{ _id: 0, transaction_id: 1 }, callback);
}

// Save vote
module.exports.saveVote = function(newVote, callback) {
    newVote.save(callback);
}

module.exports.countVotes = function(id, callback) {
    Vote.countDocuments({ candidate_id: id }, callback);
}

module.exports.getVotes = function(callback) {
    const opts = [
        {
            $unwind: "$candidate_id"
        },
        {
            $group: {
                _id: "$candidate_id",
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ]
    Vote.aggregate(opts, callback);
}