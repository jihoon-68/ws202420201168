const http = require("http");
const express = require('express');
const app =express();

const port =3000;

app.set('views', 'views');
app.set('view engine', 'ejs');


//paudlic/index.html을 보여주기 위한 명령어
app.use(express.static('public'));

let saramList=[
    {no:102, name:'홍길동', email:'hong@saram.com', job:'도둑', age:32},
    {no:103, name:'이길동', email:'lee@saram.com', job:'변호사',age:24},
    {no:103, name:'김길순', email:'kim@saram.com', job:'프로그래머',age:34},
    {no:104, name:'박길순', email:'park@saram.com', job:'군인',age:41}
]

//saram
app.get('/saram', function(req,res){
    //ejs 페이지로 렌더링
    // -views/saram.esj 페이지의 로딩
    

    var message_data ="사람 정보 관리 페이지";
    req.app.render('saram',{message_data,saramList}, function(err, html){
        res.end(html);
    });
});
app.get('/saram/detail',function(req,res){
    console.log();
    var idx = saramList.findIndex(function(saram){
        
        return saram.no == req.query.no;
    });

    var saram =null;

    if(idx != -1 ){
        saram = saramList[idx];
    }
    
    req.app.render('saramDetail',{saram}, function(err, html){
        res.end(html);
    });
});

app.get('/saram/edit', function(req, res) {
    console.log("GET - /saram/edit >>>> no: " + req.query.no);
    var idx = saramList.findIndex(function(saram) {
        return saram.no == req.query.no;
    });
    var saram = null;
    if(idx != -1) {
        saram = saramList[idx];
    }
    req.app.render('saramEdit', {saram}, function(err, html) {
        res.end(html);
    });
});

app.get('/saram/update', function(req, res) {
    console.log("GET - /saram/update >>> ", req.query);
    // saramList에서 해당 정보를 찾아서 update 하기.

    var idx = saramList.findIndex(function(saram) {
        return saram.no == req.query.no;
    });

    if(idx != -1) {
        saramList[idx] =req.query;
        /*saramList[idx].name = req.query.name;
        saramList[idx].email = req.query.email;
        saramList[idx].job = req.query.job;
        saramList[idx].age = req.query.age;*/
    }
    res.redirect('/saram');
    
});

app.get('/saram/delete', function(req, res) {
    console.log("GET - /saram/delete >>> ", req.query);
    // saramList에서 해당 정보를 찾아서 update 하기.
    var List =[];
    saramList.findIndex(function(saram) {
        if(saram.no != req.query.no){
            List.push(saram);
        }
    });

    if(List != -1) {
        saramList = List;
        
    }
    res.redirect('/saram');
    
});

app.get('/profile', function(req,res){
    res.end('<h1> profile</h1>')
});

const server =http.createServer(app);
server.listen(3000, function(){
    console.log("서버실행중>>> http://localhost:"+port)
});