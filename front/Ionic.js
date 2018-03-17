
// Ionic is a front-end UI framework to build web and mobile apps using
// Angular and Cordova.
// Contains:
	// AngularJS
	// CSS components
	// JS components
	// Cordova plugins
	// Ionic CLI - NodeJS utility for building, running, emulating ionic apps
	// Ionic View - platform for uploading, sharing, testing apps

// version: 1.3.1

// Icons pack: http://ionicons.com

================================
// Basics
{
	// To work with ionic need to install NodeJS and npm first:
		apt-get install nodejs
		apt-get install npm
		ln -s /usr/bin/nodejs /usr/bin/node
		// Set PATH: /usr/share/npm/bin
	
	// Install ionic:
		npm install -g cordova ionic
	
	// Create app:
		ionic start app_dir type
			// where type:
				blank
				tabs
				sidemenu
		cd app_dir
		ionic platform add platform_type
			// where platform_type:
				browser
				android
				ios
				windowsphone
	
	// Build:
		ionic build platform_type
		ionic run platform_type  // requires installed SDK for mobile
	
	// Serve (browser):
		ionic serve  // live reloading browser preview
	
	// To run gulp task before build:
		// add "gulpStartupTasks": ["gulp-task-name"] to "ionic.project" file.
	
	// Project structure:
		hooks/   // scrips that can be triggered during build process
		platforms/  // builded for different platforms
		plugins/    // Cordova plugins
		resources/  // resources like icons and splashscreens
		scss/  // Sass
		www/   // web contents
			css/
			img/
			js/
				app.js
				services.js
				controllers.js
			lib/
			templates/  // html
			index.html
}
================================
// View
{
	// Colors
		light      // white
		stable     // light grey
		positive   // blue
		calm       // light blue
		balanced   // green
		energized  // yellow
		assertive  // red
		royal      // violet
		dark       // black
		
		// Ex:
			<button class="button button-positive">...</button>
			<p class="assertive">...</p>
		
	// Header
		<ion-header-bar>
			.bar-subheader
			
			align-title="center|left|right"
			no-tap-scroll
	
	// Content
		// Scrollable viewport of app
		<ion-content>
			.padding
			.padding-vertical
			.padding-horizontal
			.padding-top
			.padding-right
			.padding-bottom
			.padding-left
			.has-header
			.has-subheader
	
	// Footer
		<ion-footer-bar>
			.bar-subfooter
			
			align-title="center|left|right"
	
	// Grid
		.row
			.row-top
			.row-center
			.row-bottom
			.responsive-sm  // will be stacked when smaller than landscape phone
			.responsive-md  // when smaller than portrait tablet
			.responsive-lg  // when smaller than landscape tablet
		.col
			.col-10|20|25|33|50|67|75|80|90
			.col-offset-10|20|25|33|50|67|75|80|90
			.col-top
			.col-center
			.col-bottom
		
		// Ex:
			<div class="row">
				<div class="col col-33 col-offset-33">...</div>
				<div class="col">...</div>
			</div>
	
	// Icon
		.icon
			.icon-left
			.icon-right
			.ion-<icon_name>
		
		// Ex:
			<button class="button icon-left ion-chevron-left">Back</button>
			
			<div class="bar bar-header">
				<button class="button icon ion-navicon"></button>
				<h1 class="title">Header Buttons</h1>
				<button class="button">Edit</button>
			</div>
	
	// List
		<ion-list>
			.list-inset  // items will have horizontal margins
			
			show-delete
			show-reorder
			can-swipe
		
		<ion-item>
			.item-divider
			.item-icon-left
			.item-icon-right
			.item-avatar
			.item-thumbnail-left
			.item-thumbnail-right
			.item-image
			.item-body
			
			collection-repeat
		
		.item-note
		.badge
		
		<ion-option-button>  // shows by swipe left
		<ion-delete-button>
		<ion-reorder-button>
			on-reorder
		
		// Ex:
			<ion-list>
				<ion-item class="item-avatar">
					<img src="avatar.jpg">
					<h2>Title</h2>
					<p>Text</p>
				</ion-item>
				<ion-item class="item-icon-left" href="#">
					<span class="icon ion-person-stalker"></span>
					With icon and badge
					<span class="badge badge-assertive">0</span>
				</ion-item>
				<ion-item class="item-icon-left" href="/dfsf">
					<span class="icon ion-mic-a"></span>
					With note
					<span class="item-note">
						Note
					</span>
					<ion-option-button>Edit</ion-option-button>
				</ion-item>
			</ion-list>
	
	// Card
		.card
		.item
			.item-text-wrap
			.item-divider  // for card header and footer
		
		// Ex:
			<div class="card">
				<div class="item item-text-wrap">
					Card with item that has wrapping text
				</div>
				<div class="item item-text-wrap">
					Card with item that has wrapping text
				</div>
			</div>
	
	// Form
		<label>
		.item
			.item-input  // form row
			.item-stacked-label  // label text and input will be stacked
			.item-input-inset  // row with margins
			.range
			.item-select
		
		.item-input-wrapper
		.input-label  // label text inside <label>
		
		<ion-toggle>
		<ion-checkbox>
		<ion-radio>
		
		.button
			.button-block  // 100% width
			.button-full   // 100% width without left and right borders
			.button-small
			.button-large
			.button-outline  // transparent and outline style
			.button-clear    // transparent without borders
		.button-bar
		
		// Ex:
			<label class="item item-input item-stacked-label">
				<span class="input-label">Title</span>
				<input type="text" placeholder="Placeholder"/>
			</label>
			
			<div class="item item-input-inset">
				<label class="item-input-wrapper">
					<span class="icon placeholder-icon ion-search"></span>
					<input type="text" placeholder="Search"/>
				</label>
				<button class="button button-clear button-dark">Search</button>
			</div>
			
			<ion-toggle ng-model="val" toggle-class="toggle-dark">Title</ion-toggle>
			<ion-checkbox ng-model="val">Title</ion-checkbox>
			<ion-list>
				<ion-radio ng-model="choice" ng-value="'val1'">Title</ion-radio>
				...
			</ion-list>
			
			<label class="item item-input range">
				<span class="icon ion-volume-low"></span>
				<input type="range" min="0" max="100" value="33"/>
				<span class="icon ion-volume-high"></span>
			</label>
			
			<label class="item item-input item-select">
				<span class="input-label">Title</div>
				<select>
					<option value="val1">Name1</option>
					<option value="val2" selected>Name2</option>
				</select>
			</label>
	
	// Scrollable
		<ion-scroll>  // scrollable container
			direction="y|x|xy"
			locking="false|true"  // locking one direction while scroll another
			paging="false|true"
			on-refresh  // called on pull-to-refresh, triggered by ionRefresher
			on-scroll
			scrollbar-x="true|false"
			scrollbar-y="true|false"
			zooming="false|true"
			min-zoom="0.5"
			max-zoom="3"
	
	// Infinite scroll
		<ion-infinite-scroll>  // trigger function when gets to the bottom
			// of page
			on-infinite  // what to call
			distance="1%"
			spinner="ion-spinner"
			immediate-check="false|true"  // whether to check bounds
				// immediately on load
		
		// Ex:
			<ion-content>
				<ion-list>
					...
				</ion-list>
				
				<ion-infinite-scroll
					on-infinite="loadMore()"
					distance="1%">
				</ion-infinite-scroll>
			</ion-content>
	
	// Slides
		<ion-slides>  // list of slides
			options="{loop: false, effect: 'fade', speed: 500}"
			slider="data.slider"  // instance of Swiper (for events)
		
		<ion-slide-page>  // container for slide content
		
		// Broadcasts events:
			$ionicSlides.sliderInitialized
			$ionicSlides.slideChangeStart
			$ionicSlides.slideChangeEnd
}

================================
// Module
{
	// Angular module depends on "ionic" module:
		angular.module('mySuperApp', ['ionic']).
		// ...
		
}
================================
// Navigation
{
	<ion-nav-view>  // place where state's template will be rendered
		name  // view name
	
	<ion-view>  // container for view content and header info
		view-title  // header
		cache-view="true|false"
		can-swipe-back="true|false"
		hide-back-button="false|true"
		hide-nav-bar="false|true"
		
		// Broadcasts events:
			$ionicView.loaded  // view added to the DOM
			$ionicView.beforeEnter
			$ionicView.enter  // view become active
			$ionicView.afterEnter
			$ionicView.beforeLeave
			$ionicView.leave
			$ionicView.afterLeave
			$ionicView.unloaded  // controller destroyed and view removed
			$ionicParentView.beforeEnter
			$ionicParentView.enter
			$ionicParentView.afterEnter
			$ionicParentView.beforeLeave
			$ionicParentView.leave
			$ionicParentView.afterLeave
	
	<ion-nav-bar>  // topbar that updates as state changes
		align-title="center|left|right"
		no-tap-scroll="false|true"
	
	<ion-nav-back-button>  // to show back button on bar. Define in ion-nav-bar.
		// Shows and hides automatically
	
	<ion-nav-buttons>  // wraps additional bar buttons. Define in ion-view
		// or ion-nav-bar.
		side="primary|secondary|left|right"
	
	
	// Define states
		// $stateProvider service
		// Uses to define states using app.config(['$stateProvider',
			// constructor($stateProvider) {...}])
		
		state(name, options) : this  // define state
			// name can be dot-splitted, "par.sub" - shild state of state "par"
				// child url will be relative
			// options - object:
				url : string
				template : string
				templateUrl : string|func($stateParams)
				controller : string|func()  // name or constructor
				controllerAs : string  // alias
				onEnter : func()
				onExit : func()
				views : object  // e.g. for tab navigation (bind multiple
					// child states to certain view by name)
		
		// State url can contain params
		// Ex:
			/path/{p_name:p_regex}/path
				// p_name - name or param than can be used on $stateParams
					// to retrieve value
				// p_regex - regex to restrict param value
			/path?qp_name1&?qp_name2  /// for query params
	
	// Retrieve url params
		// $stateParams service
		// Provides url params to controller.
		// It's an object that contains all params if they are defined.
	
	// Redirection
		// $urlRouterProvider service
		// Has the responsibility of watching $location. Uses for redirection
		// in collaboration with $stateProvider
		
		when(from, to)  // redirect
			// from, to - source and target urls
		otherwise(to)  // if no one matched
	
	// Manage states
		
		// By state name:
			// $state service
			
			go(statename [, params, options])  // switch to state
				// params - object containing url params
				// options - object:
					location : bool|string  // true to replace url,
						// "replace" - to replace also history item
						// def true
					inherit : bool  // inherit url params from current url
						// def true
					relative : options  // defines which state to be relative
						// from def $state.current
					notify : bool  // broadcast stateChange events
						// def true
			reload()  // refresh current state
			includes(statename [, params]) : bool  // is current is equal or
				// child of statename
			current : options
			
			// link by state name:
				<a ui-sref="statename(params)">...</a>
		
		// Direct by url:
			<a href="#/stateurl/{{paramval}}">...</a>
	
	// History
		// $ionicHistory service
		
		currentHistoryId() : string
		currentView() : object
		currentTitle([val]) : string  // Get|set view title
		currentStateName() : string
		goBack(n)  // go back to n steps, n - negative number
		removeBackView()
		clearHistory()
		viewHistory() : object
		backView() : object
		backTitle() : string
		forwardView() : object
	
	
	// Ex:
		// index.html:
		<body ng-app="starter">
			<!-- The nav bar that will be updated as we navigate -->
			<ion-nav-bar class="bar-positive">
				<ion-nav-back-button></ion-nav-back-button>
			</ion-nav-bar>
			
			<ion-nav-view>
				<!-- where the view template will be rendered -->
			</ion-nav-view>
		</body>
		
		// js/app.js:
		angular.module('starter', ['ionic']).
		config(['$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {
					$stateProvider.
							state('dash', {
								url: '/dash',
								templateUrl: 'templates/dash.html',
								controller: 'DashCtrl'
							}).
							state('chats', {
								url: '/chats',
								templateUrl: 'templates/chats.html',
								controller: 'ChatsCtrl'
							}).
							state('chat-details', {
								url: '/chats/{chatId:[0-9]*',
								templateUrl: 'templates/chat-details.html',
								controller: 'ChatDetailsCtrl'
							});
					// if none of the above states are matched, uses
					// 'otherwise' fallback
					$urlRouterProvider.otherwise('/dash');
				});
		
		// templates/chats.html:
		<ion-view view-title="Chats">
			<ion-content>
				<ion-list>
					<ion-item class="item-remove-animate item-avatar item-icon-right"
						ng-repeat="chat in chats"
						href="#/chats/{{chat.id}}">
						
						<img ng-src="{{chat.face}}">
						<h2>{{chat.name}}</h2>
						<p>{{chat.lastText}}</p>
						<i class="icon ion-chevron-right icon-accessory"></i>
						
						<ion-option-button class="button-assertive"
							ng-click="remove(chat)">Delete</ion-option-button>
					</ion-item>
				</ion-list>
			</ion-content>
		</ion-view>
		
		// js/controllers.js:
		app.controller('ChatDetailsCtrl', ['$scope', '$state', function(
				$scope, $state) {
			$scope.$on("$ionicView.beforeEnter", function(event, data){
				console.log("$stateParams:", data.stateParams);
			});
			
			$state.go('chat-details', {chatId: 1});
		}]);
}
================================
// Tabs
{
	<ion-tabs>
		.tabs-icon-top|right|bottom|left
		.tabs-icon-only
		.tabs-top
		.tabs-striped
		.tabs-background-<color>
		.tabs-color-<color>
	
	<ion-tab>
		title  // tab icon text
		href
		icon
		icon-on
		icon-off
		on-select
		on-deselect
	
	
	// Declare nav-bar and nav-view:
		// index.html:
		<body ng-app="starter">
			<ion-nav-bar class="bar-positive">
				<ion-nav-back-button></ion-nav-back-button>
			</ion-nav-bar>
			<ion-nav-view></ion-nav-view>
		</body>
	
	// Declare tabs:
		// templates/tabs.html:
		<ion-tabs>
			<ion-tab title="Cars" icon="ion-navicon"
				href="#/tab/cars">
				<ion-nav-view name="tab-cars"></ion-nav-view>
			</ion-tab>
			<ion-tab title="Create" icon="ion-plus" 
				href="#/tab/create">
				<ion-nav-view name="tab-create"></ion-nav-view>
			</ion-tab>
		</ion-tabs>
	
	// Declare tab views:
		// templates/tab-cars.html:
		<ion-view view-title="Cars">
			<ion-content class="padding">
				<ion-list>
					<ion-item ng-repeat="car in cars"
						href="#/tab/cars/{{car.vin}}">
						{{car.name}}
					</ion-item>
				</ion-list>
			</ion-content>
		</ion-view>
	
	// Setup states routing:
		// js/app.js:
		angular.module('starter', ['ionic']).
		config(['$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {
					$stateProvider.
							state('tab', {
								url: '/tab',
								abstract: true,
								templateUrl: 'templates/tabs.html'
							}).
							
							state('tab.cars', {
								url: '/cars',
								views: {
									'tab-cars': {
										templateUrl: 'templates/tab-cars.html',
										controller: 'CarsCtrl'
									}
								}
							}).
							state('tab.car-details', {
								url: '/cars/:vin',
								views: {
									'tab-cars': {
										templateUrl: 'templates/tab-car-details.html',
										controller: 'CarDetailsCtrl'
									}
								}
							}).
							
							state('tab.create', {
								url: '/create',
								views: {
									'tab-create': {
										templateUrl: 'templates/tab-create.html',
										controller: 'CreateCtrl'
									}
								}
							});
					
					$urlRouterProvider.otherwise('/tab/cars');
				}]);
}
================================
// Side menu
{
	<ion-side-menus>  // list of side menus (left|right) and contents
		enable-menu-with-back-views="false|true"
	
	<ion-side-menu>  // container for menu
		side="left|right"
		is-enabled="true|false"
		width="275"
		expose-aside-when="large"  // enable menu stay exposed if width >= 768px
	
	<ion-side-menu-content>  // container for content (nav-bar, nav-view)
		drag-content="true|false"  // enable swipe to show menu
		edge-drag-threshold="25"
	
	menu-close  // attribute that closes side menu and resets history stack
	
	<ion-nav-buttons>
		side="left|right"
	<ion-nav-back-button>
	<button>
		toggle-menu="left|right"  // to toggle left|right side menu
	
	
	// Declare main nav-view:
		// index.html:
		<body ng-app="starter">
			<ion-nav-view></ion-nav-view>
		</body>
	
	// Declare side menus:
		// templates/menu.html:
		<ion-side-menus enable-menu-with-back-views="true">
			
			<ion-side-menu-content drag-content="true">
				<ion-nav-bar class="bar-stable">
					<ion-nav-back-button></ion-nav-back-button>
					<ion-nav-buttons side="left">
						<button class="button button-icon button-clear ion-navicon"
							menu-toggle="left"></button>
					</ion-nav-buttons>
				</ion-nav-bar>
				
				<ion-nav-view name="content"></ion-nav-view>
			</ion-side-menu-content>
			
			<ion-side-menu side="left"
				expose-aside-when="large">
				<ion-header-bar class="bar-stable">
					<h1 class="title">Left</h1>
				</ion-header-bar>
				<ion-content>
					<ion-list>
						<ion-item menu-close
							href="#/app/playlists">
							Playlists
						</ion-item>
						<ion-item menu-close
							href="#/app/search">
							Search
						</ion-item>
					</ion-list>
				</ion-content>
			</ion-side-menu>
		</ion-side-menus>
	
	// Declare views:
		// templates/playlists.html:
		<ion-view view-title="Playlists">
			<ion-content>
				<ion-list>
					<ion-item ng-repeat="playlist in playlists"
						href="#/app/playlists/{{playlist.id}}">
						{{playlist.title}}
					</ion-item>
				</ion-list>
			</ion-content>
		</ion-view>
	
	// Setup states rouing:
		// js/app.js:
		angular.module('starter', ['ionic']).
		config(['$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {
					$stateProvider.
							state('app', {
								url: '/app',
								abstract: true,
								templateUrl: 'templates/menu.html',
								controller: 'AppCtrl'
							}).
							
							state('app.playlists', {
								url: '/playlists',
								views: {
									'content': {
										templateUrl: 'templates/playlists.html',
										controller: 'PlaylistsCtrl'
									}
								}
							}).
							state('app.single', {
								url: '/playlists/:playlistId',
								views: {
									'content': {
										templateUrl: 'templates/playlist.html',
										controller: 'PlaylistCtrl'
									}
								}
							}).
							
							state('app.search', {
								url: '/search',
								views: {
									'content': {
										templateUrl: 'templates/search.html'
									}
								}
							});
							
						$urlRouterProvider.otherwise('/app/playlists');
					});
}
================================
// $actionSheet service
{
	// Show context menu.
	
	// Methods:
		show(options) : hideSheet()  // show actionsheet, returns function that
			// need call to close actionsheet
			// options - object:
			{
				buttons: [{
					title: ""
				}, ...],
				buttonClicked: function(index) {
					// callback for buttons,
					// return true to close actionsheet
				},
				title: "",
				cancelText: "",
				cancel: function() {
					// callback for cancel button
				},
				destructiveText: "",
				destructiveButtonClicked: function() {
					// callback for destr button,
					// return true to close actionsheet
				},
				cancelOnStateChange: true
			}
}
================================
// $ionicBackdrop service
{
	// Show a backdrop over the UI. Appears behind popups,
	// loading, and other overlays.
	
	// Methods:
		retain()  // show
		release()  // hide
	
	// Broadcasts events:
		backdrop.shown
		backdrop.hidden
}
================================
// $ionicLoading service
{
	// Show overlay that can be used to indicate activity while blocking
	// user interaction.
	
	// Methods:
		show(options) : promise
			// options - object:
			{
				template: "",  // html content
				templateUrl: "",
				scope: $rootScopeChild,  // scope to be a child of
				noBackdrop: false,
				hideOnStateChange: false,
				delay: 0,  // before show indicator, ms
				duration: 0  // until hide indicator, ms
			}
		hide() : promise
	
	// Ex:
		app.controller('LoadingCtrl', function($scope, $ionicLoading) {
			$scope.show = function() {
				$ionicLoading.show({
					template: 'Loading...'
				});
			};
			$scope.hide = function(){
				$ionicLoading.hide().
						then(function(){
							console.log("The loading indicator is now hidden");
						});
			};
		});
}
================================
// $ionicModal service
{
	// Show content pane that can go over the user’s main view temporarily. 
	
	<ion-modal-view>  // container for modal content (ion-header-bar,
		// ion-content, ...)
	
	// Methods:
		fromTemplate(templStr, options) : ionicModalCtrl
			// options - object:
			{
				scope: $rootScopeChild,
				animation: "slide-in-up",
				focusFirstInput: false,
				backdropClickToClose: true,
				hardwareBackButtonClose: true
			}
		fromTemplateUrl(templUrl, options) : promise
			// promose will be resolved with ionicModalCtrl instance
	
	// ionicModalCtrl methods:
		show() : promise
		hide() : promise
		remove() : promise
		isShown() : bool
	
	// Broadcasts events:
		modal.shown
		modal.hidden
		modal.removed
	
	// Ex:
		<ion-modal-view>
			<ion-header-bar>
				<h1 class="title">Title</h1>
			</ion-header-bar>
			<ion-content>
				<p>Content</p>
			</ion-content>
		</ion-modal-view>
		
		app.controller('MyController', function($scope, $ionicModal) {
			$ionicModal.fromTemplateUrl('my-modal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});
			
			$scope.openModal = function() {
				$scope.modal.show();
			};
			$scope.closeModal = function() {
				$scope.modal.hide();
			};
			
			$scope.$on('$destroy', function() {
				$scope.modal.remove();
			});
		});
}
================================
// $ionicPopover service
{
	// Show view that floats above app's content.
	
	<ion-popover-view>  // container for popover content (ion-header-bar,
		// ion-content, ...)
	
	// Methods:
		fromTemplate(templStr, options) : ionicPopoverCtrl
			// options - object:
			{
				scope: $rootScopeChild,
				focusFirstInput: false,
				backdropClickToClose: true,
				hardwareBackButtonClose: true
			}
		fromTemplateUrl(templUrl, options) : promise
			// promose will be resolved with ionicPopoverCtrl instance
	
	// ionicPopoverCtrl methods:
		show(view|event) : promise
		hide() : promise
		remove() : promise
		isShown() : bool
	
	// Broadcasts events:
		popover.shown
		popover.hidden
		popover.removed
}
================================
// $ionicPopup service
{
	// Show popup (alert, prompt, confirm) that require the user to respond
	// in order to continue.
	
	// Methods:
		show(options) : promise  // custom popup
			// options - object:
			{
				title: "",
				subTitle: "",
				cssClass: "",
				template: "",  // html content
				templateUrl: "",
				scope: null,
				buttons: [{
					text: "",
					type: "button-default",
					onTap: function(e) {
						// e.preventDefault() will prevent closing
					}
				}, ...]
			}
			// returns promise that is resolved when popup is closed
			// has additional close() method
		alert(options) : promise
			// options - object:
			{
				title: "",
				subTitle: "",
				cssClass: "",
				template: "",
				templateUrl: "",
				okText: "OK",
				okType: "button-positive"
			}
		confirm(options) : promise
			// options - object:
			{
				title: "",
				subTitle: "",
				cssClass: "",
				template: "",
				templateUrl: "",
				okText: "OK",
				okType: "button-positive",
				cancelText: "Cancel",
				cancelType: "button-default"
			}
		prompt(options) : promise
			// options - object:
			{
				title: "",
				subTitle: "",
				cssClass: "",
				template: "",
				templateUrl: "",
				okText: "OK",
				okType: "button-positive",
				cancelText: "Cancel",
				cancelType: "button-default",
				inputType: "text",
				inputPlaceholder: "",
				defaultText: "",
				maxLength: null
			}
			// returns promise that is resolved when popup is closed,
			// with argument - value of input (ok) or undefined (cancel)
			// has additional close() method
	
	// Ex:
		app.controller('PopupCtrl', function($scope, $ionicPopup, $timeout) {
			// Trigger on a button click, or some other action
			$scope.showPopup = function() {
				$scope.data = {};
				
				var popup = $ionicPopup.show({
					scope: $scope,
					template: '<input type="password" ng-model="data.wifi">',
					title: 'Enter Wi-Fi Password',
					subTitle: 'Please use normal things',
					buttons: [{
						text: 'Cancel'
					}, {
						text: '<b>Save</b>',
						type: 'button-positive',
						onTap: function(e) {
							if (!$scope.data.wifi) {
								// don't allow the user to close unless he
								// enters wifi password
								e.preventDefault();
							} else {
								return $scope.data.wifi;
							}
						}
					}]
				});
				
				popup.then(function(res) {
					console.log('Tapped!', res);
				});
				
				$timeout(function() {
					popup.close();  //close the popup after 3 seconds
						// for some reason
				}, 3000);
			};
		});
}

================================
// Platform
{
	// $ionicPlatform service
	// Angular abstraction for ionic.Platform
	// Platform-specific callbacks
	
	onHardwareBackButton(callback)
	offHardwareBackButton(callback)
	on(eventtype, callback) : func
		// eventtype - string:
			resume
			pause
			volumedownbutton
			volumeupbutton
			batterylow
			offline
		// returns function for deregistration listener
	ready([callback]) : promise  // trigger a callback once the device is ready
	
}
