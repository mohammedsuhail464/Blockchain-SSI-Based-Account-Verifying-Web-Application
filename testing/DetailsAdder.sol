pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import './Transactions.sol';

contract DetailAdder {
    
    address Admin;

    enum bundleStatus { atCreator, gathered, sent }
    
    event PayloadUpdate(
        address indexed UniqueID,
        address indexed Uniqueaddresslinker,
        address indexed Sender,
        uint UniqueaddresslinkerType,
        uint Status
    );

    address uniqueid;
    bytes32 description;
    uint count;
    address uniqueaddresslinker;
    address sender;
    address recipient;
    bundleStatus status;
    bytes32 bundleReceiverDescription;
    address txnContractAddress;
    
    constructor (
        address _creatorAddr,
        address _uniqueid,
        bytes32 _description,
        uint _count,
        address _uniqueaddresslinkerAddr,
        address _senderAddr
    ) public {
        Admin = _creatorAddr;
        uniqueid = _uniqueid;
        description = _description;
        count = _count;
        uniqueaddresslinker = _uniqueaddresslinkerAddr;
        sender = _senderAddr;
        recipient = _creatorAddr;
        status = bundleStatus(0);
        Transactions txnContract = new Transactions(_senderAddr);
        txnContractAddress = address(txnContract);
    }


    function getVerifiedDetailAdders () public view returns(
        address,
        bytes32,
        uint,
        address,
        address,
        address,
        address
    ) {
        return (uniqueid, description, count, recipient, uniqueaddresslinker, sender, txnContractAddress);
    }



    function getDetailAdderStatus() public view returns(
        uint
    ) {
        return uint(status);
    }

    function updateSenderAddress(address addr) public {
        sender = addr;
    }

    function pickBundle(
        address _uniqueaddresslinkerAddr
    ) public {
        require(
            _uniqueaddresslinkerAddr == uniqueaddresslinker,
            "Only uniqueaddresslinker of the bundle can pick bundle"
        );
        require(
            status == bundleStatus(0),
            "Bundle must be at Recipient."
        );
        status = bundleStatus(1);
        emit PayloadUpdate(uniqueid, uniqueaddresslinker, sender, 1, 1);
    }

    
    function receivedBundle(
        address _senderAddr
    ) public {

        require(
            _senderAddr == sender,
            "Only Sender of the bundle can receieve the bundle"
        );

        require(
            status == bundleStatus(1),
            "Unique not gathered up yet"
        );
        status = bundleStatus(2);
        emit PayloadUpdate(uniqueid, uniqueaddresslinker, sender, 1, 2);
    }
}