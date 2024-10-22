const express = require("express");
const pool = require("./db");
const dayjs = require("dayjs");
const accountService = require("./service/accounts");
const port = 3000;
const app = express();
app.use(express.json());

app.get("/accounts", async (req, res) => {
  try {
    const data = await accountService.getAll();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: `table not create` });
  }
});

app.get("/accounts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await accountService.getOne("id", id);
    if (!data) res.status(404).send({ message: "Account not found" });
    else res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: `Failed to get account by ${id}` });
  }
});

app.post("/accounts", async (req, res) => {
  const { name, balance } = req.body;
  const data = await accountService.getOne("name", `'${name}'`);

  if (!!data) {
    res.status(200).send(data);
    return;
  }

  try {
    const addData = await pool.query(
      "INSERT INTO account (name, balance) VALUES ($1, $2) RETURNING  id, name, balance",
      [name, balance]
    );

    res.status(200).send(addData.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Failed to create account" });
  }
});

app.post("/accounts/:id/withdraw", accountService.verify, async (req, res) => {
  const { money } = req.body;
  const { id } = req.params;
  try {
    console.log("WITHDRAW: " + dayjs().format("YYYY-MM-DD HH:mm:ss"));
    const account = await accountService.getOne("id", id);
    if (!account) {
      res.status(400).send({ message: "Account not found" });
      return;
    }
    if (account.balance < money) {
      res.status(400).send({ message: "Not enough money" });
    } else {
      const balance = account.balance - money;
      const updateData = await accountService.updateOne(balance, id);
      res.status(200).send(updateData);
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Failed to withdraw account" });
  }
});

app.post("/accounts/:id/deposit", accountService.verify, async (req, res) => {
  const { money } = req.body;
  const { id } = req.params;
  try {
    console.log("DEPOSIT: " + dayjs().format("YYYY-MM-DD HH:mm:ss"));
    const account = await accountService.getOne("id", id);
    if (!account) {
      res.status(400).send({ message: "Account not found" });
      return;
    }
    const balance = account.balance + money;
    const updateData = await accountService.updateOne(balance, id);
    res.status(200).send(updateData);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Failed to deposit" });
  }
});

app.post(
  "/accounts/:fromId/transfer/:toId",
  accountService.verify,
  async (req, res) => {
    const { money } = req.body;
    const { fromId, toId } = req.params;
    try {
      const data = await accountService.getAll("id", [fromId, toId]);
      const fromAccount = data.find((item) => item.id == fromId);
      const toAccount = data.find((item) => item.id == toId);

      console.log("TRANSFER: " + dayjs().format("YYYY-MM-DD HH:mm:ss"));
      if (!fromAccount || !toAccount) {
        res.status(400).send({
          message: `Account not found: ${fromAccount?.id} to ${toAccount?.id}`,
        });
      } else {
        if (fromAccount.balance < money) {
          res.status(400).send({ message: "Not enough money to transfer" });
        } else {
          const updateData = await accountService.transfer(fromId, toId, money);
          res.status(200).send(updateData);
        }
      }
    } catch (err) {
      console.log(err);
      res.status(404).send({ message: "Failed to transfer" });
    }
  }
);

app.post("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE account( id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL CHECK (name <> ''), balance INT CHECK (balance >= 0) )"
    );
    res.status(200).send({ message: "Successfully created table" });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Failed to setup" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
