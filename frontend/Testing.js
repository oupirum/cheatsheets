
// One-pixel image:
	data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=

// To run tests by `npm test` command use scripts/test in package.json
// E.g:
	"scripts": {
		"test": "webpack -w -d & karma start --auto-watch"
		// or
		"test": "nodemon -w ./src -w ./tests -x 'npm run build && babel ./tests -d ./tests_bin --presets es2015 && jasmine --config=jasmine.json'"
	},

================================================================================
Karma ========================================================================={

	// Test runner. Can run unit, midway and e2e tests. Works with Mocha,
	// Chai and many other test frameworks.

	================================
	// Setup
	{
		$ npm install --save-dev \
			karma \
			jasmine karma-jasmine \
			phantomjs-prebuilt karma-phantomjs-launcher \
			karma-chrome-launcher \
			karma-coverage \
			karma-webpack karma-babel-preprocessor \

		$ npm install -g karma-cli  // to make `karma` command available

		$ karma init  // will create karma config in current directory

		// /karma.conf.js:
		{
			basePath: '',
			frameworks: ['jasmine'],
				// or "mocha", "chai", etc.
			files: [
				'app/build/**/*.js',
				'app/tests/*.spec.js',
					// by convention tests has .spec.js extension
			],
			preprocessors: {
				'app/**/*.html': ['html2js'],
				'app/**/*.js': ['coverage']
			},
			reporters: ['progress', 'coverage'],
				// or "coverage" etc.
			coverageReporter: {
				type : 'html',
				dir : 'coverage/',
			},
			autoWatch: true,
			singleRun: false,  // continues integration mode
				// if true - capture browser, run tests and exit on finish
			browsers: ['PhantomJS'],
				// or "Chrome", "Firefox", etc.
			ChromeHeadless: {
				base: 'Chrome',
				flags: [
					'--no-sandbox',
					'--headless',
					'--disable-gpu',
					'--remote-debugging-port=9222',
				],
			},
			concurrency: Infinity,
			browserConsoleLogOptions: {
				level: "log"
			},
		}

		// /karma.conf.js for Webpack + ES6:
		{
			var webpackConfig = require('./webpack.config.js');

			files: [
				'specs/**/*.spec.js',
			],
			preprocessors: {
				'specs/**/*.spec.js': ['webpack'],
			},
			webpack: {
				module: webpackConfig.module,
				resolveLoader: webpackConfig.resolveLoader,
			},
			// webpack: {
			// 	module: {
			// 		rules: [{
			// 			test: /\.js$/,
			// 			use: {
			// 				loader: 'babel-loader',
			// 				options: {
			// 					presets: ['es2015'],
			// 					plugins: [
			// 						'transform-es2015-modules-umd',
			// 						['transform-react-jsx', {
			// 							'pragma': 'm'
			// 						}]
			// 					]
			// 				}
			// 			}
			// 		}],
			// 	}
			// },
			webpackMiddleware: {
				noInfo: true
			},
		}

		// /karma.conf.js for plain ES6:
		{
			files: [
				'src/**/*.js',
				'specs/**/*.spec.js',
			],
			preprocessors: {
				'src/**/*.js': ['babel'],
				'specs/**/*.spec.js': ['babel'],
			},
			babelPreprocessor: {
				options: {
					presets: ['es2015'],
					plugins: ['transform-es2015-modules-umd'],
					sourceMap: 'inline',
				},
			},
		}
	}
	================================
	// Run
	{
		$ karma start  // start server or do singleRun
			// opts:
			--single-run
			--no-single-run
			--auto-watch
			--no-auto-watch
			--log-level disable|error|warn|info|debug
			--reporters progress|dots|junit|growl|coverage
			--browsers Chrome|Firefox|PhantomJS
			--report-slower-than <ms>

		$ karma run  // trigger a test run
	}
}
================================================================================
Jasmine ======================================================================={

	// Behavior-driven testing framework.
	// Includes assertion library, mock library, etc.

	// Can be used with karma or in node.

	// Run in node:
		$ jasmine --config=./jasmine.json

		// jasmine.json:
		{
			"spec_dir": "tests",
			"spec_files": [
				"**/*[sS]pec.js"
			],
			"helpers": [
				"tests/helpers/**/*.js"
			],
			"stopSpecOnExpectationFailure": false,
			"random": false
		}

	================================
	// Define test suite
	{
		describe(suiteDescr, func())  // define test suite
			// in the func callback must be defined tests and hooks or
			// another test suites
		it(testDescr, func([done()]))  // define test
			// done() callback can be used to test async functions (call
			// when complete)
			// To fail async test call done.fail([err])

		beforeAll(func([done()]))  // hook for setup
		afterAll(func([done()]))  // hook for teardown
		beforeEach(func([done()]))
		afterEach(func([done()]))

		fail([err])  // manually fail test

		// Each beforeEach/it/afterEach sequence uses the same this object.

		// Rename "describe" to "xdescribe" to skip test suite.

		// Setup timeout

			jasmine.DEFAULT_TIMEOUT_INTERVAL : ms
			// set it in context of necessary test suite
	}
	================================
	// Assertion
	{
		expect(any).toBe(any [, message])  // identity (reference equality)
		expect(any).not.toBe(any [, message])
		expect(any).toEqual(any [, message]) // equality

		expect(any).toBeDefined([message])
		expect(any).toBeNull([message])
		expect(any).toBeTruthy([message])
		expect(any).toBeFalsy([message])

		expect(string).toMatch(pattern [, message])

		expect(number).toBeNaN([message])
		expect(number).toBeLessThan(number [, message])
		expect(number).toBeGreaterThan(number [, message])

		expect(array).toContain(any [, message])
		expect(string).toContain(string [, message])

		expect(func).toTrow()
		expect(func).toTrowError(error)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(number)
		expect(spy).toHaveBeenCalledWith(args...)
		expect(spy).toHaveBeenCalledWith(jasmine.objectContaining(obj))
		expect(spy).toHaveBeenCalledWith(jasmine.any(type))
	}
	================================
	// Mocking
	{
		spyOn(object, methodName) : Spy  // replace method with a spy
			// spy will not call the original method by default
			.and.callThrough() : Spy  // enable calling the original
			.and.callFake(func) : Spy
			.and.returnValue(any) : Spy
			.and.throwError(error) : Spy
			.and.stub() : Spy  // restore the initial spying

		jasmine.createSpy(name) : Spy  // function
		jasmine.createSpyObj(objName, methodName[]) : Spy  // object

		// Spied method has property .calls that stores all calls:
			any() : bool  // true if called at least once
			count() : number
			argsFor(i) : any[]  // get args passed to call number i
			mostRecent() : call  // get args and context of recent call
				// call - {args: any[], object: any, returnValue: any}
			first() : call  // get args and context of first call
			all() : call[]
			reset()

		// Ex:
			var obj;

			beforeEach(function() {
				obj = {
					m: function() {
						console.log('m() called', arguments);
					}
				};
				spyOn(obj, 'm').
						and.callThrough();
			});

			it('Test 1;', function() {
				obj.m({a: 'a'});

				expect(obj.m).toHaveBeenCalledWith({a: 'a'});
			});
	}

	================================
	// Ex:
	{
		describe('App Module:', function() {
			var module;

			before(function() {
				module = angular.module('App');
			});

			it('should be registered', function() {
				expect(module).not.toEqual(null);
			});

			describe('Dependencies:', function() {
				var deps;
				before(function() {
					deps = module.value('appName').requires;
				});

				it('should have App.Controllers as a dependency', function() {
					expect(hasModule('App.Controllers')).toEqual(true);
				});

				function hasModule(m) {
					return deps.indexOf(m) >= 0;
				}
			});
		});
	}
}
================================================================================
Mocha ========================================================================={

	// Simple testing framework for js and nodejs.
	// Depends on assertion and mock libraries.
	// Supports TDD and BDD style.

	// Install
	{
		$ npm install -g mocha
		// or:
		$ npm install --save-dev mocha

		// add to package.json:
			'scripts': {
				'test': 'node_modules/mocha/bin/mocha test'
			}
			// to make `npm test` available
	}

	================================
	// Run
	{
		$ node_modules/mocha/bin/mocha test
		// or:
		$ npm test
	}
	// Run in browser
	{
		$ mocha init target_dir  // will generate files
			// in the targe_dir for running tests in the browser

		// e.g. index.html will be like:
			<link href="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.css" rel="stylesheet"/>
			<script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"></script>

			<script>mocha.setup("bdd")</script>
			<script src="lib/angular.min.js"></script>
			<script src="js/app.min.js"></script>
			<script src="tests/test1.js"></script>
			<script src="tests/test2.js"></script>
			...
			<script>
				mocha.checkLeaks();
				mocha.run();
			</script>
	}

	================================
	// Define test suite
	{
		// BDD interface
			describe(suiteDescr, func())  // define test suite
				// in the func callback must be defined tests and hooks or
				// another test suite
			it(testDescr, func([done([err])]))  // define test
				// done([err]) callback can be used to test async functions
				// (invoke when complete)

			before(func([done([err])]))  // hook for setup
			after(func([done([err])]))  // hook for teardown
			beforeEach(func([done([err])]))
			afterEach(func([done([err])]))

		// TDD interface
			suite(suiteDescr, func())  // define test suite
			test(testDescr, func([done([err])]))  // define test

			setup(func([done([err])]))
			teardown(func([done([err])]))
			suiteSetup(func([done([err])]))
			suiteTeardown(func([done([err])]))

		// Suite and test methods
			retries(n)  // repeat test n times
			timeout(ms)  // setup timeout for suite or test

		// Ex:
			// node:
			var assert = require('assert');  // builtin

			describe('Array', function() {
				describe('#indexOf()', function() {
					this.timeout(1000);

					it('should return -1 if value is not present', function() {
						this.timeout(100);
						assert.equal(-1, findEntry('val'));
					});
					...
				});
			});

			// browser:
			describe('App Module:', function() {
				var module;

				before(function() {
					module = angular.module('App');
				});

				it('should be registered', function() {
					expect(module).not.equal(null);
				});

				describe('Dependencies:', function() {
					var deps;
					before(function() {
						deps = module.value('appName').requires;
					});

					it('should have App.Controllers as dependency', function() {
						expect(hasModule('App.Controllers')).equal(true);
					});

					function hasModule(m) {
						return deps.indexOf(m) >= 0;
					}
				});
			});
	}
}
================================================================================
Chai =========================================================================={

	// Assertion library

	// Install
	{
		$ npm install --save-dev chai
	}

	// Assert
		assert.ok(val [, message])
		assert.equal(val1, val2 [, message])
		assert.typeOf(val, type [, message])
		assert.lengthOf(arr, len [, message])
		assert.property(obj, prop [, message])

	// Expect
		expect(val1).equal(val2)
		expect(val1).not.equal(val2)
		expect(val).be.a(type);
		expect(arr).have.length(len);
		expect(obj).have.property(prop);
}
================================================================================
Sinon ========================================================================={

	// Mock library

	// Install
	{
		$ npm install --save-dev sinon
	}

	================================
	// Spy
	// Spy is like a proxy that records calls, arguments, returning values and
	// exceptions.
	// It calls through to the original method.
	{
		sinon.spy() : spy
		sinon.spy(obj, method) : spy

		// Spy:
			withArgs(arg1, ...) : spy

			called : bool
			callCount : number
			calledOnce : bool
			calledOn(obj) : bool
			calledWith(arg1, ...) : bool
			calledBefore(spy) : bool
			calledAfter(spy) : bool
			threw() : bool
			threw(obj) : bool
			returned(obj) : bool
			reset()
	}
	================================
	// Stub
	// Stub like a spy with ability to specify behaviour.
	{
		sinon.stub() : stub
		sinon.stub(obj, methodName) : stub  // create stub of method
		sinon.stub(obj, methodName, func) : stub  // replace method to func
		sinon.stub(obj) : stub  // for all methods

		// Stub:
			withArgs(arg1, ...) : stub
			onCall(n) : stub  // n'th call

			returns(data)
			throws(err)
			returnsArg(n)  // return n'th argument
			callsArg(n)  // call n'th arg as callback
			callsArgWith(n, arg1, ...)  // call n'th arg as callback with
				// arguments
	}
	================================
	// Mock
	// Mock like a spy and stub with ability to specify expectations
	{
		sinon.mock(obj) : mock

		// Mock:
			mock.expects(methodName) : expectation
			mock.restore()
			mock.verify()

		// Expectation:
			atLeast(n)  // n calls
			atMost(n)
			exactly(n)
			never()
			once()
			withArgs(arg1, ...)
			withExactArgs(arg1, ...)
			verify()
	}
	================================
	// FakeServer
	{
		sinon.fakeServer.create() : server

		respondWith(data)
		respondWith(method, path, [
			statusCode,
			headers,
			data
		])
			// Ex:
				server.respondWith('GET', '/users', [
					200,
					{'Content-Type': 'application/json'},
					'[{"id": 1, "name": "Gwen"}, {"id": 2, "name": "John"}]'
				]);
		respond()  // flush responses defined by respondeWith
		restore()
	}
}
