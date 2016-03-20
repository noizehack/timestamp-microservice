var http = require('http');
var url = require('url');
var fs = require('fs');

var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

fs.readFile('.env', 'utf8', function (err, data) {
  if (err) throw err;
  var serviceUrl = getEnvVar(data, 'URL');
  var port = getEnvVar(data, 'PORT');
  
  fs.readFile('index.html', 'utf8', function (err, data) {
    if (err) throw err;
    data = data.replace(/<!--URL-->/g, serviceUrl);
    
    var server = http.createServer(function (req, res) {
      var path = url.parse(req.url, true).path;
      if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      } else if (path !== '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var input = path.slice(1);
        var inputDate;
        if (/^[0-9]*$/.test(input)) {
          inputDate = new Date(+input * 1000);
        } else {
          inputDate = new Date(input.replace(/%20/g, ' '));
        }
        var json = {};
        if (!(inputDate == 'Invalid Date')) { //had to use == instead of === to get this to work
          json = {
            unix: inputDate.getTime() / 1000,
            natural: months[inputDate.getMonth()] + ' ' + inputDate.getDate() + ', ' + inputDate.getFullYear()
          };
        } else {
          json = {
            unix: null,
            natural: null
          };
        }
        res.end(JSON.stringify(json));
      }
    });
    
    server.listen(port);
    console.log('server listening on port:' + port);
  });
});

function getEnvVar(str, name) {
  var endOfName = str.indexOf(name) + name.length + 1;
  if (str.indexOf('\n', endOfName) === -1) {
    return str.slice(endOfName);
  } else {
    return str.slice(endOfName, str.indexOf('\n', endOfName));
  }
}