pragma solidity ^0.6.6;

import './VerifyB_CO.sol';
import './Verify.sol';

contract Banker {
    
    mapping(address => address[]) public VerifiesAtBanker;
    mapping(address => address[]) public VerifyBtoCO;
    mapping(address => address) public VerifyBtoCOTxContract;
    
    constructor() public {}
    
    function verifyRecievedAtBanker(
        address _address
    ) public {

        uint rtype = Verify(_address).receivedVerify(msg.sender);
        if(rtype == 1){
            VerifiesAtBanker[msg.sender].push(_address);
        }
    }
    
    function carryVerifyBtoCO(
        address _address,
        address uniqueaddresslinker,
        address receiver
    ) public {
        
        VerifyB_CO wd = new VerifyB_CO(
            _address,
            msg.sender,
            uniqueaddresslinker,
            receiver
        );
        VerifyBtoCO[msg.sender].push(address(wd));
        VerifyBtoCOTxContract[_address] = address(wd);
    }
}