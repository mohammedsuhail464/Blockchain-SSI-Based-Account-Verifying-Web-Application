pragma solidity ^0.6.6;

import './DetailAdder.sol';

contract Recipient {
    
    mapping (address => address[]) public recipientDetailAdders;
    
    constructor() public {}
    
    function createDetailAdderBundle(
        bytes32 _description,
        uint _count,
        address _uniqueaddresslinkerAddr,
        address _senderAddr
    ) public {

        DetailAdder detailAdder = new DetailAdder(
            msg.sender,
            address(bytes20(sha256(abi.encodePacked(msg.sender, now)))),
            _description,
            _count,
            _uniqueaddresslinkerAddr,
            _senderAddr
        );
        
        recipientDetailAdders[msg.sender].push(address(detailAdder));
    }
    
    
    function getNoOfBundlesOfRecipient() public view returns(uint) {
        return recipientDetailAdders[msg.sender].length;
    }
    
    
    function getAllBundles() public view returns(address[] memory) {
        uint len = recipientDetailAdders[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = recipientDetailAdders[msg.sender][i];
        }
        return ret;
    }
}