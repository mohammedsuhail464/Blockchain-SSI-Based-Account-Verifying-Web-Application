pragma solidity ^0.6.6;

import './Transactions.sol';

contract Verify {

    address Admin;

    enum verifyStatus {
        atSender,
        gatheredForB,
        gatheredForCO,
        sentAtB,
        sentAtCO,
        gatheredForC,
        sentAtC
    }

    bytes32 description;
    address[] detailAdders;
    address[] uniqueaddresslinkers;
    address sender;
    address banker;
    address connector;
    address customer;
    uint count;
    verifyStatus status;
    address txnContractAddress;

    event PayloadUpdate(
        address indexed BunchID,
        address indexed Loader,
        address indexed Receiver,
        uint UniqueaddresslinkerType,
        uint Status
    );


    constructor(
        address _senderAddr,
        bytes32 _description,
        address[] memory _detailAddr,
        uint _count,
        address[] memory _uniqueaddresslinkerAddr
    ) public {
        Admin = _senderAddr;
        sender = _senderAddr;
        description = _description;
        detailAdders = _detailAddr;
        count = _count;
        uniqueaddresslinkers = _uniqueaddresslinkerAddr;
        banker = address(0x0);
        connector = address(0x0);
        status = verifyStatus(0);
        Transactions txnContract = new Transactions(_senderAddr);
        txnContractAddress = address(txnContract);
    }


    function getVerifyInfo () public view returns(
        address _senderAddr,
        bytes32 _description,
        address[] memory _detailAddr,
        uint _count,
        address[] memory _uniqueaddresslinkerAddr,
        address _connector,
        uint _status,
        address _txnContract,
        address _banker
    ) {
        return(
            sender,
            description,
            detailAdders,
            count,
            uniqueaddresslinkers,
            connector,
            uint(status),
            txnContractAddress,
            banker
        );
    }

 
    function getBDC() public view returns(
        address[3] memory BDP
    ) {
        return (
            [banker, connector, customer]
        );
    }

    function getBunchIDStatus() public view returns(
        uint
    ) {
        return uint(status);
    }


    function pickVerify(
        address _uniqueaddresslinkerAddr
    ) public {
        require(
            _uniqueaddresslinkerAddr == uniqueaddresslinkers[uniqueaddresslinkers.length - 1],
            "Only Uniqueaddresslinker can call this function"
        );
        require(
            status == verifyStatus(0),
            "Bundle must be at Sender."
        );

        if(banker != address(0x0)){
            status = verifyStatus(1);
            emit PayloadUpdate(address(this), _uniqueaddresslinkerAddr, banker, 1, 1);
        }else{
            status = verifyStatus(2);
            emit PayloadUpdate(address(this), _uniqueaddresslinkerAddr, connector, 1, 2);
        }
    }
    
    function updateUniqueaddresslinkerArray(address _uniqueaddresslinkerAddr) public {
        uniqueaddresslinkers.push(_uniqueaddresslinkerAddr);
    }

    function updateBankerAddress(address addr) public {
        banker = addr;
    }

    function updateConnectorAddress(address addr) public {
        connector = addr;
    }

    function receivedVerify(
        address _receiverAddr
    ) public returns(uint) {

        require(
            _receiverAddr == banker || _receiverAddr == connector,
            "Only Banker or Connector can call this function"
        );

        require(
            uint(status) >= 1,
            "Unique not gathered up yet"
        );

        if(_receiverAddr == banker && status == verifyStatus(1)){
            status = verifyStatus(3);
            emit PayloadUpdate(address(this), uniqueaddresslinkers[uniqueaddresslinkers.length - 1], banker, 2, 3);
            return 1;
        } else if(_receiverAddr == connector && status == verifyStatus(2)){
            status = verifyStatus(4);
            emit PayloadUpdate(address(this), uniqueaddresslinkers[uniqueaddresslinkers.length - 1], connector,3, 4);
            return 2;
        }
    }


    function sendBtoD(
        address receiver,
        address sender
    ) public {
        require(
            banker == sender,
            "this Banker is not Associated."
        );
        connector = receiver;
        status = verifyStatus(2);
    }


    function receivedBtoD(
        address receiver
    ) public {
        require(
            connector == receiver,
            "This Connector is not Associated."
        );
        status = verifyStatus(4);
    }


    function sendCOtoC(
        address receiver,
        address sender
    ) public {
        require(
            connector == sender,
            "This Connector is not Associated."
        );
        customer = receiver;
        status = verifyStatus(5);
    }


    function receivedDtoC(
        address receiver
    ) public {
        require(
            customer == receiver,
            "This Customer is not Associated."
        );
        status = verifyStatus(6);
    }
}