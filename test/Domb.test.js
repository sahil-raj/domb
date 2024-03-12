const {expect} = require("chai");
const {ethers} = require("hardhat");

//one describe section for whole Domb.test.js
describe("domb tests" , () => {
    let Domb, add1, add2, owner, hardhatToken;

    //hook to perform step before each test
    beforeEach(async () => {
        //get an instance of the contract
        Domb = await ethers.getContractFactory("Domb");
        //get the signers
        [owner, add1, add2] = await ethers.getSigners();
        //deploy the contract to the local hardhat chain
        hardhatToken = await Domb.deploy();
    });

    //tests related to the deployment of the contract to the chain
    describe("deployment", async () => {
        //test to check wheter the owner and the person deploying is same
        it("Should assign deploying person as owner", async () => {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });
        //test to check wheter all the tokens are assigned to the owner
        it("should assign all tokens to owner", async () => {
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(await hardhatToken.maxDomb());
        });
    });

    //transfer related tests
    describe("transfer", async () => {
        //transfer token from owner to add1 and check balances
        it("should transfer(owner->add1) and have correct balances", async () => {
            await hardhatToken.transfer(owner.address, add1.address, 10);
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(await hardhatToken.maxDomb() - BigInt(10));
            expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);
        });
        //total number of tokens in circulation must be equal to the maxDomb
        it("should have token in circulation = maxDom", async () => {
            //perform few transfers and then check the total circulation
            await hardhatToken.transfer(owner.address, add1.address, 20);
            await hardhatToken.transfer(add1.address, add2.address, 10);
            //add the balances of all the three accounts
            const myBal = await hardhatToken.balanceOf(owner.address) + await hardhatToken.balanceOf(add1.address) + await hardhatToken.balanceOf(add2.address);
            //match the total number of token with myBal
            expect(await hardhatToken.maxDomb()).to.equal(myBal);
        });
        //there shouldn't be a transfer if balance<amount transfered
        it("should not transfer in case of insufficient balance", async () => {
            await hardhatToken.transfer(owner.address, add1.address, 50);
            await expect(hardhatToken.transfer(add1.address, add2.address, 100)).to.be.revertedWith("Insufficient balance");;
        });
    });
});