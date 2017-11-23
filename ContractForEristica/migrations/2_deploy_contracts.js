var Presale = artifacts.require("./Presale.sol");
var ICO = artifacts.require("./EristicaICO.sol");
var config = require('./config.json');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Presale).then(function() {
  return deployer.deploy(ICO, Presale.address, accounts[6], accounts[5], accounts[4], accounts[3], accounts[2], accounts[0], accounts[1], accounts[1], accounts[1]);
})
};
