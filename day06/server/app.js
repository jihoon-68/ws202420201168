const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
// npm i -S body-parser
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'ejs');
app.set('port', 3000);

// bodyParser 미들웨어 지정 - POST방식의 파라미터 사용 가능.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    // redirect() 지정 된 URL로 자동으로 페이지 이동
    // res.redirect('http://naver.com');

    // end() 문자열을 화면에 출력한다.
    //res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    //res.end("안영 세계");
    res.end('{"hello":"world"}');

    var obj = {no:120, name:"HONG"};
    //res.end(JSON.stringify(obj) );
    // send()는 수식 or 문자열을 화면에 보여 준다.
    // writeHead()는 생략.
    //res.send(obj); 
});

// localhost:3000/data/hong/love  ==> get('/data/:user/:message)
// localhost:3000/data?user=HONG&message=LOVE
app.get('/data', (req, res) => {
    // POST 방식에는 body, 패스파라미터 방식 params, GET 빙식에는 query 객체로 전달...
    // POST 방식에서는 bodyParser 미들웨어 설정 필수.
    const user = req.query.user;
    const message = req.query.message;
    const jsonData = {user, message};

    res.send(jsonData);
});

// 임시 todoList 데이터 저장
const todoList = [
    {no: 101, title:'자연 보호 하기', done:true},
    {no: 102, title:'엄마 생일 선물', done:false},
    {no: 103, title:'아빠 집 사주기', done:true},
    {no: 104, title:'취직 하기', done:false},
    {no: 104, title:'여친 부모님 여행 시켜주기', done:false},
];

// AJAX를 REST 방식으로 처리 (HTML 폼은 GET과 POST만 가능)
// GET - 출력, 검색
// POST - 입력
// PUT - 수정
// DELETE - 삭제
// FETCH - 부분수정
// ... 그 외

app.get('/todo', (req, res) => {
    res.send(todoList);
});

app.post('/todo', (req, res) => {
    res.send(todoList);
});

app.put('/todo', (req, res) => {
    res.send(todoList);
});

app.delete('/todo', (req, res) => {
    res.send(todoList);
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`노드js 서버 실행 중 >>> http://localhost:${app.get('port')}`);
});