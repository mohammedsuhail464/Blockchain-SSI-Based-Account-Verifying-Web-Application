pragma solidity ^0.6.6;
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
    event buyEvent(address client, address initiator, address bundleAddr, bytes32 signature, uint indexed timestamp);
    event respondEvent(address client, address initiator, address bundleAddr, bytes32 signature, uint indexed timestamp);
    event sendEvent(address initiator, address client, address bundleAddr, bytes32 signature, uint indexed timestamp);
    event receivedEvent(address client, address initiator, address bundleAddr, bytes32 signature, uint indexed timestamp);

    
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
    

 
    mapping (address => address[]) public recipientDetailAdders;
    
    function createDetailAdderBundle(
        bytes32 _description,
        uint _count,
        address _uniqueaddresslinkerAddr,
        address _senderAddr
    ) external {

        DetailAdder detailAdder = new DetailAdder(
            msg.sender,
            address(bytes20(sha256(abi.encodePacked(msg.sender, now)))),
            _description,
            _count,
            _uniqueaddresslinkerAddr,
            _senderAddr
        );
        
        recipientDetailAdders[msg.sender].push(address(detailAdder));
    }
    
    
    function getNoOfBundlesOfRecipient() external view returns(uint) {
        return recipientDetailAdders[msg.sender].length;
    }
    
    
    function getAllBundles() external view returns(address[] memory) {
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
        ) external {
            
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
            VerifyB_CO(cid).pickBD(_addr, msg.sender);
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
        bytes32 signature
        ) external {
            
        DetailAdder(_addr).receivedBundle(_senderAddress);
        senderDetailAdders[_senderAddress].push(_addr);
        emit receivedEvent(msg.sender, _initiatorAddr, _addr, signature, now);
    }
    
    
    function senderCreatesVerify(
        address _senderAddr,
        bytes32 _description,
        address[] memory _detailAddr,
        uint _count,
        address[] memory _uniqueaddresslinkerAddr,
        address _recieverAddr,
        uint RcvrType
        ) external {
            
        Verify _verify = new Verify(
            _senderAddr,
            _description,
            _detailAddr,
            _count,
            _uniqueaddresslinkerAddr,
            _recieverAddr,
            RcvrType
        );
        
        senderVerifies[_senderAddr].push(address(_verify));
        
    }
     
}
    