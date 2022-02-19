const VendingMachine = artifacts.require("VendingMachine");

contract("VendingMachine", (accounts) => {
    before(async () => {
        instance = await VendingMachine.deployed()
    })
    it("ensures yhat the starting balance of the vending machine is 100", async () => {
        const balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 100, "That initial balance should be 100 donuts.")
    })

    it("ensures the balance of the vending maching can be update", async () => {
        await instance.restock(100);

        const balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 200, "That initial balance should be 200 donuts after restocking.")
    })

    it("allows donuts to be purchased", async () => {
        await instance.purchase(1, {from: accounts[0], value: web3.utils.toWei('3', 'ether')});

        const balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 199, "That initial balance should be 199 donuts after sale.")
    })
})