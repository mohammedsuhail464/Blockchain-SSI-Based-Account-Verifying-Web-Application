pragma solidity ^0.6.6;

import './VerifyCO_C.sol';

contract Customer {
    
    mapping(address => address[]) public VerifyBunchAtCustomer;
    mapping(address => verifyingtatus) public verifying;

    enum verifyingtatus {
        notfound,
        atcustomer,
        sold,
        expired,
        damaged
    }

    event VerifyStatus(
        address _address,
        address indexed Customer,
        uint status
    );

    function verifyRecievedAtCustomer(
        address _address,
        address cid
    ) public {
        VerifyCO_C(cid).receiveCOC(_address, msg.sender);
        VerifyBunchAtCustomer[msg.sender].push(_address);
        verifying[_address] = verifyingtatus(1);
    }

    function updateVerifyingStatus(
        address _address,
        uint Status
    ) public {
        verifying[_address] = verifyingtatus(Status);
        emit VerifyStatus(_address, msg.sender, Status);
    }

    function verifyingInfo(
        address _address
    ) public
    view
    returns(
        uint Status
    ){
        return uint(verifying[_address]);
    }

}