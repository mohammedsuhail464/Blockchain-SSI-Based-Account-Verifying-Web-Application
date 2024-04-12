pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import './DetailAdder.sol';
import './Verify.sol';
import './VerifyB_CO.sol';
import './VerifyCO_C.sol';


contract VerificationChain {
    
    address Admin;
    
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
    event buyEvent(address client, address indexed initiator, address bundleAddr, bytes signature, uint indexed timestamp);
    event respondEvent(address indexed client, address initiator, address bundleAddr, bytes signature, uint indexed timestamp);
    event sendEvent(address initiator, address client, address indexed bundleAddr, bytes signature, uint indexed timestamp);
    event receivedEvent(address indexed client, address initiator, address bundleAddr, bytes signature, uint indexed timestamp);
    
    


    
    function requestUnique(address client, address initiator, address bundleAddr, bytes memory signature) public {
        emit buyEvent(client, initiator, bundleAddr, signature, now);
    }
    
    function respondToEntity(address client, address initiator, address bundleAddr, bytes memory signature) public {
        emit respondEvent(client, initiator, bundleAddr, signature, now);
    }
    
    function sendBundleToEntity(address client, address initiator, address bundleAddr, bytes memory signature) public {
        emit sendEvent(initiator, client, bundleAddr, signature, now);
    }
    

    
    struct userData {
        bytes32 name;
        string[] userLoc;
        roles role;
        address userAddr;
    }
    
    mapping (address => userData) public userInfo;
    
    function registerUser(bytes32 name, string[] memory loc, uint role, address _userAddr) public onlyAdmin {
        userInfo[_userAddr].name = name;
        userInfo[_userAddr].userLoc = loc;
        userInfo[_userAddr].role = roles(role);
        userInfo[_userAddr].userAddr = _userAddr;
        
        emit UserRegister(_userAddr, name);
    }
    
    function changeUserRole(uint _role, address _addr) public onlyAdmin returns(string memory) {
        userInfo[_addr].role = roles(_role);
       return "Role Updated!";
    }
    
    function getUserInfo(address _address) public view returns(
        userData memory
        ) {
        return userInfo[_address];
    }
    


    
    mapping (address => address[]) public recipientDetailAdders;
    
    
    function createDetailAdderBundle(
        bytes32 _description,
        uint _count,
        address _uniqueaddresslinkerAddr,
        address _senderAddr
    ) public returns(address) {

        DetailAdder detailAdder = new DetailAdder(
            msg.sender,
            address(bytes20(sha256(abi.encodePacked(msg.sender, now)))),
            _description,
            _count,
            _uniqueaddresslinkerAddr,
            _senderAddr
        );
        
        recipientDetailAdders[msg.sender].push(address(detailAdder));
        return address(detailAdder);
    }
    
    function getNoOfBundlesOfRecipient() public view returns(uint) {
        return recipientDetailAdders[msg.sender].length;
    }
    
    
    function getAllBundles() public view returns(address[] memory) {
        uint len = recipientDetailAdders[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = recipientDetailAdders[msg.sender][i];
        }
        return ret;
    }
    

    
    
    function uniqueaddresslinkerHandleBundle(
        address _addr,
        uint uniqueaddresslinkertype,
        address cid
        ) public {
            
        require(
            userInfo[msg.sender].role == roles.uniqueaddresslinker,
            "Only Uniqueaddresslinker can call this function"
        );
        require(
            uniqueaddresslinkertype > 0,
            "Uniqueaddresslinker Type is incorrect"
        );
        
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
    
    

    
    mapping (address => address[]) public senderDetailAdders;
    mapping (address => address[]) public senderVerifies;
    
    
    function senderReceivedBundle(
        address _addr,
        address _senderAddress,
        address _initiatorAddr,
        bytes memory signature
        ) public {
            
        DetailAdder(_addr).receivedBundle(_senderAddress);
        senderDetailAdders[_senderAddress].push(_addr);
        emit receivedEvent(msg.sender, _initiatorAddr, _addr, signature, now);
    }
    
    function getAllDetailAdders() public view returns(address[] memory) {
        uint len = senderDetailAdders[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = senderDetailAdders[msg.sender][i];
        }
        return ret;
    }

    function senderCreatesVerify(
        address _senderAddr,
        bytes32 _description,
        address[] memory _detailAddr,
        uint _count,
        address[] memory _uniqueaddresslinkerAddr
        ) public {
            

            
        Verify _verify = new Verify(
            _senderAddr,
            _description,
            _detailAddr,
            _count,
            _uniqueaddresslinkerAddr
        );
        
        senderVerifies[_senderAddr].push(address(_verify));
        
    }
    
    function getAllCreatedVerifies() public view returns(address[] memory) {
        uint len = senderVerifies[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = senderVerifies[msg.sender][i];
        }
        return ret;
    }
    


    mapping(address => address[]) public VerifiesAtBanker;
    mapping(address => address[]) public VerifyBtoCO;
    mapping(address => address) public VerifyBtoCOTxContract;
    
    function bankerReceivedVerify(
        address _address,
        address _initiatorAddr,
        bytes memory signature
        ) public {
        require(
            userInfo[msg.sender].role == roles.banker,
            "Only Banker can call this function"
        );
        
        uint rtype = Verify(_address).receivedVerify(msg.sender);
        VerifiesAtBanker[msg.sender].push(_address);
        emit receivedEvent(msg.sender, _initiatorAddr, _address, signature, now);
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

    
    function getBunchIdByIndexBCO(uint index) public view returns(address bundleICO) {
        require(
            userInfo[msg.sender].role == roles.banker,
            "Only Banker Can call this function."
        );
        return VerifyBtoCO[msg.sender][index];
    }

    function getSubContractBCO(address _address) public view returns (address SubContractBCO) {
        return VerifyBtoCOTxContract[_address];
    }
    
    function getAllVerifiesAtBanker() public view returns(address[] memory) {
        uint len = VerifiesAtBanker[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = VerifiesAtBanker[msg.sender][i];
        }
        return ret;
    }




    mapping(address => address[]) public VerifiesAtConnector;
    mapping(address => address[]) public VerifyCOtoC;
    mapping(address => address) public VerifyCOtoCTxContract;


    function connectorReceivedVerify(
      address _address,
      address cid,
      address _initiatorAddr,
      bytes memory signature
    ) public {
        require(
            userInfo[msg.sender].role == roles.connector &&
            msg.sender == Verify(_address).getBCOC()[1],
            "Only Connector or current admin of bundle can call this function"  
        );
        
        uint rtype = Verify(_address).receivedVerify(msg.sender);
        if(rtype == 2){
            VerifiesAtConnector[msg.sender].push(_address);
            if(Verify(_address).getBCOC()[0] != address(0)){
                VerifyB_CO(cid).receiveBCO(_address, msg.sender);
            }
        }
        emit receivedEvent(msg.sender, _initiatorAddr, _address, signature, now);
    }

    function connectorCarryVerifytoCustomer(
        address _address,
        address uniqueaddresslinker,
        address receiver
    ) public {
        require(
            userInfo[msg.sender].role == roles.connector &&
            msg.sender == Verify(_address).getBCOC()[1],
            "Only Connector or current admin of bundle can call this function"
        );
        VerifyCO_C dp = new VerifyCO_C(
            _address,
            msg.sender,
            uniqueaddresslinker,
            receiver
        );
        VerifyCOtoC[msg.sender].push(address(dp));
        VerifyCOtoCTxContract[_address] = address(dp);
    }
    
    function getBunchesCountCOC() public view returns (uint count){
        require(
            userInfo[msg.sender].role == roles.connector,
            "Only Connector Can call this function."
        );
        return VerifyCOtoC[msg.sender].length;
    }

    function getBunchIdByIndexCOC(uint index) public view returns(address bundleICO) {
        require(
            userInfo[msg.sender].role == roles.connector,
            "Only Connector Can call this function."
        );
        return VerifyCOtoC[msg.sender][index];
    }

    function getSubContractCOC(address _address) public view returns (address SubContractCOP) {
        return VerifyCOtoCTxContract[_address];
    }
    
    function getAllVerifiesAtConnector() public view returns(address[] memory) {
        uint len = VerifiesAtConnector[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = VerifiesAtConnector[msg.sender][i];
        }
        return ret;
    }
    
    
    
    function verify(address p, bytes32 hash, uint8 v, bytes32 r, bytes32 s) public pure returns(bool) {
        return ecrecover(hash, v, r, s) == p;
    }   
}
    