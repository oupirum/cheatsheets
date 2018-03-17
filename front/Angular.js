
// CDN:
	//ajax.googleapis.com/ajax/libs/angularjs/1.4.12/angular.min.js
	// modules:
		//ajax.googleapis.com/ajax/libs/angularjs/1.4.12/angular-sanitize.min.js
		//ajax.googleapis.com/ajax/libs/angularjs/1.4.12/angular-route.min.js
		//ajax.googleapis.com/ajax/libs/angularjs/1.4.12/angular-animate.min.js

================================================================================
JqLite ========================================================================{
	
	// JqLite embedded into core bundle.
	// All DOM elements references in Angular are wrapped with JqLite.
	
	// Retrieve jqlite object:
		angular.element(element)
		angular.element(document.querySelectorAll(selec))
	
	// JqLite methods:
		bind
		unbind
		children
		parent
		append
		prepend
		remove
		replaceWith
		after
		clone
		next
		addClass
		removeClass
		hasClass
		prop
		attr
		removeAttr
		css
		html
		text
		val
		contents
		data
		removeData
}
================================================================================
Directives ===================================================================={
	
	// Directive - is a marker in DOM to attach specific behavior to
	// the element.
	// Directives can be tag names, attributes, css classes, comments.
	// Optionally with values - strings or Expressions.
	// Built-in Directive names begins with "ng-".
	// Can be prefixed with "data-ng-" for HTML validity.
	
	ng-app  // Defines app wrapper element, that needs for manual
		// bootstrapping
	ng-strict-di  // Enforce array notation DI
	ng-controller  // Defines Controller
	ng-init  // Initialize controller (scope) variables.
		// e.g: "name='John';surname='Constantine';"
	
	ng-model  // Binds data from view to app. Two-way. Uses for forms
	ng-bind   // Binds data from app to HTML view. It same as Expression
	ng-bind-html  // Bind HTML contents. It works only with
		// $sce.trustAsHtml(content) or ngSanitize module. To bind html that
		// contains plain css use $sce.trustAsHtml
	ng-non-bindable  // Disable binding for this element
	ng-view    // To include template to layout by the Route
	ng-repeat  // Repeats DOM element. e.g: "name in obj". To repeat
		// even duplicated values use "name in obj track by $index".
		// Creates child scope. Identifiers available: $index,
		// $first, $last, $middle.
	ng-if    // Remove element if value is false and recreate otherwise
	ng-switch/-when/-default  // Switches between nested elements that has
		// ng-switch-when|ng-switch-default by value of ng-switch
	ng-include  // Include html layout
	
	ng-class  // Sets element's class attribute
	ng-style  // Sets CSS styles. Value - object,
		// e.g.: {"background-color": "#333"}
	ng-href    // e.g: ng-href="{{domain}}/path/"
	ng-src     // e.g: ng-src="{{someSrc}}"
	ng-value   // Sets value for <option> or input[radio]
	ng-options   // Generates <options> for <select>,
		// e.g.: ="item.val as item.name for item in itemsList"
	ng-show    // Sets visibility (CSS "display" property)
		// To hide elem while module not yet bootstrapped need to use:
			ng-cloak ng-show="someValue"
			// and add CSS:
			[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak],
					.ng-cloak, .x-ng-cloak {
				display: none !important;
			}
	
	ng-disabled  // Sets the value of "disabled" form's attr
	ng-required
	ng-selected
	ng-checked
	ng-open
	ng-readonly
	ng-minlength
	ng-maxlength
	ng-pattern
	
	// Events:
		ng-click  // e.g: ng-click="func()" or ng-click="data = data + 1"
		ng-change
		ng-blur
		ng-focus
		ng-dblclick
		ng-keydown(-up, -press)
		ng-mousedown(-up, -enter, -leave, -move, -over)
	
	// To stop propagation use $event.stopPropagation():
		<div ng-click="callb(); $event.stopPropagation()">...
}
================================================================================
Expression ===================================================================={
	
	// Binds data from AJS app to HTML view. Same as ng-bind.
	// Expression evaluates in Scope context and could not access the
	// global context.
	// No control flow statements available in Expression, except ternar
	// operator.
	// In expression are available identifiers:
		// this - scope object
		// $locals - locals object passed to $eval()
	
	// Ex:
		<div ng-app="" ng-init="str='123';">
			<div>data: {{str}}</div>
		</div>
		// content will be "data: 123"
	
	// Expression also can be composite:
		Name length: {{user.name.length}}
		Fullname: {{user.name + " " + user.surname}}
		Country: {{user.country || 'Dont know'}}
	
	// To use js functions in expressions need to define it on $scope:
		app.controller("name", function($scope) {
			$scope.parseInt = parseInt;
		});
		
		<div> number: {{parseInt(n / m)}}</div>
}
================================================================================
Module ========================================================================{
	
	// Module defines application (one page can contain several apps).
	// All Controllers, Directives, etc. should belong to a Module.
	
	// Instantiate app:
		angular.module(name, modules)
			// name - app name, same as ng-app (string)
			// modules - list of dependent modules (array of names)
	
	// To get already instantiated app need to invoke without second argument:
		angular.module(name)
	
	// Ex:
		angular.
				module("myApp", ["ngSanitize", "ngRoute"]);
}
================================================================================
Bootstrap ====================================================================={
	
	// Automatic bootstrapping:
		// init module:
			angular.
					module("myApp", [...]).
					controller(...
		// set ng-app directive on root DOM node:
			<body ng-app="myApp">
				...
	
	// Instead module can be bootstrapped manually:
		// init module:
			var appName = "myApp";
			angular.
					module(appName, [...]).
					controller(...
		// then bootstrap:
			angular.bootstrap(element, [appName]);
			// or:
			angular.element(document).ready(function() {
				angular.bootstrap(document, [appName]);
			});
}
================================================================================
Controller ===================================================================={
	
	// Controller has own Scope.
	// Controller is a constructor for Controller's Scope.
	// Controller constructor executes after bootstrap.
	// One app (Module) can contain several Controllers.
	
	app.controller(name, [dep1, dep2, ..., contructor])
		// constructor - function
		// dep1, dep2 - list of names (strings) of services, values or
			// constants, that will be injected into constructor as args
			// It can be built-in services, e.g. "$http"
			// It is array notation for declaring dependencies (dependency
			// injection)
			// Dependency injection uses also in config, factory, etc.
	
	// ControllerAs syntax:
		// Scope can be aliased using "as alias" syntax:
			ng-controller="someCtrl as ctrl"
		// Scope must be setuped via this:
			app.controller("someCtrl", function() {
				this.prop = "Prop";
			})
		// Then in template scope will be available via alias:
			{{ctrl.prop}}
	
	// Ex:
		app.controller("name", ["$scope", "$element", "$window",
				function($scope, $elem, $win) {
					$scope.field = "set some default value";
					$elem.show();
					// $elem and $win are jqLite objects
				}]);
}
================================================================================
Scope ========================================================================={
	
	// Each Controller has own Scope that contains all controller members,
	// that was defined in constructor or on root scope.
	
	// To get Scope outside the Controller:
		var scope = angular.element(controllerDOMElement).scope();
	
	// Inject controller's scope:
		app.controller("name", ["$scope", function($scope) {
			// init controller's scope...
		}]);
	
	// Any async change of scope (not inside digest cycle) need to apply:
		$scope.$apply();
	
	// Root scope
		// All controllers' scopes extends $rootScope.
		// $rootScope - single per module.
		// To manually inherit $rootScope use $new() method.
		
		// Setup:
			app.run(["$rootScope", function($rootScope) {
				$rootScope.someField = "someValue";
				// ...
			}]);
		
		// Inject:
			app.controller("name", ["$scope", "$rootScope",
					function($scope, $rootScope) {
						// ...
					}]);
	
	// Properties
		$id : int
		$parent : scope
		$root : scope
	
	// Methods
		$new() : childScope  // manually inherit scope
		$watch(expr, func(newVal, oldVal, scope) [, useEquality]) : remove()
			// register watcher for expr changes.
			// Expression evaluates on each digest cycle.
		$watchCollection(expr, func(newColl, oldColl, scope)) : remove()
			// watch on array or object
		$digest()  // trigger all watchers on current and child scopes
		$destroy()  // detach this scope from parent
		$eval(expr [, locals]) : any  // evaluate expression in context of
			// this scope
			// locals - object like {var1: val1, ...} to override variables
		$apply([expr])  // eval expr and trigger digest cycle on rootscope
		$applyAsync([expr])  // scheduled $apply
			// useful for calling from currently running digest cycle
	
	// Events
		$scope.$emit(eventname, data...)  // broadcast event for this and
			// parent scopes
		$scope.$broadcast(eventname, data...)  // this and child scopes
		$scope.$on(eventname, func(event, data...)) : remove()  // add listener
			// returns function that need to call to destroy listener
		
		// $rootScope listeners must be removed manually on "$destroy" event:
			var remove = $rootScope.$on("some-event", function(e, data) {
				// ...
			});
			$scope.$on("$destroy", remove);
}
================================================================================
Service, Provider ============================================================={
	
	// To organize and share code across app.
	// Constructs once (singleton).
	
	// Define service:
		app.service(newServiceName, [dep1, ..., constructor])
	
	// Ex:
		app.service("someService", function() {
			// ...
			this.method = function() {
				// ...
			};
		});
		
		// Controller with dependency:
		app.controller("someCtrl", ["$scope", "someService",
				function($scope, sService) {
					// sService - instance of service
					sService.method();
				}]);
	
	// Instead of service() method can be used factory(), provider(),
	// value() or constant().
	
	provider(newServiceName, [dependService1, ..., constructor])
		// Result: (new ProviderFunction()).$get(). The constructor
		// function is instantiated and $get method is called.
	
	factory(newServiceName, [dependService1, ..., constructor])
		// Result: factoryFunction(). Value that is returned by
		// invoking the constructor function.
	
	service(newServiceName, [dependService1, ..., constructor])
		// Result: new ServiceFunction(). Instance of the constructor
		// function.
	
	value(name, object)
		// object - service instance
	
	constant(name, value)
		// value - any constant value
	
	// factory(), service(), value(), constant()  - syntactic sugar
	// on top of provider().
	// Provider can be used for setting up appropriate service.
	// providerName = serviceName + "Provider".
	// Ex:
		app.provider("game", [function() {
			var type;
			return {
				setType: function(value) {
					type = value;
				},
				$get: function() {
					return {
						title: type + " Tournament"
					};
				}
			};
		}]);
		
		app.config(["gameProvider", function(gameProvider) {
			gameProvider.setType("Unreal");
		}]);
		
		app.controller("ctrl", ["game", function(game) {
			var gn = game.title;
		}]);
	
	// Setting up service
		app.config([serviceNameProvider, ..., constructor])
			// setup provider
			// get executed during the configuration phase
		app.run([serviceName, ..., constructor])
			// setup service
			// get executed after the injector is created and used to
			// kickstart the application
	
	// Built-in services
		$http
		$timeout  // same as window.setTimeout
		$interval  // same as window.setInterval
		$window  // window
		$document  // window.document
		$log  // window.console
		$sce  // strict contextual escaping
			.trustAsHtml(value)
			.trustAsUrl(value)
			.trustAsJs(value)
		$location
		$q  // deferred objects
	
	// $http service
		// Sending AJAX requests.
		
		$http(config) : Future
		
		// Shortcut methods
			get(url [, config]) : Future
			head(url [, config]) : Future
			delete(url [, config]) : Future
			put(url, data [, config]) : Future
			post(url, data [, config]) : Future
			patch(url, data [, config]) : Future
			jsonp(url [, config]) : Future
		
		// Future methods
			then(onsuccess(response), onerror(response)) : Future
			catch(onerror(response)) : Future
			finally(func()) : Future
		
		// config object
			method : string
			params : object  // GET params
			data : string|object
			headers : object
			cache : boolean
			timeout : number
			responseType : string
				// "text"|"arraybuffer"|"blob|"document"|"json"
		
		// response object
			data : string|object  // response
			status : number
			statusText : string
			headers : function  // getter
			config : object  // source config
	
	// $location service
		// To react to a change in the current url or change the current
		// url in the browser.
		// Add <base href="/my-base/"> to <head> for resolving relative urls.
		
		// $locationProvider
			html5Mode(config)
				// config - object:
				{
					enabled: bool,
						// false - hashbang mode (default)
						// true - html5 mode
					requireBase: bool,  // only html5 mode
					rewriteLinks: bool  // only html5 mode
				}
			hashPrefix(string)  // only hashbang mode
				// default - "!"
		
		// $location
			path(string) : this
			path() : string
			search(map) : this
			search() : map
			hash(string) : this
			hash() : string
			absUrl() : string
			url() : string
			replace()  // replace last history state
	
	// $q service
		// Deferred object.
		// Run functions asynchronously and use their return values when done.
		// Promise-like API.
		
		$q.defer() : Deferred
		
		$q(constr(resolve, reject)) : Promise
		$q.resolve(any) : Promise
		$q.reject(any) : Promise
		$q.all(promise[]) : Promise
		$q.race(promise[]) : Promise
		
		// Deferred
			promise : Promise
			
			resolve(any)
			reject(any)
			notify(any)
		
		// Promise
			then(onResolved(res), onRejected(err), onNotified(mess)) : Promise
			catch(onRejected(err)) : Promise
			finally(onDone(res|err), onNotified(mess)) : Promise
}
================================================================================
Custom Directive =============================================================={
	
	app.directive(name, [dep1, ..., constructor])
		// name - Directive name in camelCase
			// Note that in html uses spinal-case. E.g: "myDir" in definition
			// but "my-dir" in html
		// constructor - function that returns an object that defines behavior:
		{
			scope: bool|object,
				// false - to use parent Scope
				// true - inherit parent
				// object - create isolate Scope:
				{
					prop1: "=attrName",
						// tells $compile to bind value of "attr-name" attribute
						// to this property
						// "=name" - two-way expression binding
						// "=?name" - two-way, optional
						// "<name" - one-way expression binding
						// "@name" - one-way string binding (view to scope)
						// "&name" - one-way expression binding, evaluation
							// must be triggered manually (in context of
							// original scope with locals).
							// Useful for callbacks.
							// Result will be function like prop1(locals)
							// e.g:
								scope: {
									'close': '&onClose'
								},
								<button on-close="someCallb(arg)" ...
								// execute:
								$scope.close({arg: "val"});
				}
			bindToController: bool|object,
				// bind scope to controller
			transclude: bool,
				// true - transclude parent scope to contents of this directive,
				// wrap arbitrary content.
				// Use ng-transclude to mark insertion point for transcluded
				// html.
			restrict: string,
				// directive type:
					// "E" - to use as element tag
					// "A" - attribute
					// "C" - css class
					// "M" - comment
			template: string,
				// html contents for this node
			templateUrl: string|func(element, attrs),
				// load contents from URI or return from function
			link: func(scope, element, attrs, ctrl),
				// function to modify DOM,
				// setting up listeners and watchers
			controller: string|[dep, ..., func(dep, ...)],
				// uses to share code across directives.
				// Define public methods on "this" - they are will be available
				// on NgModelController (use "^^directiveName" to require it).
			controllerAs: string,
			require: string|string[],
				// "^^directiveName" - requires directive on parent node
				// "^directiveName" - requires directive on same or parent
				// "directiveName" - requires directive on same node
				// "?directiveName" - optional
				// Will be available as ctrl|ctrl[] argument (NgModelController)
				// of link function.
		}
	
	// Ex:
		// "onload" event:
		app.directive("ngcLoad", ["$parse", function($parse) {
			return {
				scope: false,
				restrict: "A",
				link: function(scope, elem, attrs) {
					var handler = $parse(attrs["ngcLoad"]);
					elem.bind("load", function(ev) {
						scope.$apply(function() {
							handler(scope, {$event: ev, $otherArg: "123"});
						});
					});
				}
			};
		}]);
		
		<img ngc-load="func($event)" ...
	
	// Cleanup
		// use element.on("$destroy", ...) for cleaning up when direcive is
		// removed
}
================================================================================
Component ====================================================================={
	
	// Component is a special kind of Directive.
	// Uses "E" (element) restriction.
	// Scope is always isolate.
	
	app.component(name, config)
		// config - object:
		{
			bindings: object,  // same as directive's scope
			transclude: bool,
			template: string,
			templateUrl: string|func(element, attrs),
			controller: [dep, ..., func(dep, ...)],
				// default - func()
			controllerAs: string,
				// alias to publish controller instance to the $scope
				// default - "$ctrl"
			require: string|string[]|object,
		}
}
================================================================================
Forms ========================================================================={
	
	// Two way data-binding:
		ng-model="expr"
			// input, select, textarea
	
	// NgFormController, NgModelController
		// Any form and their controls accessible on scope by their
		// "name" attributes:
		$scope[formName] : NgFormController
		$scope[formName][ctrlName] : NgModelController
			// where formName - "name" attr of form element
			// ctrlName - "name" attr of control element
	
	// Validation
		// NgFormController
			$pristine : bool
			$dirty : bool
			$valid : bool
			$invalid : bool
			$submitted : bool
			$pending : bool
			$error : object  // controls with failed validators
				// key - validator token, value - array of controls
		
		// NgModelController
			$untouched : bool
			$touched : bool
			$pristine : bool
			$dirty : bool
			$valid : bool
			$invalid : bool
			$pending : object  // pending validators
				// key - validator token
			$error : object  // failed validators
				// key - validator token
			
			$validators : object
			$asyncValidators : object
			$setValidity(token, isValid)
			
			$name : string
			$viewValue : any
			$modelValue : any
			$isEmpty(value) : bool
		
		// Built-in validator tokens
			email, max, min, maxlength, minlength, number, pattern, required,
			url, date, datetimelocal, time, week, month
		
		// Also each control has css classes appropriate to its current state:
			ng-untouched
			ng-touched
			ng-pristine
			ng-dirty
			ng-valid
			ng-invalid
	
	// Custom validation
		// With custom directive can be added custom validation function
		// to $validators object on NgModelController.
		// Validation function - (modelValue, viewValue)=> bool.
		// It will be invoked on each model change and result will be stored
		// as ngModelCtrl[validatorToken].
		// If result is false - also as ngModelCtrl.$error[validatorToken].
		
		// Ex:
			app.direcive("validateSome", [function() {
				return {
					require: "ngModel",
					link: function(scope, elem, attrs, ctrl) {
						ctrl.$validators.some = function(modelVal, viewVal) {
							if (ctrl.$isEmpty(modelVal)) {
								return true;
							}
							return modelVal === "some";
						};
					}
				};
			}]);
	
	// Ex:
		<form name="nForm"
			ng-init="submitted = false"
			ng-hide="submitted"
			ng-submit="update(hero)">
			<div class="form-group">
				<label for="power">Hero Power</label>
				<select class="form-control" required
					ng-model="hero.power" name="power">
					<option ng-repeat="p in powers" ng-value="p">{{p}}</option>
				</select>
			</div>
			<div class="form-group">
				<input type="text" class="form-control" required
					ng-model="hero.name" name="name"/>
				<div ng-hide="nForm.name.$valid || nForm.name.$pristine"
					class="alert alert-danger">
					Name is required
				</div>
			</div>
			<button type="submit" class="btn btn-default"
				ng-disabled="nForm.$invalid"
				ng-click="submitted = true">Submit</button>
		</form>
		<button class="btn btn-default"
			ng-show="submitted"
			ng-click="submitted = false">Show</button>
}
================================================================================
Filter ========================================================================{
	
	// Filters can be used to transform data.
	// Filter can be added to Expression using pipe char "|".
	
	filtername:arg1:arg2:...
	
	// Built-in filters
		filter:someValue
		orderBy:fieldName
		lowercase
		uppercase
		currency:symbol:fractionSize
		number:fractionSize
		date:format
		json:indentSize
		limitTo:limit:offset
		
		// Ex:
			<div ng-repeat="obj in list | orderBy:'name'">{{obj.name}}</div>
			<input type="text" ng-bind="input | uppercase"/>
	
	// Define custom Filter:
		app.filter(filtername, [dep1, ..., constructor)])
			// dep1, ... - list of dependencies to inject into constructor
			// constructor - function that returns func(input, arg1, ...)
		
		// Ex:
			filter("orderObjectBy", [function() {
				return function(obj, field, direction) {
					var reverse = typeof(direction) === "string" ?
							direction.toLowerCase() === "desc" : false;
					var filtered = [];
					angular.forEach(obj, function(item) {
						filtered.push(item);
					});
					filtered.sort(function (a, b) {
						if (!reverse) {
							return (a[field] < b[field] ? -1 : 1);
						} else {
							return (a[field] < b[field] ? 1 : -1);
						}
					});
					return filtered;
				};
			}]);
	
	// Filter function can be injected into controller, service or directive
	// using <filterName>Filter name, e.g. "currencyFilter" or "limitToFilter".
}
================================================================================
Route ("ngRoute" module) ======================================================{
	
	// $routeProvider, $route service.
	// For deep-linking Urls to controllers and views.
	
	// Setup router:
		app.config(["$routeProvider", constructor])
			// In the constructor need to setup route definitions
	
	// $routeProvider
		when(path, params) : this  // Add new route definition
			// path - route path mathed against $location.path (string)
				// Can contain named groups like ":name". All chars up to
				// the next slash stores into $routeParams
			// params - mapping information - object:
			{
				template: string,  // html template which should be loaded
					// into ng-view
				templateUrl: string,
				controller: string|func,
				controllerAs : string,
				resolve : object,  // map of dependencies to be
					// injected into controller func
				redirectTo: string,  // to update $location.path and
					// trigger route redirection
			}
		otherwise(params) : this  // Route definition for when no
			// one matched
	
	// To render template need to use ng-view Directive
		// current template will be loaded into all elements that has ng-view
		<div ng-view><!-- here template will be rendered --></div>
	
	// To get $routeParams in Controller need to inject dependency
	
	// $route
		current : object  // current route params
		routes : object  // all route params
		
		reload()
		updateParams(newParams)
	
	// Ex:
		// ...
		<div ng-view ></div>
		// ...
		
		// Init router:
		app.config(["$routeProvider", function($routeProvider) {
				$routeProvider.when("/dir1/:param", {
					templateUrl: "fragment1.html",
					controller: "fragmentOne"
				});
				// ...
			}]);
		
		// Inject:
		app.controller("fragmentOne", ["$scope", "$route", "$routeParams",
				function($scope, $route, $routeParams) {
					// $route.current - contains current route params
					// $route.routes - list of all definitions
				}]);
}
================================================================================
Animation ("ngAnimate" module) ================================================{
	
	// To define JS-animations.
	
	app.animation(".classname", constructor)
		// constructor - function that returns object contains methods:
			// enter, leave, move, beforeAddClass, beforeRemoveClass,
			// addClass, removeClass
		// In this methods need to define animation
	
	// Ex:
		app.animation(".ngc-zoom", function() {
			return {
				enter: function(element, done) {},
				leave: function(element, done) {},
				move: function(element, done) {},
				beforeAddClass: function(element, classname, done) {
					$(element).animate({
						"width": "+=100px",
						"height": "+=100px"
					}, 400, "linear", done);
				},
				beforeRemoveClass: function(element, classname, done) {
					$(element).animate({
						"width": "-=100px",
						"height": "-=100px"
					}, 400, "linear", done);
				},
				addClass: function(element, classname, done) {},
				removeClass: function(element, classname, done) {}
			};
		});
		
		// Now on adding ngc-zoom class to any element width & height will be
		// smoothly changed
}
================================================================================
Unit testing =================================================================={
	
	// Setup:
		// uses angular-mocks.js
		$ npm install --save-dev angular-mocks \
			karma-ng-html2js-preprocessor
		
		// /karma.conf.js:
			frameworks: ['jasmine', 'sinon'],
			files: [
				'app/lib/angular.min.js',
				'node_modules/angular-mocks/angular-mocks.js',
				
				'app/tests/*.spec.js'
			],
			preprocessors: {
				'**/*.html': ['ng-html2js']
			}
	
	module(moduleName [, func($provide)])  // instantiate app
	
	inject(func(provider1, ...))
		// providers - any custom service or builtin ($injector, $controller,
		// $filter, $compile, $httpBackend, etc)
	
	// $provide
		constant(name, val)  // provide fake constant
		value(name, obj)  // provide value mock
		service(name, constructor)  // provide service mock
		factory(name, func)
		// etc
	
	$injector.get(serviceName) : service
	$controller(name, depsMap) : controller
	$filter(name, depsMap) : filter
	$compile(html) : linkFunc
	
	// $httpBackend
		when(method, url|regex [, data] [, headers] [, keys]) : handler
		whenGET(url|regex [, headers] [, keys]) : handler
		whenHEAD(url|regex [, headers] [, keys]) : handler
		whenDELETE(url|regex [, headers] [, keys]) : handler
		whenPUT(url|regex [, data] [, headers] [, keys]) : handler
		whenPOST(url|regex [, data] [, headers] [, keys]) : handler
		whenPATCH(url|regex [, data] [, headers] [, keys]) : handler
		
		flush()  // flush responses when there pending requests
		
		// handler
			respond(any) : this  // set response for this handler
	
	// Ex:
		describe("some suite", function() {
			var OtherService;
			
			beforeEach(function() {
				module("someApp", function($provide) {
					$provide.value("SomeService", someServiceMock);
				});
				
				inject(function($injector) {
					OtherService = $injector.get("OtherService");
				});
			});
			
			it("requests", function(done) {
				inject(function($rootScope, $controller, $httpBackend) {
					var $scope = $rootScope.$new();
					var myController = $controller("MyController", {
						$scope: $scope
					});
					
					$scope.setVal(someVal);
					expect($scope.prop).toBe(someVal);
					
					$httpBackend.
							when("GET", /somepath/).
							respond(someResult);
					$httpBackend.
							when("GET", "http://example.com?a=1").
							respond(500, errorMess);
					
					$scope.sendReqToSomePath(function(result) {
						expect(result).toBe(someExpectedResult);
						done();
					});
					$httpBackend.flush();
				});
			});
			
			it("directive", inject(function($rootScope, $compile) {
				var $scope = $rootScope.$new();
				var elem = $compile("<some-directive></some-directive>")($scope);
				$scope.$digest();
				expect(elem.html()).toContain("yohoho");
				// var isoScope = elem.isolateScope();
			});
			
			describe("event handler", function() {
				var $event;
				beforeEach(function() {
					$event = $.Event("dragstart");
					spyOn($event, "preventDefault");
				});
				
				it("should call preventDefault", function() {
					element.triggerHandler($event);
					expect($event.preventDefault).toHaveBeenCalled();
				});
			});
		});
}
================================================================================
E2E testing ==================================================================={
	
	// Protractor - end-to-end test runner (built-in in angular-mocks).
	
	// Setup:
		// /e2e.conf.js:
			exports.config = {
				framework: "jasmine",
				seleniumAddress: "http://localhost:4444/wd/hub",
				specs: ["spec.js"],
				capabilities: {
					browserName: "firefox"
				}
			};
	// Run:
		$ protractor e2e.conf.js
	
	// Manipulate the browser:
		browser.get(url)  // navigate to
		browser.getTitle() : string
	
	// Retrieve DOM:
		element(locator) : ElementFinder
		element.all(locator) : ElementFinder
	
	// Locators:
		by.id(str) : locator
		by.css(str) : locator
		by.model(str) : locator
		by.binding(str) : locator
		by.repeater(str) : locator
	
	// ElementFinder
		click()
		sendKeys(any)
		clear()
		getAttribute(name) : any
		getText() : str
		
		element(locator) : ElementFinder
		all(locator) : ElementArrayFinder
	
	// ElementArrayFinder
		count() : number
		get(index) : ElementFinder
		first() : ElementFinder
		last() : ElementFinder
	
	// Ex:
		describe("TODO list", function() {
			
			beforeEach(function() {
				browser.get("/todo");
			});
			
			it("should filter results", function() {
				element(by.model("user")).sendKeys("jacksparrow");
				element(by.css(":button")).click();
				expect(element.all(by.repeater("task in tasks")).count()).toEqual(10);
				element(by.model("filterText")).sendKeys("groceries");
				expect(element.all(by.repeater("task in tasks")).count()).toEqual(1);
			});
		});
}

================================================================================
Complete example =============================================================={

	// index.html
	<style>
		[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak],
				.ng-cloak, .x-ng-cloak {
			display: none !important;
		}
	</style>

	<div ng-app="app">
		<div ng-controller="contr">
			<hr/>
			<input ng-model="newName" ng-invalid="true"
				ng-change="onChangeNewName()"
				type="text"/>
			<input ng-click="onClickAdd($event)" ng-disabled="addDisabled"
				type="button" value="Add"/>
			<div >New name: {{ newName }}</div>
			List:
			<div ng-repeat="d in list | orderBy:'value'">
				{{ d.n + ": " + d.value }}
			</div>
			<hr/>
			
			<div ng-bind-html="trustHtml(html)"></div>
			<hr/>
		</div>
		
		<a href="#/dir1/ohoho">dir1</a>
		<a href="#/dir2/ohoho">dir2</a>
		<a href="#/dir3/ohoho">dir3</a>
		<div ng-view></div>
		<hr/>
		
		<div ng-controller="controller">
			<div ng-click="clickReq()">click to req</div>
		</div>
	</div>


	// fragment1.html
	<div>
		{{ controller + ", " + fragment }}
	</div>


	var app = angular.module("app", ["ngRoute"]);

	// Main controller:
	app.controller("contr", ["$scope", "$element", "$sce",
			function(scope, elem, sce) {
				console.log("main controller DOM element: ", elem[0]);
				
				scope.html = "<b>B</b>";
				scope.trustHtml = function(content) {
					return sce.trustAsHtml(content);
				};
				
				scope.newName = "John";
				scope.list = [
						{value: "Name", n: 0},
						{value: "Name", n: 1}
					];
				scope.addDisabled = false;
				
				scope.onChangeNewName = function() {
					scope.addDisabled = (scope.newName.length == 0);
				};
				
				scope.onClickAdd = function(event) {
					var n = scope.list.length;
					scope.list[n] = {value: scope.newName, n: n};
				};
			}]);


	// Router:
	app.config(["$routeProvider",
			function(routeProvider) {
				routeProvider.when("/dir1/:param", {
					templateUrl: "fragment1.html",
					controller: "fragmentOne"
				});
				routeProvider.when("/dir2/:otherParam", {
					template: "<div>{{ params }}</div>",
					controller: "fragmentTwo"
				});
				routeProvider.when("/dir3/:param", {
					redirectTo: "/some/"
				});
			}]);

	app.controller("fragmentOne", ["$scope", "$route", "$routeParams",
			function(scope, route, routeParams) {
				console.log("fragmentOne construct");
				scope.fragment = route.current.templateUrl;
				scope.controller = route.current.controller;
				scope.params = routeParams;
			}]);

	app.controller("fragmentTwo", ["$scope", "$routeParams",
			function(scope, routeParams) {
				console.log("fragmentTwo construct");
				scope.params = routeParams;
			}]);


	// Service:
	app.factory("service",
			function() {
				console.log("service construct");
				
				var request = function(url) {
					console.log("request(), ", url);
					// ...
				};
				
				return {
					someData: "data",
					request: request
				};
			});

	app.controller("controller", ["$scope", "service",
			function(scope, service) {
				// service - value returned by service
				console.log("controller construct");
				
				scope.clickReq = function() {
					service.request("http://...");
				};
			}]);

}
