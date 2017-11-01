var Presale = artifacts.require("./Presale.sol");
var ICO = artifacts.require("./EristicaICO.sol");
var config = require('./config.json');

module.exports = function(deployer) {
  deployer.deploy(Presale).then(function() {
  return deployer.deploy(ICO, Presale.address, config.Company, config.BountyFund, config.AdvisorsFund, config.TeamFund, config.ChallengeFund, config.Manager, config.Controller_Address1, config.Controller_Address2, config.Controller_Address3);
});;
};
