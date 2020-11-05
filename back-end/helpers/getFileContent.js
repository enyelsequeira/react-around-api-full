const fs = require("fs").promises;

// helper function to read files from the data
function getFileContent(path) {
  return fs
    .readFile(path, { encoding: "utf-8" })
    .then(JSON.parse)
    .catch((e) => console.log(e));
}

module.exports = getFileContent;
