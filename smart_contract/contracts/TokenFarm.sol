// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.5.16;

import "./CredToken.sol";
import "./TestToken.sol";

contract TokenFarm {
  string public name = "Cred Token Farm";
  address public owner;
  CredToken public credToken;
  TestToken public testToken;
  

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;
  constructor(CredToken _credToken, TestToken _testToken) public {
    credToken = _credToken;
    testToken = _testToken;
    owner = msg.sender;
 }
// 1. Stakes Tokens(Deposit)
function stakeTokens(uint _amount) public {
  //require amount staked is greater than 0

  require(_amount > 0, "amount cannot be 0");
  
  // Transfer Mock Dai tokens to this contract for staking
  testToken.transferFrom(msg.sender, address(this), _amount);

  //Update staking balance
  stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

  stakers.push(msg.sender);

  //Add user to stakers array *only* if they havent staked already
  if(!hasStaked[msg.sender]){
    stakers.push(msg.sender);
  } 
// Update staking status
  isStaking[msg.sender] = true;
  hasStaked[msg.sender] = true;
}
// 2. Unstaking Tokens(Withdraw)
function unstakeTokens() public {
  //Fetch staking balance
  uint balance = stakingBalance[msg.sender];

  //require amount greater than 0
  require(balance > 0, "staking balance cannot be 0");

  //Transfer Mock Dai tokens to this contract for staking

  testToken.transfer(msg.sender, balance);

  //Reset staking balance

  stakingBalance[msg.sender] = 0;

  // Update staking status
  isStaking[msg.sender] = false;
}

//3. Issuing Tokens

function issueTokens() public {
  require(msg.sender == owner, 'caller must be the owner');
  for (uint i=0; i<stakers.length; i++){
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient];
      if (balance > 0){
        credToken.transfer(recipient, balance);
      }
      
  }
}
} 
