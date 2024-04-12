pragma solidity ^0.6.6;

import './DetailAdder.sol';
import './Verify.sol';

contract Sender {
    
    mapping (address => address[]) public senderDetailAdders;
    mapping (address => address[]) public senderVerifies;

    constructor() public {}
    
    function senderReceivedBundle(
        address _addr,
        address _senderAddress
        ) public {
            
        DetailAdder(_addr).receivedBundle(_senderAddress);
        senderDetailAdders[_senderAddress].push(_addr);
    }
    
    
    function senderCreatesVerify(
        address _senderAddr,
        bytes32 _description,
        address[] memory _detailAddr,
        uint _count,
        address[] memory _uniqueaddresslinkerAddr,
        address _recieverAddr,
        uint RcvrType
        ) public {
            
        Verify _verify = new Verify(
            _senderAddr,
            _description,
            _detailAddr,
            _count,
            _uniqueaddresslinkerAddr,
            _recieverAddr,
            RcvrType
        );
        
        senderVerifies[_senderAddr].push(address(_verify));
        
    }
    
}