const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", 3000);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const memberList = fs.readFileSync("./public/data.json", "utf-8");
const memberListdata = JSON.parse(memberList);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/data", (req, res) => {
  res.send(memberListdata);
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`노드js 서버 실행 중 >>> http://localhost:${app.get("port")}`);
});
