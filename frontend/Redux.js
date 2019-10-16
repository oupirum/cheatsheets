// Redux - application state container.

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
	connect([mapStateToProps(rootState, ownProps) : obj]
			[, mapDispatchToProps(dispatch, ownProps) : obj]
			[, mergeProps(stateProps, dispatchProps, ownProps) : props]
			) : container
		// create container - React component connected to Redux store
		// mapStateToProps - map store properties to object
			// that will be merged into props.
			// Invoked on each store update.
		// mapDispatchToProps - map action creators to object
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

	// components/app.jsx:
		import React from 'react';

		export default class App extends React.Component {

			render() {
				return (
					<div onClick={ this.props.onClick }>
						Name: { this.props.name }
						<br/>
						<input type="text" ref={ (ref)=> this.newName = ref }/>
						<button onClick={ this.onClickSetName.bind(this) }>Submit</button>
					</div>
				);
			}

			onClickSetName(ev) {
				ev.stopPropagation();
				this.props.onClickSetName(this.newName.value);
			}
		};
