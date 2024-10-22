const prompt = require("prompt-sync")();
const apis = require("./apis");
const { actions } = require("./define");

const accounts = [
  { name: "Rose", balance: 100 },
  { name: "Sam", balance: 200 },
];

function setup() {
  return apis.SetUpDB();
}

async function test(accounts) {
  const dbAccountsResp = await Promise.all(
    accounts.map((account) => apis.CreateAccount(account))
  );

  if (dbAccountsResp.some((resp) => resp.error)) {
    console.log("create fail");
    return;
  }

  let dbAccounts = dbAccountsResp.map((resp) => resp.data);

  let isContinue = "Y";
  while (isContinue.toLocaleUpperCase() === "Y") {
    console.log("current: ", dbAccounts);
    const action = prompt(
      "What is your actions? (transfer, deposit, withdraw): "
    );
    if (action === actions.TRANSFER) {
      const fromId = prompt("From ID: ");
      const toId = prompt("To ID: ");
      const money = prompt("Money: ");
      const transfer = await apis.TransferAccount({
        fromId,
        toId,
        money: Number(money),
      });

      if (transfer.error) {
        console.log("Failed to transfer", transfer.data);
      } else {
        console.log("after transfer:", transfer.data);
        dbAccounts = dbAccounts.map((account) => {
          if (account.id === transfer.data[0].id) return transfer.data[0];
          if (account.id === transfer.data[1].id) return transfer.data[1];
          return account;
        });
      }
    } else if (action === actions.DEPOSIT) {
      const id = prompt("ID: ");
      const money = prompt("Money: ");
      const deposit = await apis.DepositAccount({
        id,
        money: Number(money),
      });

      if (deposit.error) {
        console.log("Failed to deposit", deposit.data);
      } else {
        console.log("after deposit:", deposit.data);
        dbAccounts = dbAccounts.map((account) => {
          if (account.id === deposit.data.id) return deposit.data;
          return account;
        });
      }
    } else if (action === actions.WITHDRAW) {
      const id = prompt("ID: ");
      const money = prompt("Money: ");
      const withdraw = await apis.WithdrawAccount({
        id,
        money: Number(money),
      });

      if (withdraw.error) {
        console.log("Failed to withdraw", withdraw.data);
      } else {
        console.log("after withdraw:", withdraw.data);
        dbAccounts = dbAccounts.map((account) => {
          if (account.id === withdraw.data.id) return withdraw.data;
          return account;
        });
      }
    }
    isContinue = prompt("Continue?(Y/N) ");
  }
}
setup().then(() => test(accounts));
