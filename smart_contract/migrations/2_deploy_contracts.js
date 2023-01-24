const CredToken = artifacts.require('CredToken');
const TestToken = artifacts.require('TestToken');
const TokenFarm = artifacts.require('TokenFarm');

module.exports = async function(deployer, _network, accounts) {
  //Deploy Mock DAI Token

  await deployer.deploy(TestToken);
  const testToken = await TestToken.deployed();

 //Deploy Dapp Token
  await deployer.deploy(CredToken);
  const credToken = await CredToken.deployed();

  //Deploy TokenFarm
  await deployer.deploy(TokenFarm, credToken.address, testToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //Transfer all tokens to TokenFarm (1 million)
  await credToken.transfer(tokenFarm.address, '1000000000000000000000');

  //Transfer 100 Mock DAI tokens to investor
  await testToken.transfer(accounts[1], '100000000000000000');
  
};
