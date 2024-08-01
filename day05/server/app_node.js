const http = require("http");

const server =http.createServer(function(req, res){
    res.write('Hello World!');
    res.end();
});
server.listen(3000, function(){
    console.log("서버실행중>>> http://localhost:3000")
});