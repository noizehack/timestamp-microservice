var http = require('http');
var fs = require('fs');

var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
fs.readFile('index.html', 'utf8', function (err, data) {
  if (err) throw err;
  //data = data.replace(/<!--URL-->/g, serviceUrl);
  
  var server = http.createServer(function (req, res) {
    var path = req.url;
    if (path === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      data = data.replace(/<!--URL-->/g, 'https://' + req.headers.host + '/');
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
  var port = process.env.PORT || 3000;
  server.listen(port);
  console.log('server listening on port:' + port);
});