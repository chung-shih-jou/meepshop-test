const { handleResponse, defaultHeaders } = require("./utils");
const endpoint = "http://localhost:13000";

module.exports = {
  SetUpDB: async () => {
    return handleResponse({
      method: "POST",
      url: endpoint + "/setup",
    });
  },
  CreateAccount: async (account) => {
    return handleResponse({
      method: "POST",
      url: endpoint + "/accounts",
      data: account,
    });
  },
  TransferAccount: async ({ fromId, toId, money }) => {
    return handleResponse({
      method: "POST",
      url: `${endpoint}/accounts/${fromId}/transfer/${toId}`,
      data: { money },
    });
  },
  DepositAccount: async ({ id, money }) => {
    return handleResponse({
      method: "POST",
      url: `${endpoint}/accounts/${id}/deposit`,
      data: { money },
    });
  },
  WithdrawAccount: async ({ id, money }) => {
    return handleResponse({
      method: "POST",
      url: `${endpoint}/accounts/${id}/withdraw`,
      data: { money },
    });
  },
};
