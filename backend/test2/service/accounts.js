const pool = require("../db");

function verify(req, res, next) {
  const { money } = req.body;
  if (!money || (money && money > 0)) next();
  else res.status(404).send({ message: "money must be greater than 0" });
}
async function getOne(key, value) {
  const data = await pool
    .query(`SELECT * FROM account WHERE ${key}=${value}`)
    .then((data) => data)
    .catch((err) => ({ rows: [] }));
  return data.rows[0];
}

async function getAll(key, values) {
  let query = `SELECT * FROM account`;
  if (key && values.length > 0)
    query += ` WHERE ${key} IN (${values.join(",")})`;

  const data = await pool
    .query(query)
    .then((data) => data)
    .catch((err) => ({ rows: [] }));
  return data.rows || [];
}

async function updateOne(balance, id) {
  const data = await pool
    .query(
      "UPDATE account SET balance=$1 WHERE id=$2 RETURNING id, name, balance",
      [balance, id]
    )
    .then((data) => data)
    .catch((err) => ({ rows: [] }));
  return data.rows[0];
}

async function transfer(fromId, toId, money) {
  const data = await getAll("id", [fromId, toId]);
  const fromAccount = data.find((item) => item.id == fromId);
  const toAccount = data.find((item) => item.id == toId);

  const fromBalance = fromAccount.balance - money;
  const toBalance = toAccount.balance + money;
  const updateData = await pool
    .query(
      "UPDATE account SET balance=CASE WHEN id=$2 THEN $1::int WHEN id=$4 THEN $3::int END WHERE id IN ($2, $4) RETURNING id, name, balance",
      [fromBalance, fromId, toBalance, toId]
    )
    .then((data) => data)
    .catch((err) => ({ rows: [] }));
  return updateData.rows;
}

module.exports = {
  getOne,
  getAll,
  updateOne,
  verify,
  transfer,
};
