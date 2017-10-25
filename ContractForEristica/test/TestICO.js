const ERT = artifacts.require("ERT.sol");
const EristicaICO = artifacts.require("EristicaICO.sol");
const Presale = artifacts.require("Presale.sol");

contract('Presale',function(accounts){
   var ContractAddress;
      it("should mint tokens for investor", function(){
         return Presale.deployed().then(function(instance){
           ContractAddress = instance;
           return ContractAddress.mintTokens(accounts[2], 867868)
         }).then(function(){
           return ContractAddress.balanceOf.call(accounts[2]);
         }).then(function(balance){
           console.log(balance);
           assert.equal(balance, 867868, "Function doesn't work");
         });
       });
});
contract('EristicaICO',function(accounts){
  function randomInteger(min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1)
      rand = Math.round(rand);
      return rand;
    };
    var ContractAddress;

    it("should set rate correctly", function(){
        var random_int = randomInteger(1, 1000);
        return EristicaICO.deployed().then(
            function(instance) {
             ContractAddress = instance;
             return ContractAddress.setRate(random_int);
          }).then(function(tx){
             console.log(tx);
             return ContractAddress.Rate_Eth.call();;
          }).then(function(rate){
            assert.equal(rate, random_int, "Rate_Eth isn't correct");
          });

    });


    it("should start ICO", function(){
       return EristicaICO.deployed().then(function(instance) {
            ContractAddress = instance;
            return ContractAddress.startIco();
        }).then(function(tx) {
            console.log(tx);
            assert.isOk(tx.receipt);
        });
    });

    it("should send tokens, when investor sends ether to contract", function(){

       return EristicaICO.deployed().then(function(instance) {
           ContractAddress = instance;
           return ContractAddress.sendTransaction({
                from: accounts[3],
                value: 4000000000000000000});
       }).then(function() {
         return  ContractAddress.ERT.call();
       }).then(function(token){
            ERT = ERT.at(token);
            return ERT.balanceOf.call(accounts[3]);
         }).then(function(result){
             console.log(result + " current balance of accounts[3]");
             return ERT.totalSupply.call();
         }).then(function(supply){
           console.log(supply + " current totalSupply");
         });

    });

    it("should buy tokens for investor who paid in other cryptos", function(){
       var random_int = randomInteger(100000, 10000000);
       return EristicaICO.deployed().then(function(instance) {
           ContractAddress = instance;
           return ContractAddress.buyForInvestor(accounts[2], random_int , "txH")
       }).then(function(result) {
         console.log(result);
         return  ContractAddress.ERT.call()
       }).then(function(token){
            ERT = ERT.at(token);
            return ERT.balanceOf.call(accounts[2]);
         }).then(function(balance){
             balance = JSON.parse(balance);
             console.log(balance + " balance of accounts[2]");
             assert.isAtLeast(balance, random_int, "tokens weren't sent" )
             return ERT.totalSupply.call();
         }).then(function(supply){
           console.log(supply + " current totalSupply");
         });

    });



    it("should pause ICO", function(){
       return EristicaICO.deployed().then(function(instance) {
            ContractAddress = instance;
            return ContractAddress.pauseIco();
        }).then(function(result) {
            console.log(result.receipt);
            assert.isOk(result.receipt);
        });
    });

    it("should set rate correctly", function(){
        var random_int = randomInteger(1, 1000);
        return EristicaICO.deployed().then(
            function(instance) {
             ContractAddress = instance;
             return instance.setRate(random_int);
          }).then(function(tx){
             console.log(tx);
             var	Rate = ContractAddress.Rate_Eth.call();
             return Rate;
          }).then(function(result){
            assert.equal(result, random_int, "Rate_Eth isn't correct");
          });

    });


    it("should start ICO", function(){
       return EristicaICO.deployed().then(function(instance) {
            ContractAddress = instance;
            return ContractAddress.startIco();
        }).then(function(result) {
            console.log(result.receipt);
            assert.isOk(result.receipt);
        });
    });


    it("should send tokens, when investor sends ether to contract", function(){

       return EristicaICO.deployed().then(function(instance) {
           ContractAddress = instance;
           return ContractAddress.sendTransaction({
                from: accounts[3],
                value: 2000000000000000000});
       }).then(function() {
         return  ContractAddress.ERT.call();
       }).then(function(token){
            ERT = ERT.at(token);
            return ERT.balanceOf.call(accounts[3]);
         }).then(function(result){
             console.log(result + " current balance of accounts[3]");
             return ERT.totalSupply.call();
         }).then(function(supply){
           console.log(supply + " current totalSupply");
         });

    });

    it("should buy tokens for investor who paid in other cryptos", function(){
       var random_int = randomInteger(100000, 10000000);
       return EristicaICO.deployed().then(function(instance) {
           ContractAddress = instance;
           return ContractAddress.buyForInvestor(accounts[1], random_int , "txH")
       }).then(function(result) {
         console.log(result);
         return  ContractAddress.ERT.call()
       }).then(function(token){
            ERT = ERT.at(token);
            return ERT.balanceOf.call(accounts[1]);
         }).then(function(balance){
             console.log(balance + " balance of accounts[1]");
             balance = JSON.parse(balance);
             assert.isAtLeast(balance, 867868, "tokens weren't sent" )
             return ERT.totalSupply.call();
         }).then(function(supply){
           console.log(supply + " current totalSupply");
         });

    });

    it("address of presale", function(){
       return EristicaICO.deployed().then(function(instance) {
           ContractAddress = instance;
         return  ContractAddress.presale.call()
       }).then(function(token){
          console.log(token);
         });
    });

    it("should get bonus correctly", function(){
        var random_int = randomInteger(1, 10000000);
        return EristicaICO.deployed().then(
            function(instance) {
             ContractAddress = instance;
             return ContractAddress.getBonus(random_int);
          }).then(function(result){
             result = JSON.parse(result);
             console.log(result + " result of getBonus");
             var	bonus = Math.floor(random_int * 20 /100);
             assert.equal(result, bonus, "Bonus isn't correct");
          });

    });


    it("should mint tokens for investor", function(){
       return Presale.deployed().then(function(instance){
         ContractAddress = instance;
         return ContractAddress.mintTokens(accounts[2], 867868)
       }).then(function(){
         return ContractAddress.balanceOf.call(accounts[2]);
       }).then(function(balance){
         console.log(balance);
         assert.equal(balance, 867868, "Function doesn't work");
       });
     });

     it("should set address of ICO", function(){
        return Presale.deployed().then(function(instance){
          ContractAddress = instance;
          return EristicaICO.deployed();
        }).then(function(instance){
          return instance.address;
        }).then(function(addressIco){
          console.log(addressIco);
          return ContractAddress.setIco(addressIco);
        }).then(function(){
          return ContractAddress.ico.call();
        }).then(function(result){
          console.log(result);
        })
      });

     it("check balance of investor", function(){
        return Presale.deployed().then(function(instance){
          ContractAddress = instance;
          return ContractAddress.balanceOf.call(accounts[2]);
        }).then(function(balance){
          console.log(balance);
        }).then(function(){
           return EristicaICO.deployed().then(function(instance) {
            ContractAddress = instance;
            return ContractAddress.replaceToken(accounts[2]);
        });
      });
    });



    it("should finish ICO", function(){
       return EristicaICO.deployed().then(function(instance) {
            ContractAddress = instance;
            return ContractAddress.finishIco();
        }).then(function(result) {
            console.log(result.receipt);
            assert.isOk(result.receipt);
        });
    });

    it("should withdraw ether", function(){
       return EristicaICO.deployed().then(function(instance) {
            ContractAddress = instance;
            return ContractAddress.withdrawEther(web3.toWei(1, "ether"));
        }).then(function(result) {
            console.log(result);
            assert.isOk(result.receipt);
        }).then(function(){
            return(web3.eth.getBalance(ContractAddress.address))
        }).then(function(balance){
            balance = JSON.parse(balance);
            console.log(balance + " balance of our contract");
            assert.equal(balance, 5000000000000000000, "doesn't withdraw ether right")
        })
    });
});
