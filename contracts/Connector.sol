pragma solidity ^0.6.6;

import './VerifyB_CO.sol';
import './Verify.sol';
import './VerifyCO_C.sol';

contract Connector {
    
    mapping(address => address[]) public VerifiesAtConnector;
    mapping(address => address[]) public VerifyCOtoC;
    mapping(address => address) public VerifyCOtoCTxContract;
    
    function verifyRecievedAtConnector(
        address _address, 
        address cid
        ) public {
            
        uint rtype = Verify(_address).receivedVerify(msg.sender);
        if(rtype == 2){
            VerifiesAtConnector[msg.sender].push(_address);
            if(Verify(_address).getBCOC()[0] != address(0)){
                VerifyB_CO(cid).receiveBCO(_address, msg.sender);
            }
        }
    }


    function carryVerifyCOtoC(
        address _address,
        address uniqueaddresslinker,
        address receiver
    ) public {
        VerifyCO_C dp = new VerifyCO_C(
            _address,
            msg.sender,
            uniqueaddresslinker,
            receiver
        );
        VerifyCOtoC[msg.sender].push(address(dp));
        VerifyCOtoCTxContract[_address] = address(dp);
    }

}