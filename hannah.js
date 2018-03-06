// let num = 0;
// for (let i = 2; i < process.argv.length; i++) {
// 	num += Number(process.argv[i]);
// }
// console.log(num);

// console.log(fs.readFileSync(process.argv[2]).toString().split('\n').length -1);
// fs.readFile(process.argv[2], (err, file) => {
// 	console.log(file.toString().split('\n').length -1 );
// })

// fs.readdir(process.argv[2], (err, list) => {
// 	if (err) throw err;
// 	console.log(list.filter(el => el.indexOf('.' + process.argv[3]) > -1).join('\n'));
// })

// const mymodule = require('./mymodule');
// const fs = require('fs');
// mymodule()

// const http = require("http");

// http.get(process.argv[2], (res) => {
// 	res.setEncoding('utf8');
// 	res.on('data', (data) => {
// 		console.log(data);
// 	})
// })

// http.get(process.argv[2], (res) => {
// 	res.setEncoding('utf8');
// 	let str = '';
// 	res.on('data', (data) => {
// 		str += data;
// 	})
// 	res.on('end', () => {
// 		console.log(str.length);
// 		console.log(str);
// 	})
// })


/* ---------EXERCISE: MAKE IT MODULAR */
// const myFilter = require('./mymodule');

// const dir = process.argv[2]
// const ext = process.argv[3]
// const cb = (err, filteredList) => {
// 	if (err) return console.error('ERROR: ', err)
// 	filteredList.forEach(el => console.log(el));
// }

// myFilter(dir, ext, cb);

/* ---------EXERCISE: JUGGLING ASYNC */
// const http = require('http');
// let queue = [];

// //their solution: nice
// const bl = require('bl')
// const results = []
// let count = 0

// function printResults () {
//   for (let i = 0; i < 3; i++) {
//     console.log(results[i])
//   }
// }

// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err) {
//         return console.error(err)
//       }

//       results[index] = data.toString()
//       count++

//       if (count === 3) {
//         printResults()
//       }
//     }))
//   })
// }

// for (let i = 0; i < 3; i++) {
//   httpGet(i)
// }

/*------------EXERCISE: TIME SERVER */
//listen to TCP connections o the port - first arg
//for each connection, write current date and 24 hour time followed by newline
//after sending string close the connection
//socket obj has meta-data regarding the connection

// const net = require('net');
// const strftime = require('strftime');
// const server = net.createServer(socket => {
// 	//socket handling logic
// 	// socket.write(data) //write to the socket
// 	// socket.end() //close the socket
// 	let date = strftime('%F %T', new Date())
// 	let slicedDate = date.slice(0, date.length-3) + '\n';
// 	socket.end(slicedDate) //- end method also takes data so you can simplify like this
// })
// server.listen(process.argv[2]);

/*------------EXERCISE: HTTP FILE SERVER */
//write http server that servers the same text file for each req
//listen on port in first arg
//location of file to serve will be second arg

// const fs = require('fs');
// const http = require('http');
// const fileLocation = process.argv[3];

// const cb = (req, res) => {
// 	const str = fs.createReadStream(fileLocation).pipe(res);
// 	 //stream file contents to the response
// }

// const server = http.createServer(cb) //takes a cb that is called once for each connection received by server
// server.listen(process.argv[2]);

/*------------EXERCISE: HTTP UPPERCASER */

//server that receives only post reqs and converts post body chars to uppercase and returns it to the client
// const http = require('http');
// const map = require('through2-map');

// const server = http.createServer((req, res) => {
// 	req.pipe(map(chunk => {
// 		return chunk.toString().toUpperCase()
// 	})).pipe(res);

// })

// server.listen(process.argv[2]);

/*------------EXERCISE: JSON API SERVER*/

//http server that serves json data on a get request to a certain location
//req will contain query string with a key 'iso' and an iso format time as the val

const http = require('http');
const url = require('url');

const parseTime = time => {
	return {hour: time.getHours(), minute: time.getMinutes(), second: time.getSeconds()}
}

const unixTime = time => {
	return {unixtime: time.getTime()}
}

const server = http.createServer((req, res) => {
	const {pathname, query} = url.parse(req.url, true);
	const time = new Date(query.iso)
	if (pathname === '/api/parsetime') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(parseTime(time)));
	}
	else if (pathname === '/api/unixtime') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(unixTime(time)))
	}
	res.writeHead(404)
	res.end()
})

server.listen(process.argv[2]);
