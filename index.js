const run = async () => {
  setInterval(async () => {
    let updating = require("./update");
    try {
      await updating.updated();
    } catch (err) {
      console.log(err);
    }
  }, 3000);
};

run();
