const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    open: true
    // proxy: {
    //   "/api": {
    //     //target: 'http://localhost:3000'
    //   }
    // }
  }
};
