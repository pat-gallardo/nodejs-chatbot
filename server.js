const http = require('http');

const server = http.createServer(function(req, res){
    console.log('request made: ' + req.url)
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hey hey');  
});

server.listen(3000, '127.0.0.1');
console.log('Hello man listening on 3000')