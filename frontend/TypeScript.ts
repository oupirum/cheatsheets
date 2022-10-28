
// TypeScript - typed superset of JS.
// TypeScript is compatible with JS, so it can be seamlessly added to JS
// project.
// Extension - .ts

================================================================================
Install & run ================================================================={

	$ npm install -g typescript typings
	$ npm link typescript typings

	$ tsc --init  // init ts project and create tsconfig.json in cwd

	$ tsc  // compile using input and options from tsconfig.json in cwd
	$ tsc --p projectPath  // compile using tsconfig.json in specified
		// project dir
	$ tsc [options] tsFile...  // compile using specified input and options
		// options are same as tsconfig.json[compilerOptions]


	$ typings install  // install declaration files specified in typings.json
}
================================================================================
Config ========================================================================{

	// /tsconfig.json:
	{
		"compilerOptions": {
			"rootDirs": path[],  // input
			"outFile": path,  // output (concat to single file)
			"outDir": path,  // output

			"target": "es3|es5|es2015",
			"module": "commonjs|amd|system|umd|es2015",
			"sourceMap": bool,

			"moduleResolution": "node|classic",
			"baseUrl": path,  // for non-relative imports
			"paths": {  // modules mappings (for non-relative)
				"name": path,
				...
			}

			"allowJs": bool,
			"allowUnreachableCode": bool,
			"allowUnusedLabels": bool,
			"noEmit": bool,  // dont produce output
			"noEmitOnError": bool,  // dont compile if there errors
			"noImplicitThis": bool,
			"noImplicitAny": bool,
			"strictNullChecks": bool,  // if true - null and undefined will be
				// only assignable to "void", "any", "null" and
				// "undefined" types
		},
		"files": path[],  // entry points
			// default: all .ts, .d.ts, .tsx (and .js, .jsx if allowJs enabled)
		"include": glob[],
		"exclude": glob[],
			// default: ["node_modules", "bower_components",
			// "jspm_packages"]
	}

	// example:
	{
		"compilerOptions": {
			"target": "es5",
			"module": "commonjs",
			"sourceMap": true,
			"strictNullChecks": true,
			"noImplicitAny": true,
			"noImplicitThis": true,
			"allowJs": true,
			"outDir": "./build"
		},
		"files": [
			"./src/typings/index.d.ts",
			"./src/index.ts"
		]
	}


	// /typings.json:
		// typings - declaration files for popular libraries
	{
		"globalDependencies": {
			"core-js": "registry:dt/core-js#0.0.0+20160725163759",
			"jasmine": "registry:dt/jasmine#2.2.0+20160621224255",
			"node": "registry:dt/node#6.0.0+20160909174046"
		}
	}

	$ typings install
		// will download specified declaration files to /typings directory
}
================================================================================
Webpack ======================================================================={

	$ npm install --save-dev ts-loader source-map-loader

	// /webpack.config.js:
		module: {
			loaders: [{
				test: /\.tsx?$/,
				loader: "ts"
					// use ts?transpileOnly=true to speed up,
					// but it disables type checking
			}]
		},
		resolve: {
			extensions: ["", ".js", ".ts", ".tsx"]
		}

	// /tsconfig.json:
	{
		"compilerOptions": {
			"target": "es2015",
			"sourceMap": true,
			"strictNullChecks": true,
			"noImplicitAny": true,
			"noImplicitThis": true,
			"allowJs": true
		}
	}
}
================================================================================
Declaration files ============================================================={

	// Uses to declare types for existing js code and libraries.
	// It's defines types for compiler, but not implementations,
	// and not guarantees existance of target js libraries at runtime.
	// Extension - .d.ts

	declare someTypeDeclaration;
	export someTypeDeclaration;

	// Ex:
		interface Some {
			name: string;
		}
		declare function newSome(name: string): Some;

		declare namespace someLib {
			let attr: string;
			function method(p: string): void;
			function method(): string;  // overloading
		}

		export let n: number;

	// Module that uses js library must declare dependency on .d.ts file:
		/// <reference path="./some_decl.d.ts"/>
	// or .d.ts files can be manually included in tsconfig.json

	// Global and module libs declares in different ways:
	// Ex:
		// Global
			// src/some.js:
				window.some = {
					name: "some"
				};

			// src/typings/some.d.ts:
				declare namespace some {
					let name: string;
				}

			// src/main.js:
				/// <reference path="./typings/some.d.ts"/>
				import "./some.js";
				let name: string = some.name;

		// Module
			// /node_modules/some/mylib.js:
				var some = {
					name: "some"
				};
				export {some};

			// src/typings/some.d.ts:
				export namespace some {
					let name: string;
				}

			// src/main.js:
				/// <reference path="./typings/some.d.ts"/>
				import {some} from "some";
				let name: string = some.name;

		// ES6 module augmentation
			declare module "mylib" {
				export function foo(): string;
				// if you're using Babel and referencing a CommonJS module
				// or if the ES6 module just re-exports everything as the default
				import * as MyLib from "mylib";
				export default MyLib;
			}
}
================================================================================
Modules ======================================================================={

	// Export

		export function f() {
		};

		export {one, two as alias};

		export default three;

	// Import

		import * as alias from "./module/file";
		alias.f();

		import {f, f2 as f3} "./module/file";
		f();

		import three from "./module/file";

	// Namespace
		// internal module

		namespace Name {
			export class Cls {
				// ...
			}
		}

		var obj = new Name.Cls();

		// One namespace can be defined in several places.
		// It will be merged and result namespace will contain all members.
		// Use reference directive for namespaces defined in different files
		// that will be concat on build.
		// Ex:
			// one.ts:
				namespace Space {
					export class One {
						constructor() {
						}
					}
				}

			// two.ts:
				/// <reference path="./one.ts"/>
				namespace Space {
					export class Two {
						getOne(): One {
							return new One();
						}
					}
				}

			// three.ts:
				/// <reference path="./one.ts"/>
				/// <reference path="./two.ts"/>
				let one = new Space.Two().getOne();
}
================================================================================
Directives ===================================================================={

	// they are must be placed at top of file

	/// <reference path="somePath"/>  // declare dependency on file

	/// <reference types="someLib"/>  // dependency on global lib

	/// <amd-module name="someName"/>  // explicitly specify name for
		// resulting amd module

	/// <reference no-default-lib="true"/>  // instructs the compiler
		// not to include the default library in the compilation
}
================================================================================
Types ========================================================================={

	// Basic types

		any
		{}  // Object
		null
		undefined
		boolean
		number  // floating point number. e.g: 1, 0.1, 0xf00d, 0b1010, 0o744
		string

	// Union type

		type1|type2

		// Ex:
			var u: string|null = null;  // both string and null assignable
			u = "str";

	// Intersection

		type1 & type2

		// Ex:
			var i: { a: string } & { b: string };  // combine into one type
			i = { a: 'a', b: 'b' };

	// Type assertion

		varbl as type

		// Ex:
			var str: Object = "str";
			var l = (str as string).length;

		// Type compatibility in TypeScript is based on structural subtyping (
		// duck typing)

	// Enum

		enum Name {Item1, Item2, ...};

		// by default numbering from 0
		// instead numbers can be specified directly:
		enum Name {Item1 = N, Item2 = M, ...};

		// Ex:
			enum Ch {A, B, C};
			var a: Ch = Ch.A;

		// get item name by number:
		var chName = Ch[2];  // "B"

	// Array

		type[]
		Array<type>

		// Ex:
			var ns: number[] = [1, 2];
			var ns: Array<number> = [1, 2];

	// Tuple
		// fixed length array of elems of different types

		[type1, type2, ...]

		// Ex:
			var tpl: [string, string, number] = ["one", "two", 3];

	// Object

		{key: type, keyOpt?: type, ...}
			// "propName?" - optional property

		// Ex:
			var obj: {n: number, name: string} = {13, "some"};
			var obj2: {n: number, name?: string} = {13};

	// Indexable type
		// describes types of items and types of theirs indexes

		[index: type1]: type2

		// Ex:
			interface Arr {
				[index: number]: string;
			}
			let arr: Arr = ["one", "two"];

	// Function type

		(param1:type1, ...)=> retType
}
================================================================================
Variables ====================================================================={

	var a: string = "str";  // function-scoped, with hoisting

	let a: string = "str";  // block-scoped, without hoisting

	const a: string = "str"  // same as let, but readonly

	let a = "str";  // using type inference

	// Destructuring

		// Array:
			// by order
			let [one, two] = ['a', 'b'];
			let [one, two=defVal] = ['a'];  // with default value
			let [, , three] = ['a', 'b', 'c'];  // skip
				// three - 'c'
			let [one, ...rest] = ['a', 'b', 'c'];  // spread
				// rest - ['b', 'c']

		// Object:
			// by name
			let {a, b} = {a: 'a', b: 'b'};
			let {a, b=defVal} = {a: 'a'};  // with default value
			let {a: one, b: two} = {a: 'a', b: 'b'};  // names replacing
				// one - 'a', two - 'b'
}
================================================================================
Function ======================================================================{

	// Define
		function f(): void {  // function declaration
		}

		function f() {  // return type will be inferred
		}

		var f = (): void=> {  // function expression
		};

	// Optional params
		// param marked by "?" will be optional
		// Ex:
			function f(p1: number, p2?: number) {}
			f(1, 2);
			f(1);  // p2 - undefined

	// Defult-initialized params
		// Ex:
			function f(p1: number, p2 = 13) {}
			f(1, 2);
			f(1);  // p2 - 13
			f(1, undefined);  // p2 - 13

	// Spread
		// list of optional parameters
		// Ex:
			function f(p1: number, ...rest: number[]) {}
			f(1); // p2 - []
			f(1, 2, 3);  // p2 - [2, 3]

	// Desctructuring can be also used for function parameters
		// Ex:
			function f({k1: p1, k2: p2}) {
			}
			f({k1: "v1", k2: "v2"});

			function f({k1: p1, k2: p2="def"}: {k1: string, k2?: string}) {
			}
			f({k1: "v1"});
				// p1 - "v1", p2 - "def"

			function f({k1: p1, k2: p2} = {k1: "def", k2: "def"}) {
			}
			f();
				// p1 - "", p2 - ""

	// Overloading
		// define list of available function types (params and returning value)
		// Ex:
			function f4(p: number): string;
			function f4(p: string): void;
			function f4(p) {
				// so number and string argument both allowed
				if (typeof p == "number") {
					console.log(p, "number");
					return "some";
				} else if (typeof p == "string") {
					console.log(p, "string");
				}
			}
}
================================================================================
Interface ====================================================================={

	interface Name {  // structure, class
		prop: type;
		optProp?: type;  // optional
		readonly prop: type;
		[index: type1]: type2;  // indexable type - describes types of items
			// and types of theirs indexes
		method(): retType;
	}

	interface Name {  // function type
		(param1: type1, ...): retType;
	}

	// Ex:
		interface Person {
			name: string;
			age?: number;
			move(): void;
		}
		// For implementing uses duck typing
		let p: Person = {
			name: "some",
			move: function() {}
		};

		interface N {
			n: number;
		}
		let n: N = {n: 13, m: 12} as N;

		interface Arr {
			[index: number]: string;
		}
		let arr: Arr = ["one", "two"];

	// For classes available "implements" keyword, for explicit implementation

		class Name implements InterfName {
			// ...
		}
}
================================================================================
Class ========================================================================={

	class Point {
		static empty: Point = new Point(-1, -1);

		private title: string = "some";
		x: number;

		constructor(x: number, public y: number = 0) {
			this.x = x;
		}

		copy(): Point {
			return new Point(this.x, this.y);
		}

		toString() {
			return this.x + "x" + this.y;
		}
	}

	var p = new Point(1, 1);
	var pe = Point.empty;
	var p2: Point = p.copy();

	// Modifiers

		public  // default
		protected
		private
		readonly

	// Parameter property
		// Instead of manually defining class fields, can be used parameter
		// property - constructor parameter prefixed by modifier.

		// Ex:
			class Cls {
				constructor(private a: number, public b: number) {
				}
				setA(a) {
					this.a = a;
				}
			}
			let obj = new Cls(1, 2);
			obj.setA(3);
			let b = obj.b;

	// Accessors

		class Cls {
			private _field: string;

			set field(field: string) {
				this._field = field;
			}
			get field() {
				return this._field;
			}
		}

		let obj = new Cls();
		obj.field = "f";
		let f = obj.field;

	// Inheritance

		class Point3D extends Point {

			constructor(x: number, y: number, public z: number = 0) {
				super(x, y);
			}

			copy(): Point3D {
				return new Point3D(this.x, this.y, this.z);
			}

			toString() {
				return this.x + "x" + this.y + "x" + this.z;
			}
		}

		var p3d = new Point3D(1, 2);

	// Abstract
		// Abstract class can not be instantiated, only inherited

		abstract class Cls {
			constructor() {
				// ...
			}

			abstract method(): void;  // methods also can be abstract
				// abstract method has not body
		}
}
================================================================================
Generic ======================================================================={

	interface Pair<T> {
		item1: T;
		item2: T;
	}

	class Tuple<T1, T2> {
		constructor(public item1: T1, public item2: T2) {
		}
	}

	var pairToTuple = function<T>(p: Pair<T>) {
		return new Tuple(p.item1, p.item2);
	};

	var tuple = pairToTuple({item1: "hello", item2: "world"});
}
