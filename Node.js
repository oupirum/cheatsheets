
// NodeJS is a JavaScipt-based platform built on Google's V8 Engine.
// It's uses for building backend for IO intensive web apps.

// Features:
	// Asynchronous and event driven
	// Fast V8 Engine
	// Single threaded but highly scalable
	// No buffering

// version: 6.11.1 lts

================================================================================
Basics ========================================================================{
	
	// Install NodeJS:
		curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
		sudo apt-get install nodejs
		
		// Set path:
			export NODE_PATH="/usr/local/lib/node_modules:/usr/lib/node_modules"
	
	// NPM - Node Package Manager
		// Online repositories are searchable at https://npmsearch.com
		
		// Create module
			npm init  // will create package.json in current directory
		
		// Each module and application has package.json file at root to define
		// properties of package.
		
		// Install module
			npm install <modulename>  // install module in current app dir
			npm install --save|--save-dev <modulename>  // install in
				// current app dir and add to dependencies|devDependencies
				// in project.json
			npm install -g <modulename>  // install globally
		
		// List installed modules
			npm ls
			npm ls -g  // globally
			npm ls --depth 0  // dont print dependencies
		
		// Uninstall
			npm uninstall <modulename>
		
		// Update
			npm update <modulename>
		
		// Restore
			npm install  // install all modules listed in project.json
			npm install --production  // exclude devDependencies
		
		// Publish module
			npm adduser  // register at npm repo
			npm publish
	
	// npm-scripts
		
		// To build project or run tests from cmd use 
		// scripts field in package.json
		// E.g:
			"scripts": {
				"build": "babel ./src -d ./bin --presets es2015 --source-maps",
				"test": "nodemon -w ./src -w ./tests -x 'npm run build && babel ./tests -d ./tests_bin --presets es2015 --source-maps && jasmine --config=./jasmine.json'",
				"start": "npm run build && node ./bin/index.js"
			},
			
			// so it will be available as
			$ npm run build
			$ npm test
			$ npm start
	
	// Modules
		// CommonJS pattern
		
		// Import
			// Module can be imported using 'require' function
			
			var module = require(module);
				// where module - module name or relative path to js file
		
		// Export
			// Module can export constructor or members to allow import them
			// by other modules or entry points
			
			module.exports = function() {...};  // constructor
			// import:
				var c = require('./some_module.js');
				var inst = c();
			
			exports.one = function() {...};
			exports.two = {name: 'some'};
			// import:
				var sc = require('./some_module.js');
				sc.one();
				var name = sc.two.name;
				
				// exports - alias for module.exports
}
================================================================================
Environment ==================================================================={
	
	// global variables:
		__filename : string  // current executing script (absolute path)
		__dirname : string  // directory that contains this script
	
	// console module
	{
		console.log([obj, ...])
		console.info([obj, ...])
		console.warn([obj, ...])
		console.error([obj, ...])
		console.dir([obj] [, options])
		
		console.time(label)
		console.timeEnd(label)
		
		console.trace(message [, ...])
	}
	
	// process module
	{
		process.cwd() : string
		process.chdir(string)
		
		process.exit([code])
		process.memoryUsage() : number  // bytes
		process.uptime() : number  // seconds node running
		
		process.stdout : Writable
		process.stdin : Readable
		process.argv : string[]
		process.execPath : string
		process.env : object  // environment variables
		process.exitCode
		
		// Events:
			exit
			beforeExit
			uncaughtException
	}
	
	// os module
	{
		var os = require('os');
		
		os.tmpdir() : string
		os.hostname() : string
		os.platform() : string
		os.release() : string
		
		os.EOL
	}
}
================================================================================
Events ========================================================================{
	
	// Node is a single threaded but it support concurrency via concept of
	// event and callback.
	
	// EventEmitter
		var events = require('events');
		
		new events.EventEmitter()
		
		on(eventName, func([data, ...])) : this
		once(eventName, func([data, ...])) : this
		removeListener(eventName, func) : this
		removeAllListeners(eventName) : this
		
		listeners(eventName) : func[]
		listenerCount(eventName) : number
		setMaxListeners(n) : this
		
		emit(eventName [, data, ...]) : bool
}
================================================================================
Stream ========================================================================{
	
	// All streams are EventEmitters, but has additional methods and properties
	// depending on whether they are readable, writable or duplex.
	
	// Readable
		read([size]) : string|Buffer|null
		pipe(writerStream [, options]) : writerStream  // automatically send
			// data to writable stream
			// options - object:
			{
				end: true
			}
		unpipe()  // detach destination stream
		pause()  // stop emitting 'data' events
		resume()  // resume emitting 'data' events
		isPaused() : bool
		setEncoding(encoding)
		
		// Events:
			readable
			data
			end
			error
			close  // not all streams emit this event
		
		// Ex:
			var fs = require('fs');
			
			var readable = fs.createReadStream('file.txt');
			readable.on('readable', ()=> {
				var chunk;
				while (null !== (chunk = readable.read())) {
					console.log('got %d bytes of data', chunk.length);
				}
			});
	
	// Writable
		write(str [, encoding, func()]) : bool
			// returning false indicates that data buffered internally - need
			// wait for 'drain' event and continue writing after this.
		end([str, encoding, func()])
		setDefaultEncoding(encoding)
		cork()  // force buffering
		uncork()  // flush data buffered since cork() called
		
		// Events:
			drain
			finish
			error
			pipe
			unpipe
	
	// Duplex
		// readable + writable
		// e.g. tcp socket
	
	// Transform
		// duplex where ouput computed from input
		// e.g. zlib stream, crypto stream
		
		// Ex:
			// gzip:
			var fs = require('fs');
			var zlib = require('zlib');
			var input = fs.creteReadSteam('file');
			var output = fs.createWriteStream('file_gzip');
			input.pipe(zlib.createGzip()).pipe(output);
			
			// gunzip:
			var fs = require('fs');
			var zlib = require('zlib');
			var input = fs.creteReadSteam('file_gzip');
			var output = fs.createWriteStream('file');
			input.pipe(zlib.createGunzip()).pipe(output);
}
================================================================================
Buffer ========================================================================{
	
	// Array of octets
	
	new Buffer(size)
	new Buffer(str, encoding)
	new Buffer(val[])
	
	Buffer.concat(buffer[] [, totalLen]) : Buffer
	
	buf[index]  // read|write
	length
	
	copy(target [, targetStart, sourceStart, sourceEnd])
	slice([start, end]) : Buffer
	fill(value [, offset, end])
	compare(buff2) : number
	equals(buff2) : bool
	write(str [, dstOffset, len, encoding]) : writenNum
	writeIntLE(value, dstOffset, len)
	readIntLE(offset, len) : number
	writeIntBE(value, dstOffset, len)
	writeUIntLE(value, dstOffset, len)
	writeFloatLE(value, dstOffset, len)
	readFloatLE(offset) : number
	writeFloatBE(value, dstOffset, len)
	toString([encoding] [, start, end]) : string
}
================================================================================
FS ============================================================================{
	
	// fs module
	{
		var fs = require('fs');
		// Each method has sync version
			// async: fs.open(path, flag [, mode], func(err, fd))
			// sync: var fd = fs.openSync(path, flag [, mode])
		
		fs.open(path, flag [, mode], func(err, fd))
			// flags - r (read), r+ (read, write), rs (read sync), rs+,
				// w (rewrite, create), wx (create, write, not rewrite),
				// w+ (read, rewrite, create), wx+ (create, read, write,
				// not rewrite), a (append, create non-existing), ...
			// mode - chmod, default: 0666
		fs.close(fd, func(err))
			// fd - file descriptor received from fs.open()
		
		fs.read(fd, buffer, dstOffset, len, srcOffset, func(err, readen))
			// srcOffset - set null to read from current pos
		fs.write(fd, buffer, srcOffset, len, dstOffset, func(err, written))
			// dstOffset - set null to write at current pos
		
		fs.readFile(path [, options], func(err, data))
			// data - string|Buffer
			// options - object:
			{
				encoding: null,
				flag: 'r'
			}
		fs.writeFile(path, data [, options], func(err))
			// data - string|Buffer
			// options - object:
			{
				encoding: 'utf-8',
				flag: 'w',
				mode: 0o666
			}
		fs.appendFile(path, data [, options], func(err))
		fs.truncate(path, len, func(err))
		
		fs.createReadStream(path [, options]) : ReadStream
			// options - object:
			{
				flags: 'r',
				encoding: null,
				fd: null,
				mode: 0o666,
				autoClose: true
			}
		fs.createWriteStream(path [, options]) : WriteStream
			// options - object:
			{
				flags: 'w',
				defaultEncoding: 'utf-8',
				fd: null,
				mode: 0o666
			}
		
		fs.unlink(path, func(err))
		fs.rename(path1, path2, func(err))
		fs.realpath(path [, cache] func(err, path))
			// cache - mapping object
		fs.symlink(path, linkpath [, type], func(err))
			// type - 'file'|'dir'
		fs.stat(path, func(err, fs.Stats))
			// fs.Stats
				isFile() : bool
				isDirectory() : bool
				isBlockDevice() : bool
				isCharacterDevice() : bool
				isSymbolicLink() : bool
				isFIFO() : bool
				isSocket() : bool
		fs.chmod(path, mode, func(err))
		fs.utimes(path, atime, mtime, func(err))
		
		fs.mkdir(path [, mode], func(err))
			// mode - chmod, def: 0777
		fs.rmdir(path, func(err))
		fs.readdir(path, func(err, filename[]))
	}
	
	// path module
	{
		var path = require('path');
		
		path.normalize(path) : path
		path.join(path1, path2) : path
		path.resolve([pathFrom, ...], pathTo) : path  // get absolute path
		path.relative(pathFrom, pathTo) : path  // get relative path
		path.dirname(path) : string
		path.basename(path) : string
		path.extname(path) : string  // with dot
		
		path.sep : string  // path separator
		path.delimeter : string  // paths delimeter, e.g. ":"
	}
	
	// glob module
	{
		var glob = require('glob');
		
		glob(pattern [, options], done(err, path[]))  // async search
		glob.sync(pattern [, options]) : path[]  // sync search
			// options:
			{
				cwd: path,
				root: path,
				nodir: bool,  // match only files
				dot: bool,  // include dotfiles
				nosort: bool,
				absolute: bool  // always return abs paths
			}
	}
	
	// watch module
	{
		// watch for changes in directory
		var watch = require('node-watch');
		
		watch(glob|glob[] [, options], handle(filename)) // watch for add,
			// change or remove files recursively
			// options:
			{
				recursive: true,
				followSymLinks: false,
				maxSymLevel: 1,
				filter: (path)=> true
			}
	}
}
================================================================================
TCP socket ===================================================================={
	
	// TCP socket, server and client
	
	var net = require('net');
	
	net.createServer([options] [, func(socket)]) : server
		// options - object:
		{
			allowHalfOpen: false,
			pauseOnConnect: false
		}
		// callback - for 'connection' event
	
	net.connect(port, host [, func()]) : socket
		// callback - for 'connect' event
	net.connect(path [, func()]) : socket  // unix socket
	net.connect(options [, func()]) : socket
		// options - object:
		{
			port: portNum,
			host: 'localhost',
			family: 'IPv4',
			lookup: dns.lookup,
			path: unixSocketPath,
		}
	
	net.isIP(value) : bool
	net.isIPv4(value) : bool
	net.isIPv6(value) : bool
	
	// net.Server
		listen(port, host [, backlogNum] [, func()])
			// callback - for 'listening' event
		listen(path [, backlogNum] [, func()])  // unix socket
		listen(options [, func()])
			// options: object:
			{
				port: portNum,
				host: hostStr,
				backlog: backlogNum,
				path: unixSocketPath,
				exclusive: false
			}
		close([func(err)])
		
		getConnections(func(err, count))
		address() : object
			// returns object:
			{
				port: portNum,
				family: ipVer,
				address: ip
			}
		
		// Events:
			listening
			connection (socket)
			close
			error (err)
	
	// net.Socket
		localAddress : string
		localPort : number
		remoteAddress : string
		remotePort : number
		
		setEncoding(encoding)
		setTimeout(timeoutMs)
		
		write(data [, encoding] [, func()]) : bool
		end()
		destroy()
		
		address() : object
			// returns object:
			{
				port: portNum,
				family: ipVer,
				address: ip
			}
		
		// Events:
			connect
			data (string|buffer)
			end
			close (hasError)
			error (err)
			timeout
			drain
			lookup
	
	// Ex:
		// server:
			var net = require('net');
			var os = require('os');
			
			var server = net.createServer(function(socket) {
				console.log('client connected');
				
				socket.on('data', function(data) {
					console.log('received from client:', data.toString());
					socket.write('pong' + os.EOL);
				});
				socket.on('end', function() {
					console.log('client disconnected');
				});
			});
			server.listen({port: 8081}, function() {
				console.log('listening...');
			});
		
		// client:
			var net = require('net');
			var os = require('os');
			
			var socket = net.connect({port: 8081}, function() {
				console.log('connected to server');
				socket.write('ping' + os.EOL);
			});
			
			socket.on('data', function(data) {
				console.log('received from server:', data.toString());
				socket.end();
			});
			socket.on('end', function() {
				console.log('disconnected from server');
			});
			
			socket.setTimeout(10000);
			socket.on('timeout', function() {
				console.log('timeout');
				socket.destroy();
			});
}
================================================================================
HTTP =========================================================================={
	
	// HTTP client, server
	
	var http = require('http');
	
	http.get(url, func(response))
	
	http.createServer([func(request, response)]) : server
		// callback - for 'request' event
	
	http.request(options [, func(response)]) : request
		// options - object:
		{
			protocol: 'http',
			hostname: 'localhost',
			port: 80,
			family: ipVer,
			socketPath: unixSocketPath,
			method: 'GET',
			path: '/',
			headers: object,
			auth: basicAuthStr,
			agent: http.globalAgent
		}
		// callback - for 'response' event
	
	// http.Server
		listen(port, hostname [, func()])
			// callback - for 'listening' event
		listen(path [, func()])  // unix socket
		close([func(err)])
		
		setTimeout(timeoutMs, func())
		
		// Events:
			connect (request, socket, head)
			upgrade (request, socket, head)
			checkContinue (request, response)
			request (request, response)
			close
			clientError (err, socket)
	
	// http.ClientRequest
		method : string  // readonly
		headers : object  // readonly
		url : string  // readonly
		
		write(data [, encoding] [, func()])
		end([func()])
		abort()
		
		setTimeout(timeoutMs [, func()])
			// callback - for 'timeout' event
		
		// Events:
			connect (response, socket, head)
			upgrade (response, socket, head)
			continue
			socket (socket)
			response (response)
			data (string|buffer)
			end
			abort
			timeout
	
	// http.ServerResponse
		statusCode : number
		statusMessage : string
		sendDate : bool
		
		setHeader(name, value)
		getHeader(name) : string
		removeHeader(name)
		
		writeHead(statusCode [, statusMessage] [, headers])
		write(data [, encoding] [, func()]) : bool
		end([func()])
		
		setTimeout(timeoutMs, func())
			// callback - for 'timeout' event
		
		// Events:
			data (string|buffer)
			end
			finish
			close
			timeout
	
	// Ex:
		// server:
			var http = require('http');
			var fs = require('fs');
			var url = require('url');
			
			var server = http.createServer(function(request, response) {
				var pathname = url.parse(request.url).pathname;
				console.log('request for ' + pathname + ' received');
				
				var reqBody = new Buffer(0);
				request.on('data', function(data) {
					reqBody = Buffer.concat([reqBody, data]);
				});
				request.on('end', function() {
					console.log('request body:', reqBody.toString());
					
					fs.readFile(pathname.substr(1), function (err, data) {
						if (err) {
							response.writeHead(404,
									{'Content-Type': 'text/plain'});
							console.error('err:', err);
						} else {
							response.writeHead(200,
									{'Content-Type': 'text/plain'});
							response.write(data);
						}
						response.end();
					});
				});
			});
			server.listen(8082, '127.0.0.1', function() {
				console.log('server running at http://127.0.0.1:8082');
			});
		
		// client:
			var http = require('http');
			
			var options = {
				hostname: '127.0.0.1',
				port: '8082',
				method: 'POST',
				path: '/tmp/file',
				headers: {
					'Content-Type': 'application/json'
				}
			};
			var request = http.request(options, function(response) {
				console.log('response status:', response.statusCode);
				
				var body = new Buffer(0);
				response.on('data', function(data) {
					body = Buffer.concat([body, data]);
				});
				response.on('end', function() {
					console.log('response body:', body.toString());
				});	
			});
			request.write('{"key": "val й"}', 'utf-8');
			request.end();
	
	// Ex (node-static):
		var static = require("node-static");
		var files = new static.Server("web_content");
		
		requre("http").createServer(function(request, response) {
			request.addListener("end", function() {
				files.serve(request, response);
			}).resume();
		}).listen(8082)
}
================================================================================
URL ==========================================================================={
	
	// URL parsing
	
	var url = require('url');
	
	url.parse(urlString [, parseQueryString] [slashesDenoteHost]) : urlObj
		// parseQueryString - set true to enable parsing get params
		// slashesDenoteHost - set true to make '//aaa/bbb' perceive as
			// hostname: 'aaa', pathname: '/bbb'
		// returns object:
		{
			href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash',
			protocol: 'http:',
			slashes: true,
			host: 'host.com:8080',
			auth: 'user:pass',
			hostname: 'host.com',
			port: '8080',
			path: '/p/a/t/h?query=string',
			pathname: '/p/a/t/h',
			search: '?query=string',
			query: {
				query: 'string'
			},
			hash: '#hash'
		}
	url.format(urlObj) : urlString
		// 'href' and 'path' are ignores
	url.resolve(urlFrom, urlTo) : urlString
}
================================================================================
Express ======================================================================={
	
	// Processing incoming http requests.
	// Defining route tables for http requests.
	// Dynamic rendering html pages using templates.
	
	npm install --save express
	
	npm install --save body-parser
	npm install --save multer
	npm install --save cookie-parser
	
	
	var express = require('express');
	
	express() : app
	express.Router() : router
	
	express.static(path [, options]) : middleware
		// options - object:
		{
			dotfiles: 'ignore',  // 'allow', 'deny'
			etag: true,
			extensions: false,  // fallbacks for file extension
			fallthrough: true,  // fall-through client errors
			index: 'index.html',
			redirect: true,  // redirect to trailing '/' if pathname is directory
			maxAge: 0,
			lasModified: true,
			setHeaders: func(response, path, stat)
		}
	
	// app object
		app.mountpath : string|string[]  // path pattern|s on which this
			// sub-app was mounted
		
		use([path], middleware|router|subapp)  // mount middleware at
			// specified path
		listen(port, host [, backlog] [, func()]) : server
	
	// router object
		all(path, func(request, response [, next]))  // register handler
			// for any method
			// path - pathname starting with '/',
			// can contain regex specchars ('()', '?', '+', '*') or
			// named params
		get(path, func(request, response [, next]))  // register handler for GET
		post(path, func(request, response [, next]))
		put(path, func(request, response [, next]))
		delete(path, func(request, response [, next]))
		
		use([path], middleware)
		
		param(name, func(request, response, next, value, name))  // validate
			// named param
			// invoke next() on success, next(err) on error
	
	// request object
		app : app
		baseUrl : string  // current mountpath
		route : string  // current route pattern
		originalUrl : string  // same as http.ClientRequest.url
		hostname : string
		protocol : string
		ip : string  // remote IP
		
		method : string
		path : string
		params : object  // named route params
		query : object  // query params
		
		body : object  // if body-parser middleware mounted
		files : object  // if multer mounted
		cookies : object  // if cookie-parser mounted
		
		get(name) : string  // get header
		accepts(mimeType) : bool
		is(mimeType) : bool  // check content-type
	
	// response object
		app : app
		
		set(name, value)  // set header
		get(name) : string  // get header
		append(name, value)  // add header value
		type(mimeType)  // set content-type
		cookie(name, value [, options])  // set cookie
			// options - object:
			{
				domain: string,
				path: string,
				expires: date,
				httpOnly: bool,
				secure: bool,
				signed: bool,
				encode: func,
				maxAge: string
			}
		
		format(map)  // select callb to create response appropriate to
			// request's "Accept" header
			// map - object:
			{
				mimeType: func(),
				...,
				'default': func()
			}
		
		redirect([statusCode], path)
		status(statusCode)
		download(path [, filename] [, func(err)])  // attachment
		send([data])
		sendFile(path [, options] [, func(err)])
			// options - object:
			{
				root: path,
				headers: object,
				dotfiles: 'ignore',  // 'allow', 'deny'
				acceptRanges: true,
				lastModified: true,
				cacheControl: true,
				maxAge: 0
			}
		json([data])
		render(viewName [, scope] [, func(err, html)])
		end()
	
	// Ex:
		var express = require('express');
		var bodyParser = require('body-parser');
		var multer  = require('multer');
		var cookieParser = require('cookie-parser');
		
		var app = express();
		var router = express.Router();
		
		router.use('/images', express.static('img'));
		
		router.use(bodyParser.urlencoded({extended: false}));
		router.use(multer({dest: '/tmp/'}));
		router.use(cookieParser());
		
		router.use(function(request, response, next) {
			console.log('middleware for all requests');
			next();  // process following middlewares and routes
		});
		
		router.get('/ping', function(request, response) {
			response.send('pong');
		});
		
		router.post('/fileupload', function(request, response) {
			console.log('user:', request.body.username);
			console.log('file:',
					request.files.file.name,
					request.files.file.type,
					request.files.file.path);
			response.end();
		});
		
		app.use('/', router);
		
		app.listen(8081, function() {
			var host = server.address().address;
			var port = server.address().port;
			console.log("listening at http://%s:%s", host, port);
		});
}
================================================================================
Static server ================================================================={
	
	// Basic server for static content
	
	$ npm install -g node-static
	
	// Run:
		$ cd /static_content_dir
		$ static
			// options:
				-a addr  // def: 127.0.0.1
				-p port  // def: 8080
}
