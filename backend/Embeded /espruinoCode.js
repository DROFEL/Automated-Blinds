var wifi = require('Wifi');
var WebServer = require('WebServer');
var Storage = require('Storage');

var http = require('http');


digitalWrite(13, 1);
digitalWrite(15, 0);

let server;

function request(req, res) {
  console.log(req);
  switch(req.url){
    case "/":
      console.log("Send index");
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(Storage.read('index.html', 0, 0));
      break;
    case "/script.js":
      console.log("Send index");
      res.setHeader("application/javascript");
      res.writeHead(200);
      res.end(Storage.read('script.js', 0, 0));
      break;
    case "/wifi_submit":
      req.on('data', (data) =>{
        data = JSON.parse(data);
        
        wifi.connect(data.ssid, {password: data.password, authMode: 'wpa2'}, (e)=>{
          if(e){
            res.writeHead(500);
            res.end();
            console.log(e);
          } else {
           console.log("wifi connected");
           http.get("https://www.google.com/", response => {
             if(response.statusCode == 200){
               res.writeHead(200);
               res.end(); 
             }
           });
          }
          
        });
        
      });
      
      break;
    default:
      res.writeHead(404);
      res.end();
  }
  
}

function startServer() {
  //http.createServer(request).listen(8080);
  server = http.createServer(request);
  
  server.listen(8080);
}

if (wifi)
        wifi.startAP('Espruino_Server', {}, () => {
          console.log('Wifi started');
          startServer();
        });
    else
        startServer();

