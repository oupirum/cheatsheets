
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
Setup ==========================================================================

	// /webpack.config.js:
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

================================================================================
React ==========================================================================
// version 16.4.1

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
		ref={ func(component|element)|RefObject }
			// refer component instance or DOM element
		className={ string }  // specifies "class" native attribute
		tabIndex={ int }      // specifies "tabindex" native attribute
		style={ obj }  // map of styles like: { borderWidth: '1px' }
		dangerouslySetInnerHTML={ {__html: str} }
		// and most of native DOM attrs

	// Events

		onChange={ func(ev) }  // for form input elements
			// ev - SyntheticEvent object
		onInput={ func(ev) }
		onSubmit={ func(ev) }
		onClick={ func(ev)}
		onKeyDown|Press|Up={ func(ev) }
		onFocus={ func(ev) }
		onBlur={ func(ev) }
		onContextMenu={ func(ev) }
		onMouseEnter|Leave={ func(ev) }
		onMouseOver|Move|Out={ func(ev) }
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

	React.Fragment  // wrapper for list of elements

	React.createRef(): RefObject
		// ref.current - target Element
	React.forwardRef(func(props, ref) : VNode) : VNode
		// create component that forwards ref down the tree

	React.createContext(defVal) : Context

	Class.contextType = ContextTypeClass
		// Assigning context type to static field of component
		// makes a context value of specified type
		// available as instance variable: this.context

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
			static getDerivedStateFromProps(props, state): state
				// return patch to update state or null
			render()
			componentDidMound()

		// Update
			static getDerivedStateFromProps(props, state) : state
			shouldComponentUpdate(nextProps, nextState) : bool
			render()
			getSnapshotBeforeUpdate(prevProps, prevState) : snapshot
				// invoked between render and commit phases
			componentDidUpdate(prevProps, prevState, snapshot)

		// Unmount
			componentWillUnmount()

// React.PureComponent
	// Similar to React.Component, but implements shouldComponentUpdate
	// with shallow props and state comparison.
	// Also PureComponent skips props update for the whole subtree.

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
						ref={ (ref)=> this.myInput = ref }/>
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
// Context
	// Context is designed to share data that can be considered "global"
	// for a tree of React components.

	Provider  // context provider component
		// props:
			value : any  // set context value
	Consumer  // context consumer component
		// props:
			children : render(context) : vnode

	// Ex:
		// some-context.js:
			export const SomeContext = React.createContext({
				val: 'qwe',
				update: (val)=> {},
			});

		// app.js:
			constructor(props) {
				super(props);
				this.state = {
					some: 'qwe',
					update: (val)=> {
						this.setState({
							some: val,
						});
					},
				}
			}

			render() {
				return (
					<SomeContext.Provider value={this.state}>
						<Child/>
					</SomeContext.Provider>
				);
			}

		// child.js:
			render() {
				return (
					<SomeContext.Consumer>
						{(context)=> (
							<button onClick={context.update}>{context.some}</button>
						)}
					</SomeContext.Consumer>
				);
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
						onClick={ this.onClickHideLink }
					>
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
