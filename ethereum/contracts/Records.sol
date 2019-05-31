pragma solidity >=0.4.21 <0.6.0;
//import "./StringUtils.sol";

contract Records {

    mapping (string => string) records;

    constructor() public { }

    function saveRecord(string memory transaction_id, string memory hashed)
    public returns (string memory) {
        records[transaction_id] = hashed;
        return "Saved to blockchain";
    }

    function verifyRecord(string memory transaction_id, string memory hashed)
    public view returns(bool) {
        if (equal(hashed, records[transaction_id])) {
            return true;
        }
        return false;
    }

    function compare(string memory _a, string memory _b) public pure returns (int) {

        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i]) return -1;
            else if (a[i] > b[i]) return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
    
    function equal(string memory _a, string memory _b) public pure returns (bool) {
        return compare(_a, _b) == 0;
    }

}