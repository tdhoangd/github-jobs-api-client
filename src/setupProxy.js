const { createProxyMiddleware  } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/positions.json", {
      target: "https://jobs.github.com/",
      changeOrigin: true
    })
  );

};