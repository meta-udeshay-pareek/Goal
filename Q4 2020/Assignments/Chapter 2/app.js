var http = require('http');

http.createServer(function(req,res){
    res.write("Welcome back alien!!");
    res.end();
}).listen(8080)