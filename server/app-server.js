var express = require('express');
var app = express();

var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/data', function(req, res){
	console.log('received request');
	console.log(req.body);
	res.send('ok');
});

app.post('/upload', upload.single('file'), function(req, res){
	console.log('received upload request');
	console.log(req.body);
	console.log(req.file);
	console.log('file name: ' + req.file.filename);
	res.send({'image_url': req.file.filename});
});
