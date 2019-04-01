var app = require('express')();
var app2 = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

let setedEventName;
let setedPort;

//设置跨域访问  
app2.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// create application/json parser
// node.js必须用此方法解析
var jsonParser = bodyParser.json()

app2.post('/getport', jsonParser, (req, res) => {
	setedPort = req.body.port
	setedEventName = req.body.eventName;
	io.close();
	console.log('--------------socket restart--------------')
	http.listen(setedPort, function () {
		console.log(`Socket listening on port:${setedPort}`);
	});
	console.log(req.body)
	res.status(200)


	setTimeout(() => {
		io.emit(setedEventName, 'test');
	}, 3000);

})


app2.listen(3001, (res) => {
	console.log('Restful listening on port: 3001')
})