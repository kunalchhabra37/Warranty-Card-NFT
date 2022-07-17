const main = async () => {
  const WarrantyCard = await ethers.getContractFactory("WarrantyCard");
  const warrantyCard = await WarrantyCard.deploy();

  await warrantyCard.deployed();

  console.log(`WarrantyCard deployed at ${warrantyCard.address}`);
}

const runMain = async () => {
  try{
    await main();
    process.exit(0);
  } catch(err){
    console.error(err);
    process.exit(1);
  }
}

runMain();