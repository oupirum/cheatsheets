
================================================================================
Basic ==========================================================================
================================================================================

	<script type="text/javascript">  // insert script to html
		// ...
	</script>

	<script defer src="script.js" type="text/javascript"></script>  // inject
		// script from external file
		// src - script file
		// defer - defer script execution until page will be fully loaded
		// type - mimetype (application/javascript, or text/javascript for IE 8)
		// async - load script asynchronous (html5, IE >= 10)

	// strict mode
	"use strict";  // This directive defines that script should be used in
		// "strict mode"
		// strict mode - execution in a meet modern standards mode

================================
// Types
	// Objects, functions, arrays passes by reference
	// others - primitives - by value

	number
	string
	boolean
	undefined
	object
	function

	// Null values:
		undefined  // "value not assigned". Variable defined, but value not
			// assigned (type - "undefined")
		null  // null value (type - "object")

	// Builtin classes:
		Object  // Superclass for all others
		Array
		Date
		Arguments
		Number
		String
		Boolean
		RegExp
		// & etc.


	typeof variable  // get type name (string)

	varible instanceof ClassName  // is ClassName there in prototypes chain
		// Example:
			var arr = [1, 2, 3];
			arr instanceof Array  // true

		// Each object has prototype property,
		// up to Object, which prototype is null.


	// Trying to read undefined variable throws exception.
		// In this case need to check existence by:
		typeof name != "undefined"


	// In logical context these are equals to false:
		0
		""
		null
		undefined
		NaN
		// others - true

		0 == ""   // true
		0 == " "  // true
		0 == "0"  // true

		false == ""   // true
		false == " "  // true
		false == "0"  // true
		false == 0    // true

		null == 0  // false
		null == ""  // false
		null == false  // false
		undefined == 0  // false
		undefined == ""  // false
		undefined == false  // false

		null == undefined  // true

	// Type conversion:
		Number(any) : number
		String(any) : string
		Boolean(any) : boolean
		Object(any) : object

================================
// Operators

	// in descending order of priority:
	++  // increment
	--  // decrement

	!, ~  // logical NOT, binary NOT

	+a, -a  // change sign
	*, /, %, +, -

	<<, >>, >>>

	<, <=, >, >=
	==, !=
	===, !==

	&, ^, |  // binary AND, XOR, OR
	&&, ||  // logical AND, OR

	? :  // ternary operator

	=

================================
// Control statements

	// Conditional
		if (year == 2011) {
			// ...
		} else if (year > 2011) {
			// ...
		} else {
			// ...
		}

	// Cycles
		for (init; condition; step) {
			// ...
		}
			// Ex:
				for (var i = 0; i < 3; i++) {
					alert(i);
				}

		while (condition) {  // Cycle. While condition is true will repeat
			// iterations
			// body...
		}

		break  // return from cycle
		continue  // stop current iteration

	// Iterator (ES6):
		for (let v of range) {
			// ...
		}
		// range object must have iterator property:
		range[Symbol.iterator] = function() {...}
			// func that returns object with method next()
			// on each call next() returns object {done: bool, value: any}

		// Ex:
			let range = {
				from: 1,
				to: 5
			};

			range[Symbol.iterator] = function() {
				let current = this.from;
				let last = this.to;
				return {
					next() {
						if (current <= last) {
							return {
								done: false,
								value: current++
							};
						} else {
							return {
								done: true
							};
						}
					}
				};
			};

	// Label
		name: {
			// ...
		}

	// Return from labeled block
		break lab;

		// Ex:
			lab: {
				while (true) {
					// ...
					var c = confirm("Stop looping?", "");
					if (c) {
						break lab;  // quit from whole labeled block (lab)
					}
				}
			}

	// switch
		switch  // Replaces several if statemens

		// Ex:
			switch(x) {
				case 'value1':  // if (x === 'value1')
					// ...
					break;
				case 'value2':
					// ...
					break ;
				default:
					// if not equal to any of values...

	================================
	// Exceptions

		try	{
			// ...
		} catch(err) {
			// if in try block was thrown exception...
		} finally {
			// invokes in any case...
		}

		throw err;  // throw exception, where err - some exception object:
			// {name: 'ERR_NAME', message: 'error description'} or Error object

		new Error([message] [, filename] [, linenumber])  // base class for
			// exceptions

			name : string
			message : string
			stack : string

	================================
	// Intervals

		setInterval(func, N) : intervalId  // invokes function
			// every N milliseconds
		clearInterval(intervalId)  // stop interval
		setTimeout(func, N) : timeoutId  // invokes once after N ms
		clearTimeout(timeoutId)  // cancel timeout

		// Ex:
			var n = 0;
			var interval = setInterval(function() {
				alert(n);
				if (n > 10) {
					clearInterval(interval);  // stop
				}
			}, 10000);

================================
// Variables

	var varname;  // define variable
	var varname = value;  // define and assign

	// Scope of variable - current function (local variables) or
	// window (global).
	// Hoisting - local variable definitions (without assignment) will be
	// automatically hoisted by interpreter
	// For example:
		function() {
			console.log(v);  // undefined
			var v = "v";
		}
		// is same as:
		function() {
			var v;
			console.log(v);  // undefined
			v = "v";
		}

	let somevar = ...  // define variable in block scope
		// let-defined variables will not be hoisted

	const somevar = ...  // define constant
		// same as let, but could not be changed

================================
// Destructuring, expanding (ES6/7)

	// Array:
		// by order
		let [one, two] = ['a', 'b'];
		let [one, two=defVal] = ['a'];  // with default value
		let [, , three ] = ['a', 'b', 'c'];  // skipping
			// three - 'c'
		let [one, ...rest] = ['a', 'b', 'c'];  // spread operator
			// rest - ['b', 'c']
		let arr2 = [...arr1, 'c', 'd']  // expanding

	// Object:
		// by name
		let {a, b} = {a: 'a', b: 'b'};
			// a - 'a', b - 'b'
		let {a, b=defVal} = {a: 'a'};  // with default value
		let {a: one, b: two} = {a: 'a', b: 'b'};  // changing names
			// one - 'a', two - 'b'
		let obj2 = {...obj1, c: 'c', d: 'd'}  // expanding

================================
// Functions

	function f() {  // function declaration
		// ...
		return someVar;
	}

	var f = function() {  // function expression
		// ...
	};
	f();  // invoke

	// This
		// in function 'this' - global object or undefined in strict mode
		// in function that called as method - context object
		// Ex:
			function f() {
				console.log(this);
			};

			var obj = {};
			obj.m = f;

			f();  // window
			obj.m();  // obj

	// Hoisting
		// hoisting works for function declaration, but not for expression

		fn();  // Works
		function fn() {
		}

		fn();  // Error. Called before function is assigned to variable
		var fn = function() {
		}

	// Arguments
		// inside function available "arguments" variable, that contains array
		// of actual arguments
		// Ex:
			function f(one, two) {
				arguments[1];   // two
				arguments.length;  // 2
				// arguments - Object, not an Array
				// Convert arguments to normal array:
				// var args = [].slice.call(arguments);
			}

	// Function can be created from string
		// Constructor "Function" always creates top-level functions

		new Function(params, body)
			// params - comma-separated arguments, e.g: "one, two"
			// body - function body, e.g: "return two;"

	// Context binding and carrying
		// function object has methods:
		call(ctx [, arg2, arg2, ...])  // invoke function in context of ctx
			// object with arguments arg1, arg2, ...
		apply(ctx, args[])    // invoke function in context of ctx object
			// with arguments from args array
		bind(ctx [, arg2, arg2, ...]) : func  // bind context and args (
			// do not invoke)
			// Ex:
				var onError = console.error.bind(console);

			// Basic realization:
				var bind = function(fn, context) {
					var bindArgs = [].slice.call(arguments, 2);
					return function() {
						var fnArgs = [].slice.call(arguments);
						return fn.apply(context, bindArgs.concat(fnArgs));
					};
				};

	================================
	// Closure
		// Scopes chain saves while there any reference to parent scope

		var wrapper = (function() {
			var d = 0;
			console.log("invoke wrap(), d:", d);
			var inner = function() {
				d++;
				console.log("invoke inner(), d:", d);
			};
			return inner;
		})();
		wrapper();

	================================
	// Arrow function (ES6)

		param=> returnValue
			// shorthand for function(param) { return returnValue; }

		(param1, param2)=> returnValue
			// shorthand for function(param1, param2) { return returnValue; }

		(param)=> {
			// ...
		}
			// shorthand for function(param) {...}

		// Arrow function has not 'this', 'super', 'arguments' properties.
		// It's uses 'this' and 'super' from wrapper function.
		// bind() not working for arrow functions.

	================================
	// Default parameter values (ES6)

		function f(param=defVal) {
			// ...
		}
		// defVal will be used only if undefined given

	================================
	// Spread parameters (ES6)

		function f(param, ...rest) {
			// ...
		}

		f(1, 2, 3);
			// rest - [2, 3]

================================
// Objects, Methods

	// Static class

		var Cls = {
			name: "name",
			surname: "surname",

			// function-property:
			method: function(par0, par1) {
				// ...
			},

			// method:
			method2() {  // ES6
				// ...
				super.parMeth();  // from prototype
			},

			set fullName(name) {  // ES6
				[this.name, this.surname] = name.split(" ");
			},
			get fullName() {
				return name + " " + surname;
			}
		};

		// access to field|method by class name:
		Cls.method(par, other);

		Cls.fullName = "nm snm";

	================================
	// Object constructor function

		var Cls = function() {
			var This = this;

			this.pubProp = "public field";

			this.pubMethod = function() {
				This.pubProp = "1234";  // This - reference to context
			};

			// private function:
			var privM = function() {...};
		};

		// public static method:
		Cls.stM = function() {...};

		Cls.stM();

		var obj = new Cls();
		obj.pubMethod();

================================
// Prototype inheritance

	var Par = function() {
		console.info("Par constructor invoked", "this:", this);

		this.a = "parent field a";
		this.b = "parent field b";
	};
	Par.prototype.method = function() {
		console.log("Par.method()", this.a);
	};
	Par.st = "static field";

	var Child = function() {
		console.info("Child constructor invoked", "this:", this);
		Par.apply(this, arguments);

		// Override field:
		this.a = "child field a";
	};
	// Inherit all methods and fields:
	Child.prototype = Object.create(Par.prototype);
	Child.prototype.constructor = Child;
	// Override method:
	Child.prototype.method = function() {
		console.log("Child.method()", this.a);
	};

	// Result:
		var par = new Par();  // Par constructor invoked this: Par {}
		var child = new Child();  // Child constructor invoked this: Child {}
			// Par constructor invoked this: Child {}

		console.log(par.a);  // parent field a
		console.log(child.a);  // child field a
		console.log(child.b);  // parent field b
		par.method();    // Par.method() parent field a
		child.method();    // Child.method() child field a

		console.log("child is instance of Par:", child instanceof Par);
			// true
		console.log("child is instance of Child:", child instanceof Child);
			// true

================================
// Classes (ES6)

	class ClassName {
		constructor(val) {
			this.field = val;
		}
	}

	class Child extends ClassName {
		constructor() {
			super("val");
		}

		get val() {
			return this.val;
		}

		method() {
			// ...
		}

		static staticMethod() {
			// ...
		}
	}

================================
// Modules (ES6)

	// Export

		export function f() {
		};

		export {one, two as alias};

		export default three;

	// Import

		import * as alias from "./module/file";
		alias.f();
		import {f} from "./module/file";
		f();

		import {one, alias} "./module/file";
		one();

		import three from "./module/file";

================================================================================
Promise ========================================================================
================================================================================
	// ES6

	// Promise - object that stores state of async operation and callbacks.
	// There 3 states: pending, fulfilled, rejected.
	// To promise can be binded two callbacks: onFulfilled, onRejected

	new Promise(constr(resolve, reject))
		// constr must invoke one (and only one) of resolve(res) or
		// reject(err) callbacks.
		// res or err will be passed to onResolved(res) or onRejected(err)
		// appropriately.

	// bind callbacks:
	then(onResolved(res)) : promise
	then(onResolved(res), onRejected(err)) : promise
	catch(onRejected(err)) : promise
		// onResolved or onRejected can return value or new promise to chain
		// promises

	Promise.all(promise[]) : promise  // res - array of results
	Promise.race(promise[]) : promise  // res - result of first
	Promise.resolve(res) : promise  // directly resolved
	Promise.reject(res) : promise  // directly rejected

	// Ex:
		new Promise(function(resolve, reject) {
			// ...
			resolve("someres");
		}).then(function(res) {
			// ...
			return "someres2";
		}).then(function(res) {
			console.log(res);
			return new Promise(function(resolve, reject) {
				reject(new Error("someerr"));
				// or:
				// throw new Error("someerr");
			});
		}).then(function(res) {
			return new Promise(function(resolve, reject) {
				// ...
				resolve("someres3");
			});
		}, function(err) {
			return "error catched";  // swallow error
			// or:
			// throw err; // pass error to next catcher
		}).then(function(res) {
			// ...
			console.log(res);  // "error catched"
		}).catch(function(err) {
			// will never be called
			console.error(err);
		});

	// Async/await
		// To make promise-returning function synchronous

		// Ex:
			async function f() {
				let res = await getRes();  // getRes returns Promise
					// res - value that will be resolved in Promise
				// ... // execution proceeds only when Promise is resolved
			}

		// Use try/catch to catch errors from await
		// Otherwise uncaught errors will reject Promise returned by async func

================================================================================
Strings, numbers ===============================================================
================================================================================

	encodeURI(str)  // URL-encoding
	encodeURIComponent(str)  // URL-encoding of special characters

	================================
	// String

		length  // length of string (readonly)

		indexOf(substr [, n]) : number  // ret pos of found substr or -1
		lastIndexOf(substr [, n]) : number
		search(patt) : number  // patt - string or regex.
		replace(patt, newsubstr) : string  // patt - string or regex
		split(separ) : array
		substr(start [, length]) : string
		slice(start [, end]) : string
		trim() : string

		// new ES6 methods:
		includes(substr) : bool
		startsWith(substr) : bool
		endsWith(substr) : bool
		repeat(n) : str

	================================
	// Interpolation (ES6)

		var str = `some str ${some_expression} some str
		also can be
		multiline`

	================================
	// RegExp

		var patt = new RegExp(pattern, flags)
			// pattern - string, e.g.: "(name-.*)", flags - string
		var patt = /pattern/flags

		test(str) : bool  // search this pattern and return boolean
		exec(str) : array|null  // search and return array of matched
			// substrings or null

		// Ex:
			str.replace(/ololo/g, "_");  // replace all occurences of "ololo"
				// to "_"

		// Special chars that have to be escaped in regex:
			[]{}().*+?^$|\-

	================================
	// Math, Number

		// Binary number declaration (ES6):
			var b = 0b111;  // 7

		// Octal number declaration (ES6):
			var o = 0o666;  // 438

		Math.round(n) : number  // round to the nearest integer
		Math.floor(n) : number  // round to the nearest integer less than n
		Math.ceil(n) : number  // round to the nearest integer greater than n

		Math.random() : number  // pseudorandom [0, 1) (fraction)
		Math.sqrt(x) : number  // square root
		Math.pow(x, exp) : number  // x in power of exp
		Math.max(a1, a2, ...) : number  // return greatest
		Math.min(a1, a2, ...) : number  // least

		number.toFixed(n) : string  // round number to n digits after decimal
			// point

		isFinite(n) : bool  // true if n is number,
			// false - Infinity or NaN
		parseInt(val [, base]) : number  // translate string to number
			// returns NaN if could not parse number
			// base - base of number system
		parseFloat(val) : number

			// Ex:
				parseInt("12px", 10)  // 12
				parseInt("one")       // NaN
				parseFloat("12.3.4")  // 12.3

		// translate from 16 to 10 number system and vice-versa:
			function decToHex(n){
				return Number(n).toString(16);
			}
			function hexTodec(hex){
				return parseInt(hex, 16);
			}

================================================================================
Array, object ==================================================================
================================================================================

	================================
	// Object

		var obj = new Object()  // create empty object
		var obj = {key: value, ...};
			// key - only strings

		Object.create(prototype [, obj]) : object  // clone object
		Object.assign(target, source1, ...) : object  // merge props to target
			// object and return it
		Object.keys(obj) : array  // get array of keys

		obj[key] // get|set by key
		obj.key  // same

		key in obj  // check existence. key - string.
			// Returns true also for inherited property.
			// To check existence of own property use hasOwnProperty method.

			// enumerate properties of obj:
				for (var key in obj) {
					// ...
				}

		delete obj.key  // remove property
			// returns false if property exists, but could not be removed

		constructor : function
		__proto__ : object
		toString() : string  // string representation of object
		valueOf() : any  // primitive value of object
		hasOwnProperty(key) : bool  // whether property exist on this object
		isPrototypeOf(obj) : bool  // whether this is proto of obj

		================================
		// Object.create polyfill:
			Object.create = function(proto, props) {
				if (typeof proto != 'object') {
					throw TypeError('Object prototype may only be an Object or null');
				}
				var hasOwn = Object.prototype.hasOwnProperty;

				function Temp() {};
				Temp.prototype = proto;
				var obj = new Temp;
				Temp.prototype = null;

				if (props !== undefined) {
					props = Object(props);
					for (var k in props) {
						if (hasOwn.call(props, k)) {
							obj[k] = props[k];
						}
					}
				}

				return obj;
			};

		================================
		// print_r:
			function print_r(arr, level) {
				var print_red_text = "";
				if (!level) level = 0;
				var level_padding = "";
				for (var j=0; j < level + 1; j++) level_padding += "	";
				if (typeof(arr) == 'object') {
					for (var item in arr) {
						var value = arr[item];
						if (typeof(value) == 'object') {
							print_red_text += level_padding + "'" + item + "' :\n";
							print_red_text += print_r(value,level+1);
						} else {
							print_red_text += level_padding + "'" + item +
									"' => \"" + value + "\"\n";
						}
					}
				} else {
					print_red_text = "===>" + arr + "<===(" + typeof(arr) + ")";
				}
				return print_red_text;
			}

	================================
	// Array

		var arr = new Array()  // create empty
		var arr = new Array(e, e1, e2)  // create and fill
		var arr = new Array(n)  // create, length - n (will be filled by
			// undefiled values)
		var arr = [e, e1, e2];

		arr[index]  // read|write

		arr.length  // length of array (read|write)

		indexOf(val [, n]) : number
		join(delim) : string
		slice(start [, end]) : array  // returns part of array
		splice(i, C [, a, b, ...]) : array  // remove C elements, starting from
			// index i, then paste a, b,... instead they
			// returns array of removed elements
		pop() : object  // get and remove last element
		push(val, ...)  // append elements to end of array
		shift() : object  // get and remove first element
		unshift(val, ...)  // append to start

		concat(arr2 [, arr3, ...]) : array  // create new array that will
			// contain elements from this and arr2, arr3, etc.
		reverse()  // reverse THIS array
		sort([func])  // sort this array (ascii order by default)
			// func - function for comparing like (A, B) {}
				// if A must be first - return negative number,
				// otherwise - positive
			// Ex:
				arr.sort(function(a, b) {
					return a - b;  // ascendance
				});
		forEach(func(item, index, arr))
		filter(predicate(item, index, arr)) : any[]
		map(mapper(item, index, arr)) : any[]

		================================
		// Insertion sort:
			function sort(arr) {
				for (var i = 1; i < arr.length; i++) {
					var el = arr[i];
					for (var n = i-1; n >= 0; n--) {
						if (arr[n] > el) {
							arr.splice(n + 1, 1);
							arr.splice(n, 0, el);
						} else {
							break;
						}
					}
				}

				return arr;
			}

		// Shell sort:
			function sort(arr) {
				var i, j, k, h, m = 0, len = arr.length;
				var d = [1, 4, 10, 23, 57, 145, 356, 911, 1968, 4711, 11969, 27901,
						84801, 213331, 543749, 1355339, 3501671, 8810089, 21521774,
						58548857, 157840433, 410151271, 1131376761, 2147483647];
				while (d[m] < len)
					++m;

				while (--m >= 0) {
					k = d[m];
					for (i = k; i < len; i++) {
						j = i;
						h = arr[i];
						while ((j >= k) && (arr[j - k] > h)) {
							arr[j] = arr[j - k];
							j -= k;
						}
						arr[j] = h;
					}
				}

				return arr;
			}

================================================================================
Map, Set =======================================================================
================================================================================
	// ES6

	// Map
		new Map()
		new Map([[key1: val1], ...])
		// key - any type

		size : number
		set(key, val) : this
		get(key) : any
		has(key) : bool
		keys() : any[]
		values() : any[]
		forEach(func(val, key, map))
		delete(key)
		clear()

	// Set
		new Set()

		size : number
		add(val)
		has(val) : bool
		forEach(func(val, val, set))
		delete(val)
		clear()

================================================================================
JSON ===========================================================================
================================================================================

	// Can contain: arrays, objects, strings, numbers, booleans, null
	// Keys and string values must be quoted by double quotes

	// objects contains properties - pairs like "key": "value"
	// Ex:
		{
			"str": "http://example.com/",
			"arr": [1, "two", null]
			"obj": {
				"q": "w"
			}
		}

	// converion to JSON and vice-versa:

		JSON.stringify(obj [, replacer, indentN]) : string
			// replacer - function to modify values
			// indentN - number of spaces for indentation
		JSON.parse(str) : object

================================================================================
DOM, document, window ==========================================================
================================================================================

	// Window

		window.alert(messStr)  // popup with message. Will stop script
			// execution until "Ok" clicked
		window.prompt(mess, def) : string  // popup with input. Returns typed
			// value or null if "Cancel" clicked
		window.confirm(question) : bool  // popup with buttons "Ok" and "Cancel".
			// returns boolean

		window.navigator
			.userAgent
			.platform

		window.screen
			.width|height  // screen resolution

		window.location  // current address (read|write)
			.href      // "http://example.com:3000/pathname/?search=test#hash";
			.protocol  // "http:"
			.host      // "example.com:3000"
			.hostname  // "example.com"
			.port      // "3000"
			.pathname  // "/pathname/"
			.hash      // "#hash"
			.search    // "?search=test"
			.origin    // "http://example.com:3000"

			.replace(url)  // redirect to specified url without saving in history
			.reload()  // refresh page

		window.open(url [, name, params])  // open url in new window|tab
			// will be blocked if was not initiated by user
			// Params:
				left=n, top=n  // coords of top-left corner relative to screen
				width=n, height=n  // width and height of new window. If not
					// specified browser will open tab instead of window
				// properties for window:
				menubar=yes|no  // show|hide menu bar
				toolbar=yes|no  // show|hide nav pane
				location=yes|no  // show|hide address bar
				status=yes|no    // show|hide status bar
				resizable=yes|no  // enable|disable resizing
				scrollbars=yes|no  // show|hide scrollbars
			// Ex:
				window.open('/', 'test',
						'scrollbars=no,resizable=no,status=no,location=no' +
						',toolbar=no,menubar=no,width=0,height=0,left=-1000,' +
						'top=-1000');

	================================
	// Document, Element

		document.createElement(tag) : Element  // create new node
		document.querySelector(selector) : Element
		document.querySelectorAll(selector) : Element[]

	================================
	// Element:

		offsetTop|offsetLeft  // vertical|horizontal offset

		innerHTML  // html-content of node (read|write)
		textContent  // content of node as text (read|write)
		children     // array of child nodes
		parentNode

		style.color = "#333"  // set CSS-property
		style.cssText = "width:100px;\
				height:2px;\
				border:1px solid;"  // rewrite all current CSS-properties of node
					// hereSuchNotation, so
					// 'background-color' will be 'backgroundColor',
					// 'z-index' will be 'zIndex',
					// 'border-left-width' - 'borderLeftWidth', etc.

		getBoundingClientRect() : object
			.left|top
			.width|height

		querySelector(cssSelector) : Element  // search element by selector
			// returns first
		querySelectorAll(cssSelector) : Element  // returns all found as array

		cloneNode(deep) : Element  // clone node with its attributes
			// if deep is true will clone node with its children
		appendChild(elem)  // add elem to list of children of this
		removeChild(elem)
		insertBefore(newElem, elem)  // add newElem to list of children before elem
		replaceChild(newElem, elem)  // replace elem by newElem

		setAttribute(name, value)

		getComputedStyle(elem)  // get current value of css-property
			// it's a function, not method of Element
			// Ex:
				var c = getComputedStyle(elem);
				mt = c.marginTop;

		// Coords of element in the document:
			function getCoords(elem) {
				var box = elem.getBoundingClientRect();
				var body = document.body;
				var docEl = document.documentElement;
				var scrollTop = window.pageYOffset || docEl.scrollTop ||
						body.scrollTop;
				var scrollLeft = window.pageXOffset || docEl.scrollLeft ||
						body.scrollLeft;
				var clientTop = docEl.clientTop || body.clientTop || 0;
				var clientLeft = docEl.clientLeft || body.clientLeft || 0;
				var top = box.top + scrollTop - clientTop;
				var left = box.left + scrollLeft - clientLeft;
				return {
					left: Math.round(left),
					top: Math.round(top),
					width: box.width,
					height: box.height
				};
			}

================================================================================
Events =========================================================================
================================================================================

	// Event listener can be defined by:
		elem.addEventListener('click', function(event) {
			// ...
		});
	// or:
		elem.onclick = function(event) {...}

	// Event types:

		click
		dblclick
		contextmenu

		mouseover
		mouseout

		mousedown
		mouseup
		mousemove

		keydown
		keypress
		keyup

		error
		load
		loadeddata
		beforeunload

	================================
	// To cancel default action need to call
		event.preventDefault()
		// in handler function
	// To stop bubbling event:
		event.stopPropagation()
	// For both:
		return false
		// from handler function

		// For example, to prevent opening url from <a> link:
			document.querySelector("a.my_link").onclick = function(ev) {
				// some stuff...
				return false;
			}

	================================
	// Event object attributes:

		target  // reference to the object that dispatched the event
		clientX|clientY  // coords of event relative to window
		pageX|pageY  // coords of event relative to document
		keyCode  // key code (by keydown, keypress, keyup)
		altKey   // is Alt key pressed

		// Ex:
			input.onmousemove = function(ev) {
				this.value = ev.pageX + ':' + ev.pageY;
			}

			// coords relative to parent element:
			var xPos = ev.pageX - someElem.offsetLeft;

		// Alt + C:
			window.onkeyup = function(e) {
				if (e.altKey) {
					if (~[65, 66, 67].indexOf(e.keyCode)) {
						//...
					}
				}
			};

================================================================================
Date ===========================================================================
================================================================================

	new Date()
	new Date(msTimestamp)
	new Date(year, month, day, hours, minutes, seconds, ms)

	toString()  // "Sun Dec 07 2014 15:01:25 GMT+0300 (Kaliningrad Standard Time)"
	toUTCString()  // "Sun, 07 Dec 2014 12:01:34 GMT"
	toDateString()  // "Sun Dec 07 2014"

	getFullYear()
	getDay()
	getHours()
	...

	setDay(n)
	setHours(n)
	...

	getTime()  // ms timestamp

================================================================================
AJAX ===========================================================================
================================================================================

	var xhr = new XMLHttpRequest();
	xhr.open(method, URL, async);
		// method - "POST", "GET", etc.
		// URL - target url
		// async - true - async (default), false - sync
	xhr.send(reqBody)  // send request (reqBody must be null for GET)

	================================
	// crossbrowser:
	function getXmlHttp() {
		var xmlHttp = null;
		if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xmlHttp;
	}

	function httpReq(URL, method, data, success, error) {
		var request = getXmlHttp();
		request.open(method, URL, true);
		request.setRequestHeader(
				"Content-type", "application/x-www-form-urlencoded");
		// to upload files need to use "Content-type: multipart/form-data"
		request.send(data);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200) {
					success(request.responseText);
				} else {
					if (error) error(request.status);
				}
			}
		}
	}

	// Uploading progress:
		xhr.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				progressBar.value = (e.loaded / e.total) * 100;
				progressBar.textContent = progressBar.value;
			}
		};

	================================
	// CORS
		// To allow cross-domain requests target script must setup header:
		"Access-Control-Allow-Origin: http://domain.net"  // allow from
			// domain.com
		"Access-Control-Allow-Origin: *"  // allow from any domain
		"Access-Control-Allow-Headers: *"

	================================
	// JSONP
		// add script:
			<script type="text/javascript"
				src="http://example.com/getjson?jsonp=callb"></script>
					// where callb - name of function
		// define callback:
			function callb(response) {
				// process response...
			}

		// server returns script that invokes callb with response as argument:
			callb({"paper": "A4", "count": 5});

	================================
	// FormData

		new FormData()
		new FormData(formElement)

		append(name, value)
		append(name, file, fileName)

		// Ex:
			var form = new FormData();
			form.append("var_str", "value");  // dont need to url-encode
			var file = document.querySelector("#file_input");
			form.apend("var_file", file.files[0], file.files[0].name);

================================================================================
Blob ===========================================================================
================================================================================

	// Blob - array of binary data

	new Blob(array)
	new Blob(array, {type: mimeType});

	size : number
	type : string

	slice(start, end, mimeType) : blob

	// ObjectURL from Blob:
		window.URL.createObjectURL(blob) : string

	// Ex:
		var blob = new Blob(['some\n', 'string'], {type: 'text/plain'});
		var blobSub = blob.slice(0, 3);  // "som"

		var objUrl = window.URL.createObjectURL(blob);
		window.open(objUrl);

================================================================================
Worker =========================================================================
================================================================================

	// Worker uses for execution script in background thread

	// In worker script
		// window and document objects are not available in worker script

		// receive data from main script:
			this.onmessage = function(e) {
				console.log("data received:", e.data)
			};

		// inside onmessage can be imported scripts:
			this.importScripts(
					"script0.js",
					"script1.js",
					...);

		// send data to main script:
			this.postMessage(data);

	// In main script:
		// run worker:
			var worker = new Worker(workerScriptPath)

		// receive data from worker script:
			worker.onmessage = function(e) {
				console.log("data received:", e.data)
			};

		// send data to worker:
			worker.postMessage(data);

		// stop worker:
			worker.terminate();

================================================================================
Canvas =========================================================================
================================================================================

	c = document.getElementById("canvas");
	c.width = c.height = 100;
	var ctx = c.getContext("2d");

	ctx.moveTo(x, y)

	ctx.save()  // save current state (color, gradient, fill) to stack
	ctx.restore()  // restore state from stack

	ctx.fillStyle = fill  // set curr fill - color, gradient or image

	ctx.fillRect(x, y, w, h)
	ctx.clearRect(x, y, w, h)

	ctx.fillText(text, x, y [, maxWidth])
	ctx.font = "normal normal 15px Tahoma"
		// Ex:
			ctx.fillStyle = '#ff0000';
			ctx.font = "normal normal 50px Tahoma";
			ctx.fillText('111222', 150, 200, 100);

	ctx.strokeText('text', x, y, m_w)  // uses color from strokeStyle

	ctx.fill()  // fill current contour by fillStyle
	ctx.clip()  // remove all outside current contour

	ctx.globalAlpha = '0.5'

	ctx.globalCompositeOperation = mode  // behaviour of overlaying shapes
		// where mode is a string:
			source-over  // new shape on top of old shapes
			destination-over  // new shape behind the old
			source-in  // show only overlapping part, new on top
			destination-in
			source-atop  // show only overlapping part of new, and
				// whole old shape
			destination-atop
			lighter  // mix colors on overlapping part
			darker
			xor  // overlapping part will be transparent
			copy  // show only new shape

	ctx.shadowOffsetX = n
	ctx.shadowBlur = n
	ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'

	ctx.strokeStyle = color  // color or gradient for stroke

	ctx.lineTo(x, y)
	ctx.lineCap = type
		// where type is a string:
			butt  // def
			round  // rounded ends
			square
	ctx.lineJoin = type
		// where type is a string:
			miter  // def
			round
			bevel

	ctx.fillStroke(x, y, w, h)

	ctx.bezierCurveTo(x1, y1, x2, y2, ..., endX, endY)

	ctx.quadraticCurveTo(x, y, endX, endY)

	ctx.arc(centerX, centerY radius, startRad, endRad, isAntiClockwise)

	ctx.lineWidth = n
	ctx.strokeStyle = '#000000'

	ctx.stroke()  // draw contours

	ctx.beginPath()  // start new contour
	ctx.closePath()  // end current contour

	ctx.isPointInPath(x, y) : bool

	ctx.getImageData(x, y, w, h) : array  // get rgba data - array -
		// 4 numbers for each pixel
	ctx.createImageData(w, h) : array  // create empty rgba data
	ctx.putImageData(rgbaData, x, y)   // draw rgba data
		// Ex:
			var d = ctx.createImageData(50, 50);
			for (var i = 3; i < d.data.length; i += 4) {
				d.data[i] = 255;
				d.data[i - 3] = 100;
				d.data[i - 2] = 100;
				d.data[i - 1] = 100;
			}
			ctx.putImageData(d, 60, 60);

	ctx.createLinearGradient(x, y, endX, endY) : gradient
	grad.addColorStop(n, color)  // set color of intermediate point
		// n - fraction from 0 to 1
		// color - color hex
		// Ex:
			var grad = ctx.createLinearGradient(110, 110, 310, 310);
			grad.addColorStop(0, '#ff0000');
			grad.addColorStop(0.4, '#00ffff');
			grad.addColorStop(0.6, '#0077ff');
			grad.addColorStop(1, '#0000ff');
			ctx.fillStyle = grad;
			ctx.fillRect(110, 110, 310, 310);

	ctx.createRadialGradient(x1, y1, r1, x2, y2, r2) : gradient

	ctx.createPattern(img, type) : pattern
		// img - Image object
		// type is a string:
			repeat
			repeat-x
			repeat-y
			no-repeat
		// Ex:
			var ptrn = ctx.createPattern(img, "repeat");
			ctx.fillStyle = ptrn;
			ctx.fillRect(0, 0, 350, 150);  // fill rect by repeating image

	ctx.drawImage(img, x, y [, width, height])
		// paste and optionally scale
		// img - Image object
		// if width and height specified image will be scaled

	ctx.drawImage(img, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight)
		// paste and crop

	ctx.rotate(rad)
	ctx.scale(x, y)  // scale canvas
		// x and y - fractions from 0 to 1
	ctx.translate(x, y)  // shift

	canvas.toDataURL() : string  // dataurl of png
		// Ex:
			var du = canv.toDataURL();
			var img = document.createElement('img');
			img.src = du;
			document.body.appendChild(img);

================================================================================
Local Storage ==================================================================
================================================================================

	// LocalStorage

		// Set data:
			localStorage.setItem("name", "value");
			// or:
			localStorage["name"] = "value";
			// or:
			localStorage.name = "value";

			// value have to be string!

		// Get data:
			var d = localStorage.getItem("name");
			// or:
			var d = localStorage["name"];
			// or:
			var d = localStorage.name;

		// Remove:
			localStorage.removeItem("name");

	================================
	// WebSQL

		// Open or create DB:
			openDatabase(name, versionNumber, showingName, size)  // retirns
				// DB ref. May overflow size

		// Do new transact to DB:
			DBref.transaction(function(tx) {
				// transaction process
			});

		// Send SQL request:
			tx.executeSql(queryString, val[], success, error)

		// Example:
			var query = "CREATE TABLE tablename (id REAL UNIQUE f0, f1)";
			This.DB.transaction(function(tx) {
				tx.executeSql(query, [], function(tx, result) {
						// success
					}, function(tx, error) {
						// error
					});
			});
			// or:
			var query = "INSERT INTO tablename (f0, f1) values(?, ?)";
			tx.executeSql(query, ["000", {"11": "111"}], null, null);

		// For getting data:
			var query = "SELECT COUNT(*) FROM " + tableName;
			// or:
			t.executeSql('SELECT title, author FROM docs WHERE id=?', [id],
					function (t, result) {
						report(result.rows[0].title, result.rows[0].author);
					});

		// Get data from request result object:
			result.rows.item(i)[fieldName]

			// Example:
				This.DB.transaction(function(tx) {
					tx.executeSql(query, [], function(tx, result) {
							var f0Value = result.rows.item(0)["f0"];
						}, null);
				});

	================================
	// Data types of SQL

		// Fractional numbers:
		UNSIGNED
		FLOAT
		DOUBLE
		REAL		synonym for DOUBLE
		DECIMAL		stores as string
		NUMERIC		synonym for DECIMAL

		// String:
		VARCHAR		<= 255 chars
		TEXT		<= 65 535
		LONGTEXT	<= 4 294 967 295

		// Bynary data:
		BLOB		<= 65 535
		LONGBLOB	<= 4 294 967 295

		// Date and time:
		DATE		date in format YYYY-MM-DD
		TIME		time in format HH:MM:SS
		DATETIME	date and time YYYY-MM-DD HH:MM:SS
		TIMESTAMP	date and time as timestamp

================================================================================
RequireJS ======================================================================
================================================================================

	// CDN:
		//requirejs.org/docs/release/2.2.0/minified/require.js

	// Dependencies management
	// AMD pattern

	// Load requirejs:
		<script data-main="main.js" src="require.js"></script>
		// so, requirejs will run main.js - entry point of app

	// Load dependency
		require(depends[], func(depen1, ...))
			// depends[] - list of module names or script paths without
			// extensions. Paths are relative to config.baseUrl
			// func(depen1, ...) - callback, will be invoked after loading all
			// specified dependencies.
			// callback arguments avaialble only for modules that defined by
			// define() function.

	// Config
		// Entry point main.js also can have requirejs.config:
		requirejs.config({
			baseUrl: path,  // path to dir that contains scripts
			paths: {
				moduleName: path,  // relative to baseUrl
				...
			},
			shim: {  // needs only for modules that was not defined directly
					// by define() function
				moduleName: {
					deps: depends[],
					exports: varname  // name of variable that will be return
						// value of this module
				}
			}
		})

	// Define module
		// To define script as module:
		define(func())
			// func() - factory for module, must return some object that will be
			// available in require([moduleName], function(moduleObj) {...})
		define(depends[], func(depen1, ...))
		define(name, depends[], func(depen1, ...))

		define(func(require, exports, module))  // for definition in CommonJS style

		// Ex:
			define(["some_module", "../libs/some_lib"], function(smodule, slib) {
				// ...
				return {
					// ...
				};
			});

================================================================================
Bower ==========================================================================
================================================================================

	// Bower - package manager for client JS.
	// Repositories are searchable at https://bower.io/search

	// Init
		npm install -g bower
		cd project_dir/
		bower init  // create bower.json in current dir

	// Install module
		bower install <module_name>  // install (put to bower_components/)
		bower install --save <module_name>  // install and save in bower.json

	// Uninstall
		bower uninstall <module_name>
		bower uninstall --save <module_name>

	// List
		bower list  // list installed modules

	// Restore
		bower install  // install all modules listed in bower.json

	// Update
		bower update <module_name>

	// Publish
		git tag "vx.x.x"
		git push origin --tags

		bower register <my_module_name> git:github.com/...git
