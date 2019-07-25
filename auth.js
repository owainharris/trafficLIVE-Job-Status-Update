// Requests -u (USER) and -k (API Key) from the terminal
if (process.argv.indexOf("-u") != -1 || process.argv.indexOf("-k") != -1) {
  var user = process.argv[process.argv.indexOf("-u") + 1];
  var key = process.argv[process.argv.indexOf("-k") + 1];
}

// user:key is turned into base64
let hash = new Buffer.from(user + ":" + key);
let auth = user + key;
auth = hash.toString("base64");

// Headers for API calls exported to /components for use in API calls using node-fetch
const headers = {
  Authorization: "Basic " + `${auth}`,
  Accept: "application/json",
  "Content-Type": "application/json"
};
module.exports = headers;
