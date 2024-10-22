const { default: axios } = require("axios");

const defaultHeaders = { "Content-Type": "application/json" };

const handleResponse = async ({ method, url, data = {} }) => {
  // console.log(url, data);
  const options = {
    method,
    url,
    headers: defaultHeaders,
    data,
  };
  try {
    const response = await axios(options);
    return { error: false, data: response.data };
  } catch (err) {
    // console.log(err);
    if (err.code === "ECONNRESET") {
      console.log("Connection reset, retrying...");
      return handleResponse({ method, url, data });
    }
    return { error: true, data: err?.response?.data || "something went wrong" };
  }
};

module.exports = {
  handleResponse,
  defaultHeaders,
};
