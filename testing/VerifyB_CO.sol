pragma solidity ^0.6.6;

import './Verify.sol';

contract VerifyB_CO {

    address Admin;

    enum bundleStatus { atcreator, gathered, sent }

    address veriId;
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
        veriId = _address;
        sender = Sender;
        uniqueaddresslinker = Uniqueaddresslinker;
        receiver = Receiver;
        status = bundleStatus(0);
    }


    function pickBD(
        address _address,
        address _uniqueaddresslinker
    ) public {
        require(
            uniqueaddresslinker == _uniqueaddresslinker,
            "Only Associated loadper can call this function."
        );
        status = bundleStatus(1);

        Verify(_address).sendBtoD(
            receiver,
            sender
        );
    }

    function receiveBD(
        address _address,
        address Receiver
    ) public {
        require(
            Receiver == receiver,
            "Only Associated receiver can call this function."
        );
        status = bundleStatus(2);

        Verify(_address).receivedBtoD(
            Receiver
        );
    }

    function getBunchIDStatus() public view returns(
        uint
    ) {
        return uint(status);
    }

}