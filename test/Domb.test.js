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
});