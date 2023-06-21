const fs = require("fs");

exports.deleteFile = function deleteFile(filePath) {
  if (filePath.includes("public")) {
    filePath = "public" + filePath.split("public")[1];
    fs.unlink(filePath, (err) => {
      if (err) throw err;
    });
  }
};
