
// Flux
//     .--------←-----------←-----------←-------.
//     ↓                                        ↑
// | Action | → | Dispatcher | → | Store | → | View |
//    ↑ ↓
// ------------
// | Some API |
// ------------

// Architecture that uses one-direction data flow model.
// Flux tells how to manage data stream.

// Actions - helpers for sending data to Dispatcher. Describes what changed.
// Dispatcher - receive Actions and share events to registered handlers.
// Store - container of data (state) and logic (handlers registered on
	// Dispatcher). Store - the only entity that knows how to change state.
	// Store is a "domain" of the app.
// Controller View - component that collects state and forwards it to child
	// components.

================================================================================
Setup ========================================================================={
	
	// /package.json:
	{
		"devDependencies": {
			"autopolyfiller-loader": "^1.0.1",
			"autoprefixer-loader": "^3.2.0",
			"babel-core": "^6.18.2",
			"babel-eslint": "^7.1.1",
			"babel-loader": "^6.2.8",
			"babel-plugin-transform-es2015-modules-commonjs": "^6.18.0",
			"babel-preset-es2015": "^6.18.0",
			"babel-preset-react": "^6.16.0",
			"clean-webpack-plugin": "^0.1.14",
			"css-loader": "^0.26.1",
			"file-loader": "^0.9.0",
			"html-loader": "^0.4.4",
			"style-loader": "^0.13.1",
			"webpack": "^2.2.1"
		},
		"dependencies": {
			"react": "^15.4.1",
			"react-dom": "^15.4.1",
			"react-redux": "^4.4.6",
			"redux": "^3.6.0"
		}
	}
	
	// /webpack.config.js:
	{
		var webpack = require('webpack');
		var CleanWebpackPlugin = require('clean-webpack-plugin');
		
		var src = __dirname + '/app/src';
		var build = __dirname + '/app/build';
		
		var config = {
			context: src,
			entry: {
				react: [
					'react', 'react-dom',
					'redux', 'react-redux'
				],
				index: ['./index'],
			},
			output: {
				path: build,
				filename: '[name].js',
				library: '[name]',
				publicPath: '/build/'
			},
			
			module: {
				rules: [{
					test: /\.jsx?$/,
					include: [src],
					loader: 'babel?presets[]=es2015,presets[]=react'
				}, {
					test: /\.html$/,
					include: [src],
					loader: 'html'
				}, {
					test: /\.(png|gif|jpg|jpeg)$/,
					include: [src],
					loader: 'file'
				}, {
					test: /\.css$/,
					include: [src],
					loader: 'style!css!autoprefixer'
				}]
			},
			
			plugins: [
				new CleanWebpackPlugin([build + '/*']),
				new webpack.optimize.CommonsChunkPlugin({
					name: 'react',
					minChunks: Infinity
				}),
			],
			
			resolve: {
				extensions: ['.js', '.jsx']
			},
			resolveLoader: {
				moduleExtensions: ['-loader']
			},
			
			devtool: 'source-map',
		};
		
		module.exports = config;
	}
}
================================================================================
React ========================================================================={
// version 15.4.0

================================
// JSX
	// Syntax extension to JS.
	// JSX produces VNodes (compilation).
	// JSX can contain JS expressions in curly braces (both for content
	// and for attributes).
	// By deafult, ReactDOM escapes embedded values in JSX.
	// Custom component can have any attributes that will be available
	// on this.props object.
	
	// Ex:
		let el = (
			<div>
				<SomeComp
					name={ this.firstName + ' ' + this.lastName }/>
				<b>Some</b><br/>
				<div>{ getData() }</div>
				{/* comment */}
			</div>
		);
		ReactDOM.render(
			<div>{ el }</div>,
			document.querySelector('#root')
		);
	
	// Builtin JSX node's attributes
		
		key={ string }  // unique key, uses to give the elements a stable
			// identity when create list of elements
		ref={ func(component|element) }  // refer component instance or DOM element
		className={ string }  // specifies "class" native attribute
		tabIndex={ int }      // specifies "tabindex" native attribute
		style={ obj }  // map of styles like: { borderWidth: '1px' }
		// and most of native DOM attrs
	
	// Events
		
		onChange={ func(ev) }  // for form input elements
			// func - reference to function or definition, not calling
			// ev - SyntheticEvent object
		onInput={ func(ev) }
		onSubmit={ func(ev) }
		onClick={ func(ev)}
		onKeyDown|Press|Up={ func(ev) }
		onFocus={ func(ev) }
		onBlur={ func(ev) }
		onContextMenu={ func(ev) }
		onMouseEnter|Leave|Over|Move|Out={ func(ev) }
		onMouseDown|Up={ func(ev) }
		onSelect={ func(ev) }
		onTouchStart|Move|End|Cancel={ func(ev) }
		onScroll={ func(ev) }
		onWheel={ func(ev) }
		onLoad={ func(ev) }
		onError={ func(ev) }
		
		// To prevent default behaviour call ev.preventDefault() in handler.
		// To catch event on capture phase append "Capture" to event
		// name, e.g: onClickCapture={...}

================================
// React
	// react module
	// Entry point to the React library.
	
	React.Component  // base class for component
	React.PureComponent  // same as React.Component but implements
		// shouldComponentUpdate() with a shallow prop and state comparison.
		// It can be better for performance reasons.
	
	React.createElement(type [, props] [, children, ...]) : VNode
		// type - tag name string or component type
	React.createFactory(type) : func
	React.cloneElement(VNode [, props] [, children, ...]) : VNode
	React.isValidElement(obj) : bool

================================
// ReactDOM
	// react-dom module
	// Top level DOM-specific methods.
	
	ReactDOM.render(VNode, element [, callb()])  // render|update
		// React element into the container DOM node
	ReactDOM.unmountComponentAtNode(element)  // remove React elements from
		// container DOM node
	ReactDOM.findDOMNode(component) : element  // get native DOM element
		// corresponding to the given component

================================
// Component
	// To create own Component - extend React.Component class and
	// override render() method.
	
	class SomeComp extends React.Component {
		constructor(props) {
			super(props);
		}
		
		render() {  // required
			return (
				some JSX markup...
			);
			// to hide component - return null
		}
	}
	
	// React.Component static fields|methods:
		
		propTypes : obj  // describe props constraints
		defaultProps : obj  // default props values
		displayName : string
	
	// React.Component instance fields|methods:
		
		state : obj  // this component's state object
			// initial state must be assigned in constructor
		props : obj  // map of readonly properties that passed from parent
			// by a JSX attributes
		props.children : VNode[]|undefined  // nested nodes from JSX
		
		setState(obj [, done()])  // update this component's state (merge) and
			// trigger rerendering
		setState(callb(prevState, props) : obj)
		forceUpdate(done())  // trigger rerendering without checking state
	
	// Lifecycle
		
		// Mount
			constructor(props)
			componentWillMount()
			render()
			componentDidMound()
		
		// Update
			componentWillReceiveProps(newProps)
			shouldComponentUpdate(newProps, newState) : bool
			componentWillUpdate(newProps, newState)
			render()
			componentDidUpdate(prevProps, prevState)
		
		// Unmount
			componentWillUnmount()

// Stateless functional component
	// Component that only uses render() method and has immutable state.
	
	function SomeComp(props) {
		return (
			// body of this function uses instead of render() method
			some jsx markup...
		);
	}

================================
// Controlled component
	// Input form element whose value is controlled by React.
	
	class SomeComp extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				text: '',
				option: 'coconut'
			};
			this.onTextChanged = this.onTextChanged.bind(this);
			this.onOptionChanged = this.onOptionChanged.bind(this);
		}
		
		render() {
			return (
				<form>
					<input
						type="text" className="test-input"
						value={ this.state.text }
						onChange={ this.onTextChanged }/>
					<select
						value={ this.state.option }
						onChange={ this.onOptionChanged }>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</form>
			);
		}
		
		onTextChanged(ev) {
			this.setState({text: ev.target.value});
		}
		
		onOptionChanged(ev) {
			this.setState({option: ev.target.value});
		}
	}

// Uncontrolled component
	// Without onChange and frequent rerendering.
	
	class SomeComp extends React.Component {
		constructor(props) {
			super(props);
			this.onSubmit = this.onSubmit.bind(this);
		}
		
		render() {
			return (
				<form onSubmit={ this.onSubmit }>
					<input
						type="text" className="test-input"
						defaultValue=""
						ref={(ref)=> this.myInput = ref}/>
					<input type="submit" value="Submit"/>
				</form>
			);
		}
		
		onSubmit(ev) {
			ev.preventDefault();
			console.log('text:', this.myInput.value);
		}
	}

================================
// PropTypes
	// Describe props constraints.
	// Dev env only.
	
	SomeComp.propTypes = {
		somePropName: propType,
		...
	};
	
	// e.g:
		// specify type:
		optionalArray: React.PropTypes.array,
		optionalBool: React.PropTypes.bool,
		optionalFunc: React.PropTypes.func,
		optionalNumber: React.PropTypes.number,
		optionalObject: React.PropTypes.object,
		optionalString: React.PropTypes.string,
		optionalElement: React.PropTypes.element,
		
		// union:
		optionalUnion: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number,
			React.PropTypes.instanceOf(Message)
		]),
		
		// object structure:
		optionalObjectWithShape: React.PropTypes.shape({
			color: React.PropTypes.string,
			fontSize: React.PropTypes.number
		}),
		
		// required:
		requiredFunc: React.PropTypes.func.isRequired,
		
		// any required primitive:
		requiredAny: React.PropTypes.any.isRequired,

================================
// Example
	
	class SomeComp extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				visible: true
			};
			this.onClickHideLink = this.onClickHideLink.bind(this);
		}
		
		render() {
			var sListViews = this.props.myList.map(function(item, index) {
				return (
					<div key={ index }>  {
						<p>{ item.name }</p>
					</div>
				);
			});
			return (
				<div>
					{ sListViews }
					{ sListViews.length == 0 ? '<p>Empty</p>' : '' }
					<br/>
					<a href="#"
						className={ this.state.visible ? '' : 'hidden' }
						onClick={ this.onClickHideLink }>
						Click to hide
					</a>
					<b>{ this.props.children }</b>
				</div>
			);
		}
		
		onClickHideLink(ev) {
			ev.preventDefault();
			this.setState({visible: false});
		}
	}
	
	var sList = [{
		name: 'some'
	}, {
		name: 'qwe'
	}];
	
	ReactDOM.render(
		<SomeComp myList={ sList }>
			Some
		</SomeComp>,
		document.querySelector('#root')
	);

}
================================================================================
Redux ========================================================================={
// version 3.6.0

// Realization of Flux-like architecture.
// Three principles:
	// Single source of truth (Store).
	// State is read-only.
	// Changes are made with pure functions (Reducers).

// Action - describes what happened.
	// Object like {type: string, payload: any}
// ActionsCreator - factory of Actions.
// Reducer - logic of changing state. Accepts State and Action and
	// returns new State.
	// Pure function like (prevState, action)=> newState.
	// There is root Reducer that can have child Reducers (reducer
	// composition).
// Store - state tree of application and handlers for actions.
	// Calling Reducer when Action dispatched.
	// Singleton.
// Component - presentational ("silly") component. "How it looks".
	// Uses this.props for accessing data and callbacks.
// Container - "smart" component. "How it works".
	// Uses Redux state and Redux Actions.
	// Typically, automatically generated.
// Middleware - way to extend Redux with custom functionality.
	// Business logic and side effects can be here.

// 4 steps of Redux data flow:
	// 1. Store.dispatch(action)
	// 2. Store calls reducer function to calculate new state
	// 3. Root reducer may combine output from multiple reducers into
		// single tree
	// 4. Store saves complete state tree returned by root reducer,
		// Store's listeners will be invoked

================================
// redux module
	
	createStore(reducer(state, action) : state
			[, initialState] [, enhancer]) : store
		// create Redux store
		// reducer - root reducer
	combineReducers(reducers) : reducer
		// combine multiple reducers into single root reducer
		// reducers - object like {name1: (state, action)=> newState, ...}
		// So state tree will be splitted into parts appropriate to
		// given names of reducers.
	applyMiddleware(middleware(store), ...) : enhancer
		// create enhancer
		// middleware - function like (store)=> (next)=> (action)=> any
		// ex:
			createStore(rootReducer, applyMiddleware(
					(store)=> (next)=> (action)=> {
						console.log(
								`event: '${action.type}'`,
								`data: ${action.payload}`);
						return next(action);  // call next middleware in
							// the chain
					}));
	
	bindActionCreators(actionCreators, dispatch) : actionCreators
		// wrap action creators into dispatch() calls
		// actionCreators - object like {actionCreator1: ()=> action, ...}

================================
// Store methods
	
	getState() : any
		// last state tree returned by the root reducer (rootState)
	dispatch(action) : dispatchedAction
		// trigger state change
	subcribe(listener()) : remove()
		// register listener for state changes
		// use getState() to get current state inside listener
		// returns function to remove listener
	
	replaceReducer(newReducer)  // replace root reducer

================================
// react-redux module
	
	<Provider store={ mystore }>view...</Provider>
		// make the Redux store available to
		// the connect() calls in the component hierarchy
	connect([mapStateToObj(rootState, ownProps) : obj]
			[, mapDispatchToObj(dispatch, ownProps) : obj]
			[, mergeProps(stateProps, dispatchProps, ownProps) : props]
			) : container
		// create container - React component connected to Redux store
		// mapStateToObj - map store properties to object
			// that will be merged into props.
			// Invoked on each store update.
		// mapDispatchToObj - map action creators to object
			// that will be merged into props

================================
// Async actions
	// Async action - thunk - function that returns
	// function (dispatch)=> void that can call dispatch() itself.
	// For handling async actions uses middlewares like redux-thunk
	// or redux-promise.
	
	// Ex:
		// index.js:
			import thunkMiddleware from 'redux-thunk';
			import fetchPosts from './actions';
			
			const store = createStore(rootReducer,
					applyMiddleware(thunkMiddleware));
			
			store.dispatch(fetchPosts('some')).then(()=>
				console.log(store.getState());
			);
		
		// actions.js:
			export function fetchPosts(subreddit) {
				return (dispatch)=> {
					dispatch(inProgress(subreddit));
					return fetch(`http://www.reddit.com/r/${subreddit}.json`).
							then(response=> response.json()).
							then(json=> {
								dispatch(postsReceived(subreddit, json));
							});
				};
			}

================================
// Undo/redo
	// redux-undo module.
	
	// Ex:
		import undoable, {distinctState} from 'redux-undo';
		
		const undoableReducer = undoable(reducer, {
			filter: distinctState()
		});
		
		...
		import {ActionCreators} from 'redux-undo';
		
		const mapDispatchToProps = (dispatch)=> {
			return {
				onUndo: ()=> dispatch(ActionCreators.undo()),
				onRedo: ()=> dispatch(ActionCreators.redo())
			}
		};

================================
// Example
	
	// index.jsx:
		import React from 'react';
		import ReactDOM from 'react-dom';
		import {Provider} from 'react-redux';
		import App from './containers/app';
		import {createStore} from 'redux';
		import rootReducer from './reducers';
		
		const store = createStore(rootReducer);
		
		ReactDOM.render(
			<Provider store={ store }>
				<App/>
			</Provider>,
			document.getElementById('root')
		);
	
	// actions/index.js:
		export function setName(name) {
			return {
				type: 'SET_NAME',
				payload: name
			};
		}
		
		export function nameUpper() {
			return {
				type: 'UPPER'
			};
		}
	
	// reducers/name.js:
		export function name(state = {f: 'some'}, action) {
			switch(action.type) {
				case 'SET_NAME':
					return Object.assign({}, state,
							{f: action.payload});
				case 'UPPER':
					return Object.assign({}, state,
							{f: state.f.toUpperCase()});
				default:
					return state;
			}
		}
	
	// reducers/index.js:
		import {combineReducers} from 'redux';
		import nameReducer from './name';
		
		export default combineReducers({
			name: nameReducer
		});
	
	// components/app.jsx:
		import React from 'react';
		
		export default class App extends React.Component {
			
			render() {
				return (
					<div onClick={ this.props.onClick }>
						Name: { this.props.name }
						<br/>
						<input type="text" ref={(ref)=> this.newName = ref}/>
						<button onClick={ this.onClickSetName.bind(this) }>Submit</button>
					</div>
				);
			}
			
			onClickSetName(ev) {
				ev.stopPropagation();
				this.props.onClickSetName(this.newName.value);
			}
		};
	
	// containers/app.js:
		import {connect} from 'react-redux';
		import {setName, nameUpper} from '../actions';
		import App from '../components/app';
		
		function mapStateToProps(state, ownProps) {
			return {
				name: state.name.f
			};
		}
		
		function mapDispatchToProps(dispatch, ownProps) {
			return {
				onClickSetName: (newName)=> {
					dispatch(setName(newName));
				},
				onClick: ()=> {
					dispatch(nameUpper());
				}
			};
		}
		
		export default connect(
			mapStateToProps,
			mapDispatchToProps
		)(App);
}
