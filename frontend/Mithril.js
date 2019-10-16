
// Mithril - framework for building Single Page Applications.
// Gives hierarchical MVC components, URL routing,
// customizable data binding, and safe-by-default templates with virtual DOM.
// One-way data flow.

// v1.0.1

// CDN:
	//unpkg.com/mithril@1.0.1/mithril.min.js
	//unpkg.com/mithril/mithril.min.js  // latest

================================================================================
Setup ========================================================================={
	
	// package.json:
	{
		"devDependencies": {
			"acorn": "^4.0.11",
			"autopolyfiller-loader": "^1.1.0",
			"autoprefixer-loader": "^3.2.0",
			"babel-core": "^6.23.1",
			"babel-loader": "^6.3.2",
			"babel-plugin-transform-react-jsx": "^6.23.0",
			"babel-preset-es2015": "^6.22.0",
			"clean-webpack-plugin": "^0.1.15",
			"css-loader": "^0.26.1",
			"file-loader": "^0.10.0",
			"html-loader": "^0.4.4",
			"less": "^2.7.2",
			"less-loader": "^2.2.3",
			"style-loader": "^0.13.1",
			"webpack": "^2.2.1"
		},
		"dependencies": {
			"mithril": "^1.0.1"
		}
	}
	
	// .babelrc:
	{
		"presets": ["es2015"],
		"plugins": [
			["transform-react-jsx", {"pragma": "m"}]
		]
	}
}
================================================================================
Component ====================================================================={
	// Component - plain object with required view and optional controller
	// methods.
	// Additionally it can contain data and any methods.
	
	var myComponent = {
		oninit: function(vnode) {
			
		},
		view: function(vnode) {
			return (<div>
				{/* some view */}
			</div>);
		},
		controller: function(vnode) {
			
		}
	};
	
	// Lifecycle methods
		
		oninit(vnode)  // before vnode rendered into real element
		view(vnode) : vnode
		oncreate(vnode)  // after attached to document at end of render cycle
		
		onbeforeupdate(vnode, old) : bool  // before diff
			// return false to prevent
		onupdate(vnode)  // at end of second and next render cycles
		
		onbeforeremove(vnode) : promise  // before detached from document
			// mithril will wait for promise resolvation
		onremove(vnode)  // after promise resolved, but before node detached
		
		// Same hooks can be applied to vnode.
		// Inside hooks this == vnode.state.
}
================================================================================
Vnode ========================================================================={
	// Vnode - virtual DOM node.
	
	// Create vnode:
	// using hyperscript:
		m(selector|component [, attrs] [, content]) : vnode
			// selector - tag name or css selector, can be any valid
				// combination of tag, #, . or [] (attribute) syntax
				// if tagname omitted div will be used
			// attrs - map of html attributes or element properties,
				// for html attributes uses keys same as in html
			// content - vnode, array of vnodes or string
		
		m.trust(hmtlStr) : vnode  // turn html string into unescaped html
		m.fragment(attrs, vnode[]) : vnode  // create fragment vnode
			// so fragment can have one set of props
	
	// or using JSX:
		(<div>
			<SomeComponent someAttr={ Model.some + ' pcs' }/>
			<br/>
			{ Model.getSome() }
		</div>)
		
		// it's equivalent to:
			m('div', [
				m(SomeComponent, {someAttr: Model.some + ' pcs'}),
				m('br'),
				Model.getSome()
			])
	
	// Hyperscript - is just javascript.
	
	// JSX - syntax extension for JS and must be precompiled.
	// Unlike React, Mithril uses attribute names exact as in html,
	// event handlers - onclick={}, onkeyup={} & etc.
	
	// Properties
		
		tag : string|component
			// "tagname" - normal node
			// "[" - fragment (array of vnodes)
			// "#" - text node
			// "<" - trusted html
			// object - component object
		key : string?
		attrs : object?  // attributes of vnode and route parameters
			// attribute can be a callback function
		children : string|vnode[]?
		text : string?  // if contain only text node (native elements only)
		dom : element?  // appropriate native element
		state : object  // object persisted between redraws,
			// on component vnode it's an object inherited from component object
}
================================================================================
Primary API ==================================================================={
	
	m.render(element, vnode|vnode[])  // render|redraw template
		// element - container node (native) where view will be incerted
		// will just update existing tree on second and next calls
	
	m.mount(element, component)  // render component with autoredraw
		// will automatically redraw (synchronous):
			// after event handler
				// set event.redraw to false to cancel autoredraw
			// after m.request and m.jsonp resolved
				// set background property to true to cancel autoredraw
			// after route changes
		// will automatically throttle redraws if frequency more than 16ms
	m.redraw()  // manually redraw all rendered components (asynchronous)
		// use it with m.mount and m.route, not m.render
	
	m.withAttr(attrName, callb(value) [, ctx]) : handler
		// create event handler that invokes callback with value of specified
		// DOM attribute|property
		// e.g.:
			m('input', {onchange: m.withAttr('value', todo.description)})
			// is equivalent to:
			m('input', {onchange: this.onchange})
			...
			onchange: function(ev) {
				todo.description(ev.target['value']);
			}
}
================================================================================
AJAX =========================================================================={
	
	m.request([url] [, options]) : promise<response>
		// options:
		{
			method: 'GET',
			url: string,
				// can be parameterized ("/:param/")
			data: map|formdata,
				// data to be interpolated into url and
				// serialized into querystring or body
			headers: map,
			async: true,
			background: false,
			withCredentials: false,
				// whether to send cookies
			user: string,  // for http authorization
			password: string,
			serialize: JSON.stringify,
			config: (xhr)=> xhr,
				// hook to expose underlying XMLHttpRequest
			extract: (xhr)=> xhr.responseText,
				// func to extract response from xhr object
				// returned value will be passed to result promise
				// deserialize will be ignored if custom extract specified
			deserialize: JSON.parse,
			type: (any)=> any,  // constructor func for response object
		}
		// ret promise that resolves to the response data after it has been
		// piped through extract, deserialize and type methods
	
	m.jsonp([url] [, options]) : promise<response>
		// options:
		{
			url: string,
				// can be parameterized
			data: map,
				// data to be interpolated into url and
				// serialized into querystring
			callbackName: string,  // name of callback func, default: random
			callbackKey: string,  // name of query param that specifies
				// callback func name, default: 'callback'
			type: (any)=> any,  // constructor func for response object
		}
	
	m.parseQueryString(str) : map
		// automatically url-decoded
	m.buildQueryString(map) : str
		// automatically url-encoded
	
	// Ex:
		var progress = 0;
		
		m.mount(document.body, {
			view: function() {
				return [
					m('input[type=file]', {onchange: upload}),
					progress + '% completed'
				]
			}
		});
		
		function upload(ev) {
			var file = ev.target.files[0];
			var data = new FormData();
			data.append('myfile', file);
			m.request({
				method: 'POST',
				url: '/api/v1/upload',
				data: data,
				config: function(xhr) {
					xhr.addEventListener('progress', function(ev) {
						progress = ev.loaded / ev.total;
						m.redraw();
					});
				}
			});
		}
}
================================================================================
Routing ======================================================================={
	
	m.route(element, defPath, routes)  // setup route mapping
		// element - container node where views will be inflated
		// defPath - default path (string)
		// routes - map of paths to components,
			// key - path, can be parameterized,
				// values of params will be available at vnode.attrs
			// value - component or RouteResolver
		// autoredraw will be enabled for mapped views
		// uses hashbang navigation with "#!" prefix by default
		
		// RouteResolver - object:
			{
				onmatch: (args, requestedPath)=> component|promise<component>,
				render: (vnode)=> vnode
				// both methods are optional
			}
		
		// Ex:
			m.route(document.body, '/home', {
				'/home': HomeComponent,
				'/form/:param': {
					render: function(vnode) {
						return (<FormComponent someparam={ vnode.attrs.param }/>);
					}
				},
				'/files/:file...': FileComponent,  // variadic parameter
					// that can contain slashes
				...
			});
		
		// To recreate component when parameter changed use "key" parameter.
	
	m.route.set(path, data, options)
		// path - path to redirect, can be parameterized
		// data - params for interpolation
		// options:
		{
			replace: false,  // whether to replace current history entry
			state: object,  // state for pushState api
			title: string  // title for pushState api
		}
	m.route.get() : string  // last fully resolved routing path,
		// without prefix
	m.route.param(name) : string  // get path param by name (undocumented)
	
	m.route.link(vnode) : handler  // create event handler
		// that invokes m.route.set with "href" attr
		// e.g.:
			<a href="/path" oncreate={ m.route.link }>Go</a>
			// so this link will redirect to "#!/path"
	
	m.route.prefix(string)  // set route prefix that controls routing strategy
		// default: "#!" - hash strategy
		// "?" - querystring strategy
		// "" - pathname strategy
}
================================================================================
Stream ========================================================================{
	// Stream - reactive data structure.
	// It's not part of core dist.
	
	import Stream from 'mithril/stream';
	
	new Stream([value]) : stream  // stream with or without initial value
		// if value not provided stream will be in pending state
	
	Stream.HALT  // spec value that can be returned to stream callbacks
		// to halt execution of downstreams (dependent streams)
	Stream.merge(stream[]) : stream
		// create stream whose value is array of values from given streams
	Stream.combine(combiner(stream, ...)=> any, stream[]) : stream
		// create stream whose value produced by combiner function
	
	end : stream  // co-dependent stream that unregisters dependent streams
		// if set to true
	map((any)=> any) : stream  // create dependent stream
	
	// States:
		// pending - initial state, while stream has no value,
			// dependent stream will be pending if at least one parent pending
		// active - stream received some value
		// ended - end(true) called on this stream, stream stops affecting its
			// dependent streams
	
	// Ex:
		// basic usage - as a getter/setter property:
			var s = new Stream();
			s('some');
			var val = s();  // 'some'
		
		// as computation pipe:
			var s = new Stream('qwe');
			var sUpper = s.map((v)=> {
				return v.toUpperCase();
			});
			sUpper()  // 'QWE'
			
			s.end(true);
			s('rty');
			s()  // 'rty'
			sUpper()  // 'QWE'
		
		// multiple sources:
			var a = new Stream(3);
			var b = new Stream(2);
			var c = Stream.combine((a, b)=> {
				return a() + b();
			}, [a, b]);
			var res = c();  // 5
}
================================================================================
Example ======================================================================={
	
	// main.js:
		import m from 'mithril';
		import Home from './home';
		import Edit from './edit';
		
		m.route(document.body, '/home', {
			'/home': Home,
			'/edit/:id': {
				render: function(vnode) {
					return (
						<Edit/>
					);
				}
			}
		});
		
		export {};
	
	// home.js:
		import m from 'mithril';
		import Items from './items';
		
		var Home = {
			oninit: function() {
				this.select = this.select.bind(this);
			},
			view: function(vnode) {
				var _this = this;
				return (<div>
					{ Items.list.map(function(item) {
						return (<div key={ item.id }>
							{ item.name }
							<button onclick={()=> _this.select(item)}>Edit</button><br/>
						</div>);
					}) }
				</div>);
			},
			
			select: function(item) {
				Items.selected = item;
				m.route.set('/edit/:id', {id: item.id});
			}
		};
		
		export default Home;
	
	// edit.js:
		import m from 'mithril';
		import Items from './items';
		
		var Edit = {
			view: function(vnode) {
				return (<div>
					ID: { vnode.attrs.id }<br/>
					<input type="text"
						value={ Items.selected.name }
						oninput={ m.withAttr('value', Items.selected.setName) }/>
					<br/>
					<button
						onclick={ Items.selected.save }
						disabled={ Items.selected.saved }>Save</button>
				</div>);
			},
		};
		
		export default Edit;
	
	// items.js:
		import m from 'mithril';
		import Item from './item';
		
		var Items = {
			list: [
				new Item(1, 'Item 1'),
				new Item(2, 'Item 2')
			],
			selected: null,
		};
		
		export default Items;
	
	// item.js:
		import m from 'mithril';
		
		class Item {
			constructor(id, name) {
				this.id = id;
				this.name = name;
				this.saved = true;
				
				this.setName = this.setName.bind(this);
				this.save = this.save.bind(this);
			}
			
			setName(name) {
				this.name = name;
				this.saved = false;
			}
			
			save() {
				return m.request({
					method: 'PUT',
					url: '//httpbin.org/put',
					data: {
						id: this.id,
						name: this.name
					}
				}).then((res)=> {
					this.saved = true;
				});
			}
		}
		
		export default Item;
}
