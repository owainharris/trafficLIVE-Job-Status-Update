const axios = require("axios");
const headers = require("./auth.js");
const URL = `https://api.sohnar.com/TrafficLiteServer/openapi/job?filter=jobStateType|EQ|"PROGRESS"&windowSize=1`;

// GET all jobs in progress via the trafficLIVE API
const fetchJobs = async () => {
  try {
    const response = await axios(URL, { method: "GET", headers });
    return response.data.resultList;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  // Function awaits fetchJobs(), then processess the data
  fetched: async function mapJobs() {
    try {
      // Await for response from fetchJobs()
      const jobs = await fetchJobs();

      //trafficLIVE uses versioning, everytime we load data back through the API the version number must be higher than the existing number). Change all statuses to COMPLETE
      let updateJobs = jobs
        .map(item => {
          item.version = item.version + 1;
          item.jobStateType = "COMPLETE";
          return item;
        })
        // The API returns an array, however accepts on object in POST, the below will strip the object from the array. Return the object in this export for update.js to use.
        .find(obj => {
          return obj.id !== "";
        });

      return updateJobs;
    } catch (err) {
      console.log(err);
    }
  }
};
