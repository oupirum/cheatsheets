
// CDN:
	//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js

================================
// JQuery
	// JQuery - object that represents list of elements
	
	$(selec) : JQuery  // Create new JQuery. selec - selector, html-string
		// or native DOM element
	
	.length
	[index]  // Get native element by index

// Basic methods of JQuery list
{
	sub() : JQuery  // Copy list
	add(elem)  // Add new item to list.
		// elem - selector, html, element or JQuery
	slice(start [, end]) : JQuery  // Get sublist
	filter(selector) : JQuery  // Get list by matching selector
	has(selector) : JQuery  // by matching selector recursively
	first() : JQuery  // Get first element
	last() : JQuery
	eq(index) : JQuery  // Get element by index
	get(index) : Element  // Get native element by index
	
	each(callb(index, element))  // Iterate over list
		// element - native element
		// in callback this == element
		// To stop the loop return false from callback.
}

// Most of methods below applies for each item in JQuery list (implicit
// iteration).

================================
// Elements
{
	show()
	hide()
	
	after(elem)  // Append elem after each item.
		// elem - html, element or JQuery
	before(elem)
	
	append(elem)  // Append elem as last child.
		// elem - html, element, JQuery or string
	prepend(elem)  // as first child
	appendTo(parent)  // Append this as last child of parent.
		// parent - html, element or JQuery
	insertAfter(elem)  // Append this after elem
	insertBefore(elem)
	remove()
	
	children([selector]) : JQuery  // Get all child or select by selector
	parent([selector]) : JQuery
	find(selector) : JQuery  // Like children(selec), but travels to
		// multiple levels down the tree
	next([selector]) : JQuery  // Get nextSibling
	prev([selector]) : JQuery
	contents() : JQuery  // Get all contents (includes text nodes)
	clone([withEvents]) : JQuery  // Deep copy.
		// withEvents - to copy with all data and events (default: false).
}
================================
// Properies
{
	html([html]) : string  // Get|set html contents
	text([text]) : string  // Get|set contents as plain text
	
	css(name [, value]) : string  // Get|set style
	hasClass(cls) : bool
	addClass(cls)
	removeClass([cls])  // Remove all or one specified class
	
	width() : number  // Get width without paddings
	innerWidth() : number  // With paddings
	outerWidth([inclMargin]) : number  // With borders.
		// If set inclMargin to true - with margins
	
	offset([pos]) : object  // Get|set position relative to document.
		// pos - object like: {left: int, top: int}
	scrollLeft([value]) : number  // Get|set scroll
	
	
	attr(name [, value]) : string  // Get|set html attribute
	prop(name [, value]) : any  // Get|set dom property
	val([value]) : string  // Get|set value of form element
}
================================
// Events
{
	bind(event, handler)  // Set event listener. event - type of event,
		// eg, "click", "mouseup"
	unbind(event [, handler])  // Remove. If handler not specified
		// all handlers of this event type will be removed
}
================================
// Animation
{
	animate(props, duration, easing, onsuccess)
		// props - object contains pairs css-properties and values,
		// easing - animation type (string), default "swing"
	
	// Ex:
		list.animate({"width": "100px", "height": "+100px"}, 1000, "linear",
				function() {
					console.log("complete");
				});
	
	show([duration, oncomplete])
	hide([duration, oncomplete])
}
================================
// Callbacks
{
	$.Callbacks([flag])  // Create new Callbacks list
		// flag - string:
			once  // ensures callbacks can be fired once
			memory  // call new added callbacks with remembered values
			unique  // no duplicates in list
			stopOnFalse  // interrupts callings when a callback returns false
	
	add(callb)
	remove(callb)  // Remove callback from list
	disable()  // Disable all
	disabled() : bool
	empty()  // Remove all
	fire(args...)  // Invoke all callbacks
	fireWith(context, args...)
}

================================
// Ajax
{
	$.ajax(url [, config]) : jqXHR  // Perform AJAX request
		// config - object:
			async : bool
			crossDomain : bool
			timeout : number  // ms
			username : string
			password : string
			contentType : string|bool  // Mime (set false for FormData)
			headers : object
			method : string
			data : string|array|object
			processData : bool  // Enable|disable auto transforming data.
				// Default true
			dataType : string  // "text", "xml", "json", "script", "html"
			success : func(res, status, jqXHR)
				// status - "success", "notmodified", "nocontent",
				// "error", "timeout", "abort", "parsererror"
			error : func(jqXHR, status, err)
			complete : func(jqXHR, status)  // Invokes after success or error
			statusCode : object  // Callbacks for certain response codes
			isLocal : bool
			cache : bool
			context : object  // Context for callbacks
		
		// Returned object has methods:
			then(func(res, status, jqXHR), func(jqXHR, status, err)) : Promise
			done(func(res, status, jqXHR))
			fail(func(jqXHR, status, err))
			always(func(jqXHR, status))
}
