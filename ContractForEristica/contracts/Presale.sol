pragma solidity ^0.4.2;
contract owned {
    address public owner;

    function owned() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        if (msg.sender != owner) throw;
        _;
    }

    function transferOwnership(address newOwner) onlyOwner {
        owner = newOwner;
    }
}


contract tokenSPERT {
    /* Public variables of the token */
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply = 0;


    function tokenSPERT (string _name, string _symbol, uint8 _decimals){
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        
    }
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;


    /* This unnamed function is called whenever someone tries to send ether to it */
    function () {
        throw;     // Prevents accidental sending of ether
    }
}

contract Presale is owned, tokenSPERT {

        string name = 'Pre-sale Eristica Token';
        string symbol = 'SPERT';
        uint8 decimals = 18;
        
        
function Presale ()
        tokenSPERT (name, symbol, decimals){}
    
    event Transfer(address _from, address _to, uint256 amount); 
    event Burned(address _from, uint256 amount);
        
    function mintToken(address investor, uint256 mintedAmount) public onlyOwner {
        balanceOf[investor] += mintedAmount;
        totalSupply += mintedAmount;
        Transfer(this, investor, mintedAmount);
        
    }

 function burnTokens(address _owner) public
        onlyOwner
    {   
        uint  tokens = balanceOf[_owner];
        if(balanceOf[_owner] == 0) throw;
        balanceOf[_owner] = 0;
        totalSupply -= tokens;
        Burned(_owner, tokens);
    }
}
