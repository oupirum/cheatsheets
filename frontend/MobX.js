// MobX - state manager with functional reactive programming paradigm.
// version 5.8.0

// The philosophy behind MobX is very simple:
// Anything that can be derived from the application state,
// should be derived. Automatically.

//  Events
//     ↓
//  [ Actions ] ← ----- ← --•
//     ↓ Modify             |
//  [ State ]               ↑
//     ↓ Updates            | Events invoke
//  [ Computed values ]     ↑
//     ↓ Trigger            |
//  [ Reactions ] → --- → --•

// Core concepts:
	// Observable state
	// Computed values
		// Value that will be derived automatically when relevant data
		// is modified.
	// Reactions
		// Like a Computed but produces side effect instead of new value.
	// Actions
		// Changing the state.

	// MobX reacts to any existing observable property that is read during
	// the execution of a tracked function.
	// MobX tracks property access, not values.

================================================================================
Core API =======================================================================

observable(value) : value
observable.object(value) : value
observable.array(value) : value
observable.map(value) : value
	// Observable objects do not detect or react to property assignments
	// that weren't declared observable before.
	// So use observable.map, then add new properties using .set(key, value)
observable.box(value) : value
@observable
@observable.deep  // default
@observable.ref  // no observable conversion, just create reference
@observalbe.shallow  // for collections. Makes collection observable
	// but not values in collection.

	// Clone and convert into it's observable counterpart.
	// Value can be primitive, reference, object, array.
	// Decorator is same as wrapping value in observable(value) function call
	// and assigning to given property.

computed(expression() : value)
@computed
	// Create a derived property.
	// Computed value - value that can be derived from existing observable state
	// or other computed values.

action(changeState()): changeState()
@action
@action.bound  // Automatically bind context.
	// Create an action.
	// Wraps given action function in transaction.
	// Transaction - is batch of MobX work.
	// So action's state changes and all relative reactions will be performed
	// in one transaction.

autorun(sideEfect(reaction) [, options]) : dispose()
	// Like a bridge from reactive to imperative code.
	// Runs once immediately and then again each time one of its
	// dependencies changes.
	// options properties:
		delay : number  // ms
		name : string
		onError : handler()
	// reaction argument has dispose() method.

reaction(tracker() : data, sideEffect(data, reaction) [, options]) : dispose()
	// Variation of autorun with more fine grained control on which observables
	// will be tracked.
	// options properties:
		fireImmediately : boolean  // default: false
		delay : number  // ms
		name : string
		equals : comparerFn  // default: comparer.default

when(predicate() : boolean, sideEffect() [, options]) : cancel()
	// Will invoke sideEffect when predicate returned true,
	// but only once.
	// options properties:
		name : string
		onError : handler(err)
		timeout : number  // ms. Timeout after which onError will be triggered.

================================================================================
Utils ==========================================================================

runInAction(changeState())
	// Just syntactic sugar for action(someFn)().

flow(generatorFn) : flow() : CancellablePromise
	// Wraps generator in flow.
	// Flow does not needs for actions
	// Flow can be cancelled.

fromPromise(promise) : promiseWithState
	// Wrap promise in promise with additional observable properties:
		state : 'pending'|'fulfilled'|'rejected'
		value : any  // value that was resolved|rejected

extendObservable(target, newProps)
	// Introduce new observable properties on the target observable object.

toJS(observable) : object
	// Recursively converts an observable object to a javascript structure.


================================================================================
mobx-react package =============================================================

observer(component) : component
@observer
	// Turn React component into reactive.
	// Wraps render function in autorun.
	// Available in mobx-react package.

Provider
	// React context provider to pass stores to child components.
	// stores

inject(storeNames) : wrap(component) : component
@inject(storeNames)
@inject(mapStoresToProps(stores) : propsToInject)
	// Connect provider stores to the React component.
	// Wraps component in HOC.
	// Injected stores|props fill be available as plain component's props.


================================================================================
Example ========================================================================

// stores/root-store.js
export class RootStore {
	constructor() {
		this.userStore = new UserStore(this)
		this.todoStore = new TodoStore(this)
	}
}

export default new RootStore();

// stores/user-store.js
export class UserStore {
	constructor(rootStore) {
		this.rootStore = rootStore
	}

	getTodos(user) {
		return this.rootStore.todoStore.todos.filter(todo=> todo.author === user)
	}
}

// stores/todo-store.js
import {observable, computed} from 'mobx';

export class TodoStore {
	@observable todos = []

	constructor(rootStore) {
		this.rootStore = rootStore
	}

	@computed
	get unfinishedTodoCount() {
		return this.todos.filter(todo=> !todo.finished).length;
	}
}

// app.jsx
import {Provider} from 'mobx-react';
import rootStore from './stores/root-store';

export class App extends React.Component {
	render() {
		return (
			<Provider {...rootStore}>
		)
	}
}

// components/todos-counter.jsx
import {inject, observer} from 'mobx-react';

@inject((rootStore)=> ({
	todoStore: rootStore.todoStore,
}))
@observer
export class TodosCounter extends React.Component {
	render() {
		return (
			<span>Amount of todos: {this.props.todoStore.unfinishedTodoCount}<span>
		)
	}
}
