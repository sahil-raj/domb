const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("domb tests" , () => {
    let Domb, add1, add2, owner, hardhatToken;

    beforeEach(async () => {
        Domb = await ethers.getContractFactory("Domb");
        [owner, add1, add2] = await ethers.getSigners();
        hardhatToken = await Domb.deploy();
    });

    describe("deployment", async () => {

    });
});