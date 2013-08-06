/* Simple HTTP to HTTPS redirecting server */

var ejs = require('ejs');
var http = require('http');

var port = process.env.PORT || '3000';
var host = process.env.HOST;

var view_source = require('fs').readFileSync(__dirname + '/view.ejs', 'utf8');
var view_compiled = require('ejs').compile(view_source);

var server = http.createServer(function (req, res) {
	var url = require('url').parse('http://' + req.headers.host + req.url)
	var location = 'https://' + url.hostname + url.path;
	
	var html = view_compiled({location:location});
	res.writeHead(307, {
		'Content-Type': 'text/html',
		'Location': location
	});
	res.end(html);
});

if(host) {
	server.listen(port, host);
	console.log('Server running at http://'+host+':'+port+'/');
} else {
	server.listen(port);
	console.log('Server running at port '+port);
}

/* EOF */
