const http = require('http');
const express = require('express');
const app = express();

app.set('port', 3000);

// public 폴더를 static으로 설정.
app.use('/', express.static('public'));


const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log(`서버 실행 >>> http://localhost:${app.get('port')}`);
});