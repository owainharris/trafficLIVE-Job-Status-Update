const axios = require("axios");
const headers = require("./auth.js");
const URL = `https://api.sohnar.com/TrafficLiteServer/openapi/job`;
const fetching = require("./fetch");

module.exports = {
  updated: async function updateJobs() {
    let job = await fetching.fetched();
    try {
      const response = await axios(URL, {
        method: "post",
        headers,
        data: job
      });
      console.log("Done!");
      return response;
    } catch (err) {
      console.log(err);
    }
  }
};
