// functions/server.js

const jsonServer = require("json-server");
const serverless = require("serverless-http");

const server = jsonServer.create();
const router = jsonServer.router("../db.json"); // db.json 경로 주의
const middlewares = jsonServer.defaults();

// 기본 미들웨어
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 예) POST/PUT/PATCH 시 createdAt 필드 자동 추가
server.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    req.body.createdAt = Date.now();
  }
  next();
});

// 라우터 연결
server.use(router);

// Netlify Functions는 handler를 export해야 함
module.exports.handler = serverless(server);
