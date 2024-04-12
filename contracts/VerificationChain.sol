pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import './DetailAdder.sol';
import './Recipient.sol';
import './Uniqueaddresslinker.sol';
import './Verify.sol';
import './Sender.sol';
import './VerifyB_CO.sol';
import './Banker.sol';
import './VerifyCO_C.sol';
import './Connector.sol';
import './Customer.sol';


contract VerificationChain is Recipient, Uniqueaddresslinker, Sender, Banker, Connector, Customer {
    
    address public Admin;
    
    constructor() public {
        Admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(Admin == msg.sender);
        _;
    }
    
    modifier checkUser(address addr) {
        require(addr == msg.sender);
        _;
    }
    
    enum roles {
        noRole,
        recipient,
        uniqueaddresslinker,
        sender,
        banker,
        connector,
        customer
    }
    
    
   
    
    event UserRegister(address indexed _address, bytes32 name);
    event buyEvent(address client, address initiator, address bundleAddr, bytes32 signature, uint indexed now);
    event respondEvent(address client, address initiator, address bundleAddr, bytes32 signature, uint indexed now);
    event sendEvent(address initiator, address client, address bundleAddr, bytes32 signature, uint indexed now);
    event receivedEvent(address client, address initiator, address bundleAddr, bytes32 signature, uint indexed now);
    

    
    struct userData {
        bytes32 name;
        string[] userLoc;
        roles role;
        address userAddr;
    }
    
    mapping (address => userData) public userInfo;
    
    function registerUser(bytes32 name, string[] memory loc, uint role, address _userAddr) external onlyAdmin {
        userInfo[_userAddr].name = name;
        userInfo[_userAddr].userLoc = loc;
        userInfo[_userAddr].role = roles(role);
        userInfo[_userAddr].userAddr = _userAddr;
        
        emit UserRegister(_userAddr, name);
    }
    
    function changeUserRole(uint _role, address _addr) external onlyAdmin returns(string memory) {
        userInfo[_addr].role = roles(_role);
       return "Role Updated!";
    }
    
    function getUserInfo(address _address) external view onlyAdmin returns(
        userData memory
        ) {
        return userInfo[_address];
    }

    
    
    function recipientCreatesDetailBundle(
        bytes32 _description,
        uint _count,
        address _uniqueaddresslinkerAddr,
        address _senderAddr
        ) external {
            
        require(userInfo[msg.sender].role == roles.recipient, "Role=>Recipient can use this function");
        
        createDetailAdderBundle(
            _description,
            _count,
            _uniqueaddresslinkerAddr,
            _senderAddr
        );
    }
    
    function recipientGetBundleCount() external view returns(uint) {
        require(userInfo[msg.sender].role == roles.recipient, "Role=>Recipient can use this function");
        
        return getNoOfBundlesOfRecipient();
    }
    
    function recipientGetDetailAdderAddresses() external view returns(address[] memory) {
        address[] memory ret = getAllBundles();
        return ret;
    }
    
    

    
    
    function uniqueaddresslinkerHandleBundle(
        address _address,
        uint uniqueaddresslinkerType,
        address cid
        ) external {
            
        require(
            userInfo[msg.sender].role == roles.uniqueaddresslinker,
            "Only Uniqueaddresslinker can call this function"
        );
        require(
            uniqueaddresslinkerType > 0,
            "Uniqueaddresslinker Type is incorrect"
        );
        
        handleBundle(_address, uniqueaddresslinkerType, cid);
    }
    
    
    
    
    
    function senderReceivedDetailAdders(address _addr) external {
        require(userInfo[msg.sender].role == roles.sender, "Only Sender can access this function");
        senderReceivedBundle(_addr, msg.sender);
    }
    
    function senderCreatesNewVerify(
        bytes32 _description,
        address[] memory _detailAddr,
        uint _count,
        address[] memory _uniqueaddresslinkerAddr,
        address _receiverAddr,
        uint RcvrType
        ) external returns(string memory){
            
        require(userInfo[msg.sender].role == roles.sender, "Only Sender can create Verify");
        require(RcvrType != 0, "Reciever Type should be defined");
        
        senderCreatesVerify(
            msg.sender,
            _description,
            _detailAddr,
            _count,
            _uniqueaddresslinkerAddr,
            _receiverAddr,
            RcvrType
        );
        
        return "Verify created!";
    }
    



    
    function bankerReceivedVerify(
        address _address
        ) external {
        require(
            userInfo[msg.sender].role == roles.banker || userInfo[msg.sender].role == roles.connector,
            "Only Banker and Connector can call this function"
        );
        
        verifyRecievedAtBanker(
            _address
        );
    }
    
    function carryVerifyB_CO(
        address _address,
        address uniqueaddresslinker,
        address receiver) external {
        require(
            userInfo[msg.sender].role == roles.banker &&
            msg.sender == Verify(_address).getBCOC()[0],
            "Only Banker or current admin of bundle can call this function"
        );
        
        carryVerifyBtoCO(
            _address,
            uniqueaddresslinker,
            receiver
        );
    }
    
    function getBunchIdByIndexBCO(uint index) external view returns(address bundleICO) {
        require(
            userInfo[msg.sender].role == roles.banker,
            "Only Banker Can call this function."
        );
        return VerifyBtoCO[msg.sender][index];
    }

    function getSubContractBCO(address _address) external view returns (address SubContractBCO) {
        return VerifyBtoCOTxContract[_address];
    }





    function connectorReceivedVerify(
      address _address,
      address cid
    ) external {
        require(
            userInfo[msg.sender].role == roles.connector &&
            msg.sender == Verify(_address).getBCOC()[1],
            "Only Connector or current admin of bundle can call this function"  
        );
        
        verifyRecievedAtConnector(
            _address,
            cid
        );
    }

    function connectorCarryVerifytoCustomer(
        address _address,
        address uniqueaddresslinker,
        address receiver
    ) external {
        require(
            userInfo[msg.sender].role == roles.connector &&
            msg.sender == Verify(_address).getBCOC()[1],
            "Only Connector or current admin of bundle can call this function"
        );
        carryVerifyCOtoC(_address, uniqueaddresslinker, receiver);
    }
    
    function getBunchesCountCOC() external view returns (uint count){
        require(
            userInfo[msg.sender].role == roles.connector,
            "Only Connector Can call this function."
        );
        return VerifyCOtoC[msg.sender].length;
    }

    function getBunchIdByIndexCOC(uint index) external view returns(address bundleICO) {
        require(
            userInfo[msg.sender].role == roles.connector,
            "Only Connector Can call this function."
        );
        return VerifyCOtoC[msg.sender][index];
    }

    function getSubContractCOC(address _address) external view returns (address SubContractCOP) {
        return VerifyCOtoCTxContract[_address];
    }
    

    
    
    function customerReceivedVerify(
        address _address,
        address cid
    ) external {
        require(
            userInfo[msg.sender].role == roles.customer,
            "Only Customer Can call this function."
        );
        verifyRecievedAtCustomer(_address, cid);
    }

    function updateStatus(
        address _address,
        uint Status
    ) external {
        require(
            userInfo[msg.sender].role == roles.customer &&
            msg.sender == Verify(_address).getBCOC()[2],
            "Only Customer or current admin of bundle can call this function"
        );
        require(verifying[_address] == verifyingtatus(1), "Verify Must be at Customer");
        
        updateVerifyingStatus(_address, Status);
    }

    function getVerifyingInfo(
        address _address
    ) external
    view
    returns(
        uint Status 
    ){
        return verifyingInfo(_address);
    }

    
    function getBunchesCountC() external view returns(uint count) {
        require(
            userInfo[msg.sender].role == roles.customer,
            "Only Banker or current admin of bundle can call this function"
        );
        return  VerifyBunchAtCustomer[msg.sender].length;
    }

    function getBunchIdByIndexC(uint index) external view returns(address _address) {
        require(
            userInfo[msg.sender].role == roles.customer,
            "Only Banker or current admin of bundle can call this function"
        );
        return VerifyBunchAtCustomer[msg.sender][index];
    }
    

}    
    