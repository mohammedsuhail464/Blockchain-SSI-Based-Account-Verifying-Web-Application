var VerificationChain = artifacts.require('VerificationChain');

module.exports = function(deployer) {
  deployer.deploy(VerificationChain);
};