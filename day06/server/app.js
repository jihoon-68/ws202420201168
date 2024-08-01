const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
// npm i -S body-parser
const bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", 3000);

// bodyParser 미들웨어 지정 - POST방식의 파라미터 사용 가능.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  // redirect() 지정 된 URL로 자동으로 페이지 이동
  // res.redirect('http://naver.com');

  // end() 문자열을 화면에 출력한다.
  //res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
  //res.end("안영 세계");
  res.end('{"hello":"world"}');

  var obj = { no: 120, name: "HONG" };
  //res.end(JSON.stringify(obj) );
  // send()는 수식 or 문자열을 화면에 보여 준다.
  // writeHead()는 생략.
  //res.send(obj);
});

// localhost:3000/data/hong/love  ==> get('/data/:user/:message)
// localhost:3000/data?user=HONG&message=LOVE
app.get("/data", (req, res) => {
  // POST 방식에는 body, 패스파라미터 방식 params, GET 빙식에는 query 객체로 전달...
  // POST 방식에서는 bodyParser 미들웨어 설정 필수.
  const user = req.query.user;
  const message = req.query.message;
  const jsonData = { user, message };

  res.send(jsonData);
});

// 임시 todoList 데이터 저장
const todoList = [
  { no: 101, title: "자연 보호 하기", done: true },
  { no: 102, title: "엄마 생일 선물", done: false },
  { no: 103, title: "아빠 집 사주기", done: true },
  { no: 104, title: "취직 하기", done: false },
  { no: 105, title: "여친 부모님 여행 시켜주기", done: false },
];

var noSeq = 106;

// AJAX를 REST 방식으로 처리 (HTML 폼은 GET과 POST만 가능)
// GET - 출력, 검색
// POST - 입력
// PUT - 수정
// DELETE - 삭제
// FETCH - 부분수정
// ... 그 외

//  검색 상세보기 통합됨
/*app.get("/todo/search", (req, res) => {
  var keyword = req.query.title;
  console.log(req.query);
  var newTodoList = todoList.filter((todo) => {
    console.log(todo.title);
    console.log(keyword);
    console.log((todo.title != keyword) != 1);

    return (todo.title != keyword) != 1 || keyword == "";
  });
  console.log(newTodoList);

  req.app.render("todo", { todoList: newTodoList }, function (err, html) {
    res.end(html);
  });
});*/

//검색이랑 상세보기 or 전체보기 합쳐도 될듯
// 검색은 타이트만 왔어 첫번째 if문 false 들뜻

//  상세보기 or 전체보기
app.get("/todo", (req, res) => {
  console.log(req.query);
  if (req.query.no) {
    var no = req.query.no;
    var idx = todoList.findIndex((t) => {
      return t.no == no;
    });
    //console.log(idx);
    if (idx != -1) {
      //console.log(1);
      //console.log(todo);
      req.app.render(
        "todoDetail",
        { todo: todoList[idx] },
        function (err, html) {
          res.end(html);
        }
      );
    } else {
      res.send(null);
    }
    return;
  } else if (req.query.title) {
    console.log(1);
    var keyword = req.query.title;
    var newTodoList = todoList.filter((todo) => {
      //console.log(todo.title);
      //console.log(keyword);
      //console.log((todo.title != keyword) != 1);
      return (todo.title != keyword) != 1 || keyword == "";
    });
    req.app.render("todo", { todoList: newTodoList }, function (err, html) {
      res.end(html);
    });
    return;
    //console.log(newTodoList);
  }
  //console.log(3);

  //res.send(todoList);
  req.app.render("todo", { todoList }, function (err, html) {
    res.end(html);
  });
});

// 입력
app.post("/todo/input", (req, res) => {
  var title = req.body.title;
  todoList.push({ no: noSeq++, title, done: false });
  res.redirect("/todo");
});

//수정 입력 페이지
app.get("/todo/edit", (req, res) => {
  var no = req.query.no;
  var idx = todoList.findIndex((t) => {
    return t.no == no;
  });
  if (idx != -1) {
    //console.log({ todo: todoList[idx] });
    req.app.render("todoEdit", { todo: todoList[idx] }, function (err, html) {
      res.end(html);
    });
    return;
  }
  //console.log(no);
  res.send("정보 불러오기 오류가 있습니다");
});
// 수정
app.put("/todo/updat/:no", (req, res) => {
  console.log(1);
  var todo = req.body;
  //console.dir(todo);
  var idx = todoList.findIndex((t) => {
    return t.no == todo.no;
  });
  console.log(idx);
  if (idx != -1) {
    todoList[idx] = todo;
    //console.log(todoList[idx]);
    /*req.app.render("todo", { todo: todoList[idx] }, function (err, html) {
      res.end(html);
    });*/
    res.redirect("/todo");
    return;
  }
  res.send("정보 불러오기 오류가 있습니다");
});

//삭제 확인 페이지

app.get("/todo/deleteck", (req, res) => {
  var no = req.query.no;
  var idx = todoList.findIndex((t) => {
    return t.no == no;
  });
  if (idx != -1) {
    //console.log({ todo: todoList[idx] });
    req.app.render("todoDelete", { todo: todoList[idx] }, function (err, html) {
      res.end(html);
    });
    return;
  }
  //console.log(no);
  res.send("정보 불러오기 오류가 있습니다");
});

// 삭제
app.delete("/todo/delete/:no", (req, res) => {
  var no = parseInt(req.body.no);
  var idx = todoList.findIndex((t) => {
    return t.no == no;
  });
  if (idx != -1) {
    todoList.splice(idx, 1);
  }
  res.redirect("/todo");
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`노드js 서버 실행 중 >>> http://localhost:${app.get("port")}`);
});
