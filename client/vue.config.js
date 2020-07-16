const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    open: true,
    // host: "localhost",
    proxy: {
      "/api": {
        target: "https://cocktails-collections-sml.herokuapp.com/",
        // target: "http://localhost:3000"
      }
    }
  }
};
