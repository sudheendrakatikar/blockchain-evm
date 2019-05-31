const mongoose = require('mongoose');

const HashSchema = mongoose.Schema(
    {
        currentHash: {
            type: String
        }
    }
);

const Hash = module.exports = mongoose.model('Hash', HashSchema);

// Get current block hash
module.exports.getCurrentHash = function(callback) {
    Hash.find({}, { _id:0, currentHash: 1 }, callback);
}

// Update hash
module.exports.updateHash = function(hash, callback) {
    Hash.updateOne({}, { currentHash: hash }, callback);
}