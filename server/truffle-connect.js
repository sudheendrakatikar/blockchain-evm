const contract = require('truffle-contract');
const records_artifact = require('../ethereum/build/contracts/Records.json');
const Records = contract(records_artifact);

module.exports = {
    
    addNumbers: function(a, b, callback) {
        var self = this;
        Records.setProvider(self.web3.currentProvider);

        var record;
        Records.deployed().then(function(instance) {
            record = instance;
            return record.addNumber(a, b);
        }).then(function(value) {
            callback(value.toNumber());
        });
    },

    saveRecord: function(transaction_id, verifier_hash, callback) {
        var self = this;
        Records.setProvider(self.web3.currentProvider);

        var record;
        sender = '0xB3AD47aB9ba79B914aDfD5250A83de11a14c8bE1';
        Records.deployed().then(function(instance) {
            record = instance;
            return record.saveRecord(transaction_id, verifier_hash, {from: sender});
        }).then(function(reply) {
            callback(reply);
        });
    },

    verifyRecord: function(transaction_id, verifier_hash, callback) {
        var self = this;
        Records.setProvider(self.web3.currentProvider);

        var record;
        Records.deployed().then(function(instance) {
            record = instance;
            return record.verifyRecord(transaction_id, verifier_hash)
        }).then(function(answer) {
            callback(answer);
        });
    }
}