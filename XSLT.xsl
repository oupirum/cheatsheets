
// XSLT is a eXtensible Stylesheet Language Transformations.
// It declarative language and uses for transforming XML documents.
// XSLT uses XPath to find XML elements and attributes.

// Declare stylesheet:
// Root element:
	
	<xsl:stylesheet version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	// or:
	<xsl:transform version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	// They are synonymous

// Add XSLT stylesheet to XML file:
	
	<?xml-stylesheet type="text/xsl" href="somestylesheet.xsl"?>


// Example:
	
	// XML:
	<?xml version="1.0" encoding="UTF-8"?>
	<items>
		<item>
			<title attr="1">Some title</title>
			<value>Some value</value>
		</item>
		<item>
			<title attr="2">Some title</title>
			<value>Some value</value>
		</item>
		...
	</items>
	
	// XSLT template:
	<?xml version="1.0" encoding="UTF-8"?>
	<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
		<xsl:template match="/">
			<html>
			<body>
				<xsl:for-each select="items/item[title/@attr&lt;4]">
					<xsl:sort select="title"/>
					<div>Title: <xsl:value-of select="title"/></div>
					<br/>
					<div>Value: <xsl:value-of select="value"/></div>
					<br/>
				</xsl:for-each>
			</body>
			</html>
		</xsl:template>
	</xsl:stylesheet>


<xsl:output/>
	// Attributes:
		method	// Output format: "xml" (default), "html", "text"
		version	// Output lang version
		indent	// Enable/disable indentation: "yes", "no"
		encoding
		media-type	// mimetype
		omit-xml-declaration	// "yes", "no"

<xsl:include/>	// Include external stylesheet
	// Attributes:
		href	// URI

<xsl:template>	// Define rules (like function)
	// Attributes:
		name
		match	  // XPath expression to match nodes. E.g. "/" is a root node.

<xsl:variable/>	// Define variable. To get variable in expr use $var_name.
	// Attributes:
		name
		select

<xsl:param/>	// Define parameter. Same as xsl:variable, but can have default value.
	// Attributes:
		name
		select

<xsl:apply-teplates/>	// Apply mached templates to current node and his subnodes 
	// (e.g. for recursive processing)
	// Attributes:
		select	// XPath to filter subnodes

<xsl:call-template>	// Call template as function. Can contain xsl:with-param elements to 
	// pass arguments.
	// Attributes:
		name	// Name of template

<xsl:with-param/>
	// Attributes:
		name	// Name of xsl:param
		select	// Value to override default param value


<xsl:for-each>	// Looping through nodelist
	// Attributes:
		select

<xsl:sort/>	// Set value to sort by
	// Attributes:
		select	// Expr to select elem or attr value
		order	// "ascending", "descending"
		data-type	// "text", "number", "qname-but-not-ncname"
		case-order	// "upper-first", "lower-first"

<xsl:if>	// Conditional test
	// Attributes:
		test	// Test expression, e.g.: test="node_name&gt;node_value"

<xsl:choose>	// Multiple conditional test
	<xsl:when test="test_expr">...</xsl:when>
	...
	<xsl:otherwise>...</xsl:otherwise>
</xsl:choose>

<xsl:attribute>	// Write attribute
	// Attributes:
		name	// Name for target attribute

<xsl:attribute-set>	// Define set of attributes
	// Attributes:
		name
	// To write attribute-set use xsl:use-attribute-sets=name attribute

<xsl:element>	// Write element
	Attributes:
		name

<xsl:text>	// Write text node
	// Attributes:
		disable-ouput-escaping	// "yes", "no"

<xsl:comment>	// Write comment element

<xsl:fallback>	// Write his content if parent instruction throws error

<xsl:value-of>	// Extract value of selected node and add it to output stream
	// Attributes:
		select
		disable-output-escaping	// "yes", "no"

<xsl:copy>	// Write copy of current element with his attributes (without children)

<xsl:copy-of/>	// Same as copy, but selects element by expression
	// Attributes:
		select

<xsl:number/>	// Print ordinal number of current element
	// Attributes:
		level	// On what level search elements: "single", "multiple", "any"
		count	// Expression to filter


// XPath expression:
	*	   // Any element
	.	   // Current node
	..	  // Parent node
	@attr_name	// Attribute
	@*			// Any attribute
	/		   // Root node
	/node	   // Select node relative to root
	//node	  // Select no matter where it (no relative)
	par_node/sub_node	// Traversing relative to current
	path1 | path2	   // Compute two node-sets
	node()	  // Any node of any kind
	text()	  // Text node
	>, >=, <, <=
	+, -, *, div, mod
	=	// Is equal
	!=	// Is not equal
	or
	and
	
	// Can be filtered by adding [test_expr] criterion
	// E.g.:
		/store/book[1]/title	// First book's title
		/store/book/price[text()]	// Select text from all price nodes
		/store/book[price>35]/price	// Price nodes with price greater than 35
