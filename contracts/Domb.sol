//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Domb {
    //address of the owner
    address public owner;

    //mapping for the user address and their holdings of domb
    mapping(address => uint) balance;

    //set the maximum total number of domb available
    uint public maxDomb = 100000;

    constructor() {
        //make the person deploying the contract as the owner
        owner = msg.sender;
        //on deployment assign all the tokens to the owner
        balance[owner] = maxDomb;
    }

    //function to check balance of any user from the mapping
    function balanceOf(address _user) public view returns(uint) {
        return balance[_user];
    }

    //function to transfer token from one account to other
    function transfer(address _from, address _to, uint _value) public {
        //check if the sender have enough to send
        require(balanceOf(_from) >= _value, "Insufficient balance");
        //deduct and transfer
        balance[_from] -= _value;
        balance[_to] += _value;
    }
}