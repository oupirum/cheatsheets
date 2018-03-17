
// version 2.1.0

// Architecture
// ---------------------------------------------------------
// | // module                                             |
// |                                                       |
// | ------------  <--|property binding|    -------------  |
// | | Template |     |    Metadata    |    | Component |  |
// | ------------     |   event binding|--> -------------  |
// -----^---------------------------------------^-----------
//      |                                       |
//      |                                       | injector
//  Directive -- metadata                    Service

================================================================================
Setup ========================================================================={
	
	// /package.json:
	{
		...,
		"scripts": {
			"test": "webpack -w & karma start --auto-watch"
		},
		"dependencies": {
			"@angular/core": "~2.1.0",
			"@angular/common": "~2.1.0",
			"@angular/platform-browser": "~2.1.0",
			"@angular/platform-browser-dynamic": "~2.1.0",
			"@angular/forms": "~2.1.0",
			"@angular/http": "~2.1.0",
			"@angular/router": "~3.1.0",
			"@angular/compiler": "~2.1.0",
			"core-js": "^2.4.1",
			"zone.js": "^0.6.25",
			"reflect-metadata": "^0.1.8",
			"rxjs": "5.0.0-beta.12",
			"bootstrap": "^3.3.7"
		},
		"devDependencies": {
			"typescript": "^2.0.3",
			"typings": "^1.4.0",
			"webpack": "^1.13.2",
			"ts-loader": "^0.9.1",
			"angular2-template-loader": "^0.5.0",
			"clean-webpack-plugin": "^0.1.13",
			"autoprefixer-loader": "^3.2.0",
			"babel-core": "^6.17.0",
			"babel-loader": "^6.2.5",
			"babel-preset-es2015": "^6.16.0",
			"style-loader": "^0.13.1",
			"css-loader": "^0.25.0",
			"extract-text-webpack-plugin": "^1.0.1",
			"file-loader": "^0.9.0",
			"html-loader": "^0.4.4",
			"source-map-loader": "^0.1.5",
			"karma": "^1.3.0",
			"jasmine": "^2.5.2",
			"karma-chrome-launcher": "^2.0.0",
			"karma-coverage": "^1.1.1",
			"karma-jasmine": "^1.0.2",
			"karma-phantomjs-launcher": "^1.0.2",
			"karma-sinon": "^1.0.5",
			"phantomjs-prebuilt": "^2.1.13",
			"sinon": "^1.17.6"
		}
	}
	
	// /tsconfig.json:
	{
		"compilerOptions": {
			"target": "es5",
			"module": "commonjs",
			"sourceMap": true,
			"experimentalDecorators": true,
			"emitDecoratorMetadata": true
		}
	}
	
	// /typings.json:
	{
		"globalDependencies": {
			"core-js": "registry:dt/core-js#0.0.0+20160725163759",
			"jasmine": "registry:dt/jasmine#2.2.0+20160621224255",
			"node": "registry:dt/node#6.0.0+20160909174046"
		}
	}
	
	// /webpack.config.js:
	{
		var webpack = require("webpack");
		var glob = require("glob");
		var CleanWebpackPlugin = require("clean-webpack-plugin");
		
		var src = __dirname + "/app/src";
		var build = __dirname + "/app/build";
		
		module.exports = {
			context: src,
			entry: {
				angular: [
					"core-js/es6",
					"zone.js",
					"reflect-metadata",
					"@angular/core", "@angular/common",
					"@angular/platform-browser", "@angular/platform-browser-dynamic",
					"@angular/forms",
				],
				main: ["./main"],
				tests: glob.sync("./tests/*.spec.ts", {cwd: src}),
			},
			output: {
				path: build,
				filename: "[name].js",
				library: "[name]",
				publicPath: "/build/"
			},
			
			module: {
				loaders: [{
					test: /\.ts$/,
					include: [src],
					loaders: ["ts?transpileOnly=true", "angular2-template"]
				}, {
					test: /\.html$/,
					include: [src],
					loader: "html?minimize=false"
				}, {
					test: /\.(png|gif|jpg|jpeg)$/,
					include: [src],
					loader: "file"
				}, {
					test: /\.css$/,
					include: [src],
					loader: "style!css!autoprefixer"
				}]
			},
			
			plugins: [
				new CleanWebpackPlugin([build + "/*"]),
				new webpack.optimize.CommonsChunkPlugin({
					name: "angular",
					minChunks: Infinity
				}),
			],
			
			resolve: {
				extensions: ["", ".js", ".ts"]
			},
			
			devtool: "source-map"
		};
	}
	// /webpack.config.prod.js:
	{
		var webpack = require("webpack");
		var config = require("./webpack.config");
		
		config.plugins.push(
				new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
		
		module.exports = config;
	}
	
	================================
	// Install
		$ npm install
		$ typings install
	
	================================
	// Bootstrap application
	// To start the application main app module must to be bootstrapped
	// main.ts:
		import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
		import {enableProdMode} from "@angular/core";
		import {AppModule} from "./app.module";
		
		enableProdMode();
		platformBrowserDynamic().bootstrapModule(AppModule);
	
	// app.module.ts:
		import {NgModule} from "@angular/core";
		import {BrowserModule} from "@angular/platform-browser";
		import {AppComponent} from "./app.component";
		
		@NgModule({
			imports: [BrowserModule],
				// BrowserModule is required for browser application
			declarations: [AppComponent],
			bootstrap: [AppComponent]
		})
		export class AppModule {
		}
}
================================================================================
Module ========================================================================{
	
	// Every Angular application has at least one module: the root module.
	// This is the entry point of application.
	// Angular module is a class with an @NgModule decorator.
	// Decorator is an annotation used to attach metadata to module, component
	// or directive class.
	
	@NgModule(metadata)
		// metadata:
		{
			declarations: viewclass[],  // view classes that belong to this module
				// viewclass - component, directive or pipe classname
			exports: viewclass[],  // view classes that will be usable
				// in templates of other modules
			imports: module[],  // modules that provides exports that uses in
				// this module
				// module - module classname
			providers: provider[],  // register providers on root injector
				// these providers will be singletones
				// provider - classname (token) or object like:
					// {provide: token, useClass: classname}
					// or {provide: token, useExisting: provider}
					// or {provide: token, useValue: object}
					// or {provide: token, useFactory: func, deps: provider[]}
			bootstrap: component[]  // main view - root component of this module
				// only root module can set this property
				// component - component classname
		}
}
================================================================================
Component ====================================================================={
	
	// The component (directive-with-a-template) is a controller class with
	// a template which mainly deals with a view of the application and logic
	// on the page. It is a bit of code can be used throughout an application.
	
	@Component(metadata)
		// metadata:
		{
			selector: string,  // css selector that tells where to insert
				// instance of this component
			template: string,  // html template
			templateUrl: path,  // path to html template file
			providers: provider[],  // register providers on local injector
				// will be available on this component and all its children
			styles: string[],
			styleUrls: path[]
		}
	
	// Component lifecycle
		ngOnChanges(changes: {[name: string]: SimpleChange}) : void
		ngOnInit() : void
		ngDoCheck() : void
		 ngAfterContentInit() : void
		 ngAfterContentChecked() : void
		 ngAfterViewInit() : void
		 ngAfterViewChecked() : void
		ngOnDestroy() : void
		// these hook methods can be overridden on component or directive class
	
	// Component can depend on services that registered on injector.
	// Dependencies declares by constructor injection.
}
================================================================================
Service ======================================================================={
	
	// Service is a broad category encompassing any value, function, or feature.
	// Service can depend on another services that registered on injector.
	// Dependecies declares by constructor injection.
	// To enable injection service must be marked by @Injectable.
	
	@Injectable()
}
================================================================================
Directives ===================================================================={
	
	// The directive is a class with metadata that attached by @Directive
	// decorator.
	// 3 kinds of directives:
		// 1. Component
			// It is a directive-with-a-template
		// 2. Structural directive
			// It alters the layout of the DOM by adding, replacing and
			// removing its elements.
			// e.g: ngFor, ngIf
		// 3. Attribute directive
			// It changes the appearance or behavior of a DOM element. These
			// directives look like regular HTML attributes in templates.
			// e.g: ngModel, ngStyle, ngClass
	
	@Directive(metadata)
		// metadata:
		{
			selector: string
		}
	
	// Builtin directives:
		*ngIf="condition"
		
		*ngFor="let item of iterable"
		*ngFor="let item of iterable; let i = index"
			// Ex:
				<div *ngIf="users.length > 0">
					<div *ngFor="let user of users">{{user.name}}</div>
				</div>
		
		[ngSwitch]="expr"  // display one child element
			*ngSwitchWhen="expr"
			*ngSwitchDefault
		
		[ngClass]="{clsname: condition, ...}"
			// Ex:
				<button [ngClass]="{'some': isActive}"
					(click)="isActive = !isActive">Some</button>
		[ngStyle]="{propname: value, ...}"
			// Ex:
				<div [ngStyle]="{'background': '#0f0'}"></div>
		
		[class.clsname]="condition"  // add|remove css class
		[style.propname]="expr"  // set css property
		[attr.attrname]="expr"  // bind to html attribute
			// use if there are no appropriate DOM property
}
================================================================================
Data|Event binding ============================================================{
	
	// template can contain data binding expressions
	
	{{expr}}	  // model -> view
		// interpolation
	[property]="expr"  // model -> view
		// binding to property of DOM element or child Component|Directive
	(event)="statement"  // view -> model
		// in statement available $event object
	[(ngModel)]="property"  // two-way
	
		// Ex:
			<li>{{hero.name}}</li>
			
			<input type="text" (keyup)="onType($event)"/>
			...
			onType(event: any) {
				console.log((event.target as HTMLInputElement).value);
				console.log(event.target.value);
			}
	
	// Bind Component|Directive property
		// To define bindable property on Directive class define field
		// with @Input() decorator
		
		// Ex:
			export class SomeComponent {
				@Input()
				someProp: any;
				...
			}
			...
			<some [someProp]="{name: 'some name'}"></some>
		
		// Property can be aliased using @Input("aliasName")
	
	// Custom event
		// To define custom event on Directive define EventEmitter field
		// with @Output() decorator
		
		// Ex:
			export class SomeComponent {
				@Output()
				someEvent = new EventEmitter<any>();
				...
				some() {
					this.someEvent.emit({name: "some name"});
				}
			}
			...
			<some (someEvent)="onSomeEvent($event)"></some>
		
		// Event can be aliased using @Output("aliasName")
	
	// Safe navigation operator
		// It's a way to guard against null value in property path in expression
		
		{{ someobj?.prop }}  // no error if someobj == null
	
	// Pipe
		// Expression result can be transformed using pipes
		
		{{ expr | pipe }}
		// where pipe - pipe name, optionally with parameter,
		// e.g: somepipe: 'param'
		
		// Buildin pipes:
			uppercase
			lowercase
			json
			date: 'shortDate|longDate|fullDate'|format
				// format - string like: "MM/dd/yy"
		
		// Custom pipe
			// To define custom pipe create class decorated by @Pipe(metadata)
			// that implements PipeTransform interface
			
			// Ex:
				import {Pipe, PipeTransform} from "@angular/core";
				
				@Pipe({
					name: "somepipe"
				})
				export class SomePipe implements PipeTransform {
					transform(value: any, parameter: any): any {
						...
						return transformedResult;
					}
				}
}
================================================================================
Forms ========================================================================={
	
	// To use forms need to import FormsModule to app module:
		@NgModule({
			imports: [FormsModule, ...]
			...
		});
	
	// Template reference variable
		// Form or control DOM element can be referenced using template
		// reference. Declare a template reference variable by preceding
		// an identifier with a hash character (#) and refer by identifier.
		// Ex: 
			<input #box (keyup)="0"/>
			<p>{{box.value}}</p>
	
	// Directives|properties
		(ngSubmit)="statement"
		[(ngModel)]="property"
		[hidden]="condition"
		[disabled]="condition"
		[value]="expr"
	
	// Validation
		// To use form|control validation this form|control must be referenced
		// with "ngForm" and "ngModel" directives respectively.
		// After this form|control reference variable will contain properties:
			untouched : bool
			touched : bool
			pristine : bool
			dirty : bool
			valid : bool
			invalid : bool
		
		// Also control has css classes appropriate to its current state:
			ng-untouched
			ng-touched
			ng-pristine
			ng-dirty
			ng-valid
			ng-invalid
	
	// Ex:
		<form
			#heroForm="ngForm" [hidden]="submitted"
			(ngSubmit)="onSubmit(hero)">
			<div class="form-group">
				<label for="power">Hero Power</label>
				<select class="form-control" required
					[(ngModel)]="hero.power" name="power">
					<option *ngFor="let p of powers" [value]="p">{{p}}</option>
				</select>
			</div>
			<div class="form-group">
				<input type="text" class="form-control" required
					#name="ngModel"
					[(ngModel)]="hero.name" name="name"/>
				<div [hidden]="name.valid || name.pristine"
					class="alert alert-danger">
					Name is required
				</div>
			</div>
			<button type="submit" class="btn btn-default"
				[disabled]="heroForm.form.invalid"
				(click)="submitted = true;">Submit</button>
		</form>
		<button class="btn btn-default"
			[hidden]="!submitted"
			(click)="submitted = false">Show</button>
}
================================================================================
Routing ======================================================================={
	
	// Setup routing:
		// 1. Add to html:
			<head>
				<base href="/">  // base path
					// must be first child of <head>
				...
			</head>
			<body>
				...
				<router-outlet></router-outlet>  // routed views go here
				...
			</body>
		
		// 2. Define routing module:
			import {RouterModule} from "@angular/router";
			@NgModule({
				imports: [RouterModule.forRoot({
					// routes...
				})],
				exports: [RouterModule]
			})
			export class AppRoutingModule {}
		
		// 3. Import routing module to app module:
			@NgModule({
				imports: [AppRoutingModule, ...],
				...
			})
			export class AppModule {}
	
	RouterModule.forRoot(route[]): ModuleWithProviders
		// route - object:
		{
			path: string,  // from (relative)
				// can be empty that matches base
				// can be wildcard "**" that matches any path
				// can contain parameters
					// e.g: pa/th/:param1/:param2
					// these params accessible in component using
					// ActivatedRoute.params
			component: component,  // what component to show
			redirectTo: path,
			pathMatch: "full|prefix",
			data: map,
			children: route[]
		}
	
	// To retrieve current state info, e.g. path params, use
	// ActivatedRoute service
	
	// ActivatedRoute
		url : Observable<pathPart[]>  // array or path parts
		params : Observable<params>  // map of params (required and optional)
		data : Observable<object>
		queryParams : Observable<object>
			// Ex:
				this.route.params.forEach((params: Params)=> {
					let name = params["name"];
					...
				});
		snapshot : ActivatedRoute  // no-observable version
		// Angular provides observable because component instance can be reused
		// during navigation
	
	// For navigating programatically use Router and Location services
	
	// Router
		navigate(pathPart[])
			// pathParts - "link parameters array" - absolute or relative path,
				// optionally parametrized
			// Ex:
				this.router.navigate(["/user", user.name, ""]);
					// with required param
				this.router.navigate(["/detail", user.name,
						{opt1: "v1", opt2: "v2"}])
					// with optional params
					// optional params appears in matrix url params:
					// /detail/some;opt1=v1;opt2=v2
		navigateByUrl(url: string)
	
	// Location
		back()
		forward()
	
	// For link navigation use <a routerLink="path" ... ></a>
		// routerLink accepts string path or link parameters array
		// Ex:
			<a routerLink="/detail/some">Some</a>
			<a [routerLink]="['/detail', user.name]" routerLinkActive="active">
				{{user.name}}</a>
	
	
	// Ex:
		// app-routing.module.ts:
			import {RouterModule} from "@angular/router";
			
			@NgModule({
				imports: [
					RouterModule.forRoot([{
						path: "home",
						component: HomeComponent
					}, {
						path: "user/:id",
						component: UserComponent
					}, {
						path: "",
						redirectTo: "/home",
						pathMatch: "full"
					}])
				],
				exports: [RouterModule]
			})
			export class AppRoutingModule {
			}
		
		// app-module.ts:
			import AppRoutingModule from "./app-routing.module";
			
			@NgModule({
				imports: [AppRoutingModule, ...],
				...
			})
			export class AppModule {
			}
		
		// user.component.ts:
			import {ActivatedRoute, Params} from "@angular/router";
			import {Location} from "@angular/common";
			
			@Component({
				selector: "user",
				template: `
					<div *ngIf="user">
						<div>Name: {{user.name}}</div>
						<div *ngIf="friendOf">
							is friend of: {{friendOf.name}}
						</div>
						<div *ngIf="user.friends.length > 0">
							Another friend: {{user.friends[0].name}}<br/>
							<a [routerLink]="['/user', user.friends[0].id,
									{friendOfId: user.id}]">View</a>
						</div>
					</div>
				`
			})
			export class UserComponent {
				user: User;
				friendOf: User;
				
				constructor(
						private route: ActivatedRoute,
						private router: Router,
						private location: Location,
						private users: Users) {
				}
				
				ngOnInit() {
					this.route.params.forEach((params: Params)=> {
						let id = +params["id"];
						this.users.get(id).then((user)=> {
							this.user = user;
						});
						
						let friendOfId = +params["friendOfId"];
						if (friendOfId) {
							this.users.get(friendOfId).then((user)=> {
								this.friendOf = user;
							});
						}
					});
				}
			}
}
================================================================================
Http =========================================================================={
	
	// Sending ajax requests
	
	// Setup:
		// 1. Import HttpModule to app module:
			import {HttpModule} from "@angular/http";
			@NgModule({
				imports: [HttpModule, ...],
				...
			})
			export class AppModule {}
		
		// 2. Optionally, import toPromise and other Observable operators
			import "rxjs/add/operator/toPromise";
			import "rxjs/add/operator/map";
			...
	
	// Http service
		request(url: string|Request [, config: RequestOptions]) :
				Observable<Response>
		get(url [, config]) : Observable<Response>
		head(url [, config]) : Observable<Response>
		delete(url [, config]) : Observable<Response>
		put(url, data [, config]) : Observable<Response>
		post(url, data [, config]) : Observable<Response>
		patch(url, data [, config]) : Observable<Response>
	
	// RequestOptions
		new RequestOptions(map: RequestOptionsArgs)
		
		method : string
		headers : Headers
		body : any
		url : string
		search : string|URLSearchParams
		withCredentials : bool
		responseType : ResponseContentType  // Text, Blob, etc.
	
	// Request
		new Request(map: RequestArgs)
		
		method : RequestMethod
		headers : Headers
		url : string
		withCredentials : bool
		responseType : ResponseContentType
		
		detectContentType() : ContentType
		detectContentTypeFromBody() : ContentType
		getBody() : any
	
	// Response
		url : string
		ok : bool
		status : number
		statusText : string
		headers : Headers
		
		text() : string
		json() : object
		blob() : Blob
		arrayBuffer() : ArrayBuffer
	
	// Headers
		new Headers(map)
		
		get(name) : string
		has(name) : bool
		set(name, value)
		append(name, value)
		delete(name)
	
	
	// Ex:
		// app.module.ts:
			import {HttpModule} from "@angular/http";
			
			@NgModule({
				imports: [HttpModule, ...],
				...
			})
			export class AppModule {}
		
		// some.service.ts:
			import {Http, Headers} from "@angular/http";
			import "rxjs/add/operator/toPromise";
			import {Observable} from "rxjs";
			import "rxjs/add/operator/map";
			
			export class SomeService {
				private headers = new Headers({"Content-Type": "application/json"});
				
				constructor(private http: Http) {
				}
				
				getList(): Promise<SomeItem[]> {
					return this.http.
							get(this.urlItems).
							toPromise().
							then((r)=> {
								return r.json().list as SomeItem[];
							}).
							catch(this.handleError);
				}
				
				update(item: SomeItem): Promise<SomeItem> {
					let url = `${this.urlItems}/${item.id}`;
					return this.http.
							put(url, JSON.stringify(item), {headers: this.headers}).
							toPromise().
							then(()=> item).
							catch(this.handleError);
				}
				
				search(term: string): Observable<SomeItem[]> {
					if (!term) {
						return Observable.of<SomeItem[]>([]);
					}
					return this.http.
							get(`${urlItems}/?name=${term}`).
							map((r: Response)=> {
								return r.json().list as SomeItem[];
							});
				}
				
				private handleError(error: any): Promise<any> {
					console.error("An error occurred", error);
					return Promise.reject(error.message || error);
				}
			}
}
================================================================================
Observable ===================================================================={
	
	// An observable is a stream of events that we can process with array-like
	// operators.
	
	// By default supports methods:
		forEach((value: T)=> void) : Promise<void>
	
	// To allow using other rxjs observable operators need to import them:
		import "rxjs/add/observable/of";
		import "rxjs/add/observable/throw";
		
		import "rxjs/add/operator/catch";
		import "rxjs/add/operator/debounceTime";
		import "rxjs/add/operator/distinctUntilChanged";
		import "rxjs/add/operator/do";
		import "rxjs/add/operator/filter";
		import "rxjs/add/operator/map";
		import "rxjs/add/operator/switchMap";
		import "rxjs/add/operator/toPromise";
}
================================================================================
Testing ======================================================================={
	
	// /karma.conf.js:
		files: [
			'app/build/angular.js',
			
			'node_modules/zone.js/dist/long-stack-trace-zone.js',
			'node_modules/zone.js/dist/proxy.js',
			'node_modules/zone.js/dist/sync-test.js',
			'node_modules/zone.js/dist/jasmine-patch.js',
			'node_modules/zone.js/dist/async-test.js',
			'node_modules/zone.js/dist/fake-async-test.js',
			
			'app/build/test*.js',
		]
	
	// Angular provides TestBed class and several helper functions
	// from @angular/core/testing.
	// TestBed creates a testing module - @NgModule class - that you configure
	// to produce test module environment.
	// Before each spec, the TestBed resets itself to a base state.
	
	// Preinit
		TestBed.initTestEnvironment(
				BrowserDynamicTestingModule, platformBrowserDynamicTesting());
		// invoke it in beforeAll to setup test environment
	
	TestBed.configureTestingModule(metadata) : TestBed
		// setup module environment
		// metadata:
		{
			imports: module[],
			declarations: viewclass[],
			providers: provider[],
			schemas: schema[]
				// e.g. NO_ERRORS_SCHEMA - to tell the compiler to ignore
				// unrecognized elements and attributes
		}
	TestBed.overrideComponent(component, metadataOverride) : TestBed
		// replace the component's metadata
		// metadataOverride:
		{
			add: metadata,
			remove: metadata,
			set: metadata
			// where metadata - Component's metadata to override:
				// selector, template, templateUrl, providers
		}
		// there also overrideDirective, overrideModule and overridePipe methods
	
	TestBed.createComponent(component) : ComponentFixture<component>
		// create fixture for component
	
	// ComponentFixture
		componentInstance : component
		debugElement : DebugElement  // root view of template
		
		detectChanges()  // trigger change detection cycle
		autoDetectChanges(bool)  // enable automatic change detection
			// use provider {provide: ComponentFixtureAutoDetect, useValue: true}
			// to enable automatic change detection for all fixtures
		whenStable() : Promise  // resolves when component becomes stable
			// (when all pending asynchronous activities
			// within this test becomes complete)
		isStable() : bool
		destroy()  // trigger component destruction
	
	// DebugElement
		injector : Injector
			// use injector.get(clsname) to get service injected into this
			// component's own injector
		nativeElement : HTMLElement
		children : DebugElement
		parent : DebugElement
		name : string  // element tag name
		
		query(predicate : Predicate<DebugElement>) : DebugElement
		queryAll(predicate : Predicate<DebugElement>) : DebugElement[]
			// where predicate - By.css(selec), By.directive(clsname), etc.
		triggerEventHandler(eventname, data)  // trigger event on this element
	
	// Utility functions
		inject(provider[], (instance, ...)=> void)
			// get service injected into the root injector (TestBed)
		async(()=> void) : ()=> void
			// to run it() or beforeEach() body in a special async test zone
		fakeAsync(()=> void) : ()=> void
			// run it() or beforeEach() body in a fakeAsync test zone
		tick()
			// simulate the passage of time and completion of
			// pending asynchronous activities. Uses with fakeAsync.
	
	
	// Ex:
		import {
				TestBed,
				ComponentFixtureAutoDetect,
				inject
		} from "@angular/core/testing";
		import {AppComponent} from "../app.component";
		import {Logger} from "../logger.service";
		import {
				BrowserDynamicTestingModule,
				platformBrowserDynamicTesting
		} from "@angular/platform-browser-dynamic/testing";
		import {FormsModule} from "@angular/forms";
		import {NO_ERRORS_SCHEMA} from "@angular/core";
		import {By} from "@angular/platform-browser";
		
		describe("AppComponent;", ()=> {
			
			beforeAll(()=> {
				console.log("before all 1");
				TestBed.initTestEnvironment(
						BrowserDynamicTestingModule,
						platformBrowserDynamicTesting());
			});
			
			let fixture;
			let comp: AppComponent;
			
			beforeEach(()=> {
				console.log("before each 1");
				TestBed.configureTestingModule({
					imports: [FormsModule],
					declarations: [AppComponent],
					providers: [
						{provide: ComponentFixtureAutoDetect, useValue: true},
					],
					schemas: [NO_ERRORS_SCHEMA]
				});
				fixture = TestBed.createComponent(AppComponent);
				comp = fixture.componentInstance;
			});
			
			it("log event;", ()=> {
				let logger = fixture.debugElement.injector.get(Logger);
				
				let received;
				spyOn(logger, "log").and.callFake((obj)=> {
					received = obj;
				});
				
				let some = {name: "test some"};
				comp.logEvent(some);
				expect(received).toBe(some);
			});
			
			it("app name;", ()=> {
				let nameEl = fixture.debugElement.
						query(By.css(".name")).nativeElement;
				expect(nameEl.textContent).toContain("Some");
				
				comp.name = "Other";
				fixture.detectChanges();
				expect(nameEl.textContent).toContain("Other");
			});
			
			it("load items;", ()=> {
				fixture.detectChanges();
				
				let items = fixture.debugElement.
						queryAll(By.css("div.item"));
				expect(items.length).toBe(0);
				
				fixture.whenStable().then(()=> {
					fixture.detectChanges();
					expect(items.length).toBe(3);
				})
			});
		});
		
		describe("Logger;", ()=> {
			
			beforeEach(()=> {
				TestBed.configureTestingModule({
					imports: [FormsModule],
					declarations: [],
					providers: [
						{provide: ComponentFixtureAutoDetect, useValue: true},
						{provide: Logger, useValue: {
							log: (obj)=> {console.log("logger stub", obj);}
						}}
					]
				});
			});
			
			it("call log;", inject([Logger], (logger)=> {
				let some = {name: "test some"};
				logger.log(some);
			}));
		});
		
		export {};
}

================================================================================
Complete example =============================================================={
	
	// index.html:
		<body>
			<my-app>Loading...</my-app>
			
			<script src="./build/angular.js"></script>
			<script src="./build/main.js"></script>
		</body>
	
	// main.ts:
		import {enableProdMode} from "@angular/core";
		import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
		import {AppModule} from "./app.module";
		
		enableProdMode();
		platformBrowserDynamic().bootstrapModule(AppModule);
	
	// app.module.ts:
		import {NgModule} from "@angular/core";
		import {BrowserModule} from "@angular/platform-browser";
		import {FormsModule} from "@angular/forms";
		import {AppComponent} from "./app.component";
		import {MyFruitComponent} from "./my-fruit.component";
		import {LoggerService} from "./logger.service";
		import {FruitsService} from "./fruits.service";
		
		@NgModule({
			imports: [BrowserModule, FormsModule],
			declarations: [AppComponent, MyFruitComponent],
			bootstrap: [AppComponent],
			providers: [FruitsService, LoggerService]
		})
		export class AppModule {
		}
	
	// app.component.ts:
		import {Component} from "@angular/core";
		import {FruitsService, Fruit} from "./fruits.service";
		
		@Component({
			selector: "my-app",
			template: `
				<h3>App: {{name}}</h3>
				<input type="text" [(ngModel)]="name"/>
				<hr/>
				<div>
					<input type="text" #inputNewFruit/>
					<button (click)="add(inputNewFruit.value)">Add fruit</button>
				</div>
				<h3>List of Fruits</h3>
				<ul>
					<li *ngFor="let item of items"
						(click)="onItemClick(item);"
						[class.selected]="item == selected">
						{{item.name}}
					</li>
				</ul>
				<my-fruit [fruit]="selected"></my-fruit>
			`
		})
		export class AppComponent {
			name = "Some name";
			
			items: Fruit[] = [];
			selected: Fruit|null;
			
			constructor(private fruits: FruitsService) {
			}
			
			ngOnInit() {
				this.fruits.get().then((fruits: Fruit[])=> {
					this.items = fruits;
				}, (err)=> {
					console.error(err);
				});
			}
			
			onItemClick(item) {
				console.log(item.name);
				this.selected = item;
			}
			
			add(name) {
				this.fruits.add(name);
			}
		}
	
	// my-fruit.component.ts:
		import {Component, Input} from "@angular/core";
		import {FruitsService, Fruit} from "./fruits.service";
		
		@Component({
			selector: "my-fruit",
			template: `
				<div *ngIf="fruit">
					Fruit: <br/>
					<input type="text" [(ngModel)]="fruit.name"/>
					<br/>
					<button (click)="del(fruit.name)">Delete</button>
				</div>
			`
		})
		export class MyFruitComponent {
			@Input()
			fruit: Fruit|null;
			
			constructor(private fruits: FruitsService) {
			}
			
			del(name) {
				this.fruits.del(name);
				this.fruit = null;
			}
		}
	
	// fruit.service.ts:
		import {Injectable} from "@angular/core";
		import {LoggerService} from "./logger.service";
		
		export interface Fruit {
			name: string;
		}
		
		@Injectable()
		export class FruitsService {
			private fruits: Fruit[] = [
				{name: "Apple"},
				{name: "Banana"},
				{name: "Orange"}
			];
			
			constructor(private logger: LoggerService) {
			}
			
			get(): Promise<Fruit[]> {
				this.logger.log("get...");
				return new Promise((resolve, reject)=> {
					this.logger.log(this.fruits);
					resolve(this.fruits);
				});
			}
			
			del(name: string) {
				for (let i = 0; i < this.fruits.length; i++) {
					if (this.fruits[i].name == name) {
						this.fruits.splice(i, 1);
						i--;
					}
				}
			}
			
			add(name: string) {
				if (name) {
					this.fruits.push({name: name});
				}
			}
		}
	
	// logger.service.ts:
		import {Injectable} from "@angular/core";
		
		@Injectable()
		export class LoggerService {
			log(msg: any) {
				console.log(msg);
			}
			
			error(msg: any) {
				console.error(msg);
			}
			
			warn(msg: any) {
				console.warn(msg);
			}
		}
}
