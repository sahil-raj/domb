// const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    const Domb = await ethers.getContractFactory("Domb");
    const domb = await Domb.deploy();
    console.log(domb);
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.error(err);
    process.exit(0);
});