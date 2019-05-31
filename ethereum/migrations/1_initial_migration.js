var Migrations = artifacts.require("./Migrations.sol");
var Records = artifacts.require('./Records.sol');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Records);
};
