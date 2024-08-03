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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const memberList = fs.readFileSync("./public/data.json", "utf-8");
const memberListdata = JSON.parse(memberList)["memberList"];
var noCnt = JSON.parse(memberList)["noCnt"];

app.get("/", (req, res) => {
  res.render("index");
});

//초기 서버에서 데이터 보내기
app.get("/data", (req, res) => {
  res.send({ memberListdata });
});

//입력 함수
app.post("/input", (req, res) => {
  var saram = req.body;
  var length = Object.keys(saram).length;
  console.log(length);
  memberListdata.push({
    seq: noCnt++,
    img: " ",
    name: saram.nameIput,
    department: saram.departmentIput,
    rank: saram.rankIput,
    ckBox: false,
    commentList: [],
  });
  console.log(memberListdata);
  res.send(req.body);
});

//수정 함수
app.put("/modify", (req, res) => {
  var modifyinfor = req.body;
  var length = Object.keys(modifyinfor).length;
  var idex = memberListdata.findIndex((member) => {
    return member.seq == modifyinfor.seq;
  });
  if (length == 4) {
    if (idex != -1) {
      memberListdata[idex].name = modifyinfor.name;
      memberListdata[idex].department = modifyinfor.department;
      memberListdata[idex].rank = modifyinfor.rank;
    }
  } else if (length == 3) {
    var commentindex = memberListdata[idex].commentList.findIndex((comment) => {
      //console.log(comment.seq);
      //console.log(modifyinfor.seq);
      return comment.seq == modifyinfor.commentseq;
    });
    if (commentindex != -1) {
      console.log(memberListdata[idex].commentList[commentindex]);
      console.log(modifyinfor.comment);
      memberListdata[idex].commentList[commentindex].comment =
        modifyinfor.comment;
    }
  }
  res.send("success");
});
//댓글수정 함수
app.put("/modify", (req, res) => {
  var modifyinfor = req.body;

  var idex = memberListdata.findIndex((member) => {
    return member.seq == modifyinfor.seq;
  });
  if (idex != -1) {
    memberListdata[idex].name = modifyinfor.name;
    memberListdata[idex].department = modifyinfor.department;
    memberListdata[idex].rank = modifyinfor.rank;
  }
  res.send("success");
});

//삭제 함수
app.delete("/delete", (req, res) => {
  var seqinfor = req.body;
  var idex = memberListdata.findIndex((member) => {
    return member.seq == seqinfor.seq;
  });
  var commentidex = memberListdata[idex].commentList.findIndex((comment) => {
    return comment.seq == seqinfor.commentseq;
  });

  if (idex != -1 && commentidex == -1) {
    memberListdata.splice(idex, 1);
    res.send("success");
  } else if (idex != -1 && commentidex != -1) {
    memberListdata[idex].commentList.splice(commentidex, 1);
    res.send("success");
  }
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`노드js 서버 실행 중 >>> http://localhost:${app.get("port")}`);
});
