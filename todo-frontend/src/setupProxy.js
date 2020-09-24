const { createProxyMiddleware } = require('http-proxy-middleware');


const BACK_END_HOST=process.env.REACT_APP_BACK_END_HOST || "localhost";
const BACK_END_PORT=process.env.REACT_APP_BACK_END_PORT || "3001";

const API_URL = `http://${BACK_END_HOST}:${BACK_END_PORT}`;

module.exports = function(app) {
  app.use(
    '/todos',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );
};