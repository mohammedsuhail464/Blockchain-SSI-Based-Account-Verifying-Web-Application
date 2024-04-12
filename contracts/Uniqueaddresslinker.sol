pragma solidity ^0.6.6;

import './DetailAdder.sol';
import './Verify.sol';
import './VerifyB_CO.sol';
import './VerifyCO_C.sol';

contract Uniqueaddresslinker {
    
    function handleBundle(
        address _addr,
        uint uniqueaddresslinkertype,
        address cid
        ) public {

        if(uniqueaddresslinkertype == 1) { 
    
            DetailAdder(_addr).pickBundle(msg.sender);
        } else if(uniqueaddresslinkertype == 2) { 
            Verify(_addr).pickVerify(msg.sender);
        } else if(uniqueaddresslinkertype == 3) {   
            VerifyB_CO(cid).pickBCO(_addr, msg.sender);
        } else if(uniqueaddresslinkertype == 4) {   
            VerifyCO_C(cid).pickCOC(_addr, msg.sender);
        }
    }
    
    
}