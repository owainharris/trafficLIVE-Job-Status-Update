const axios = require("axios");
const headers = require("./headers.js");
const URL = `https://api.sohnar.com/TrafficLiteServer/openapi/job?filter=jobStateType|EQ|"PROGRESS"&windowSize=1`;

const fetchJobs = async () => {
  try {
    const response = await axios(URL, { method: "GET", headers });
    const jobs = await response.data.resultList;
    return await jobs;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetched: async function mapJobs() {
    try {
      const jobs = await fetchJobs();
      let result = jobs
        .map(item => {
          item.version = item.version + 1;
          item.jobStateType = "COMPLETE";
          return item;
        })
        .find(obj => {
          return obj.id !== "";
        });

      return result;
    } catch (err) {
      console.log(err);
    }
  }
};
