pragma solidity ^0.6.6;

import './Verify.sol';

contract VerifyCO_C {

    address Admin;

    enum bundleStatus { atcreator, gathered, sent }

    address veriAddr;
    address sender;
    address uniqueaddresslinker;
    address receiver;
    bundleStatus status;

    constructor(
        address _address,
        address Sender,
        address Uniqueaddresslinker,
        address Receiver
    ) public {
        Admin = Sender;
        veriAddr = _address;
        sender = Sender;
        uniqueaddresslinker = Uniqueaddresslinker;
        receiver = Receiver;
        status = bundleStatus(0);
    }

    function pickDC(
        address _address,
        address uniqueaddresslinkerAddr
    ) public {
        require(
            uniqueaddresslinker == uniqueaddresslinkerAddr,
            "Only Associated uniqueaddresslinker can call this function."
        );
        status = bundleStatus(1);

        Verify(_address).sendCOtoC(
            receiver,
            sender
        );
    }


    function receiveCOC(
        address _address,
        address Receiver
    ) public {
        require(
            Receiver == receiver,
            "Only Associated receiver can call this function."
        );
        status = bundleStatus(2);
        Verify(_address).receivedDtoC(
            Receiver
        );
    }

    function get_addressStatus() public view returns(
        uint
    ) {
        return uint(status);
    }

}