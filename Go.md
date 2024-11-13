# Golang cheatsheet

### Table of contents:
- [Run & Build](#run-and-build)
- [Dependencies](#deps)
	- [Import](#deps-import)
	- [Install](#deps-install)
	- [Update](#deps-update)
- [Control statements](#control-sts)
	- [for](#control-sts-for)
	- [if/else](#control-sts-if)
	- [switch/case](#control-sts-switch)
- [Operators](#operators)
	- [Precedence](#operators-precedence)
	- [`==` equality](#operators-equality)
- [Variables](#vars)
	- [Define](#vars-define)
	- [Zero value](#vars-zero)
	- [Scope](#vars-scope)
- [Types](#types)
	- [Basic](#types-basic)
	- [Types conversion](#types-conversion)
	- [Type assertion](#types-assertion)
	- [Interface](#types-interface)
	- [Struct](#types-struct)
	- [Generics](#types-generics)
	- [Reflection](#types-reflection)
- [Pointer](#pointer)
	- [Create](#pointer-create)
	- [Access](#pointer-access)
	- [Passing by value vs Pointer](#pointer-vs-value)
- [Function](#function)
	- [Defer](#function-defer)
	- [Method](#method)
- [Error](#error)
	- [Create](#error-create)
	- [Throw](#error-throw)
	- [Catch](#error-catch)
- [Array, Slice](#array-slice)
	- [Create](#slice-create)
	- [Get/set](#slice-get-set)
	- [Append](#slice-append)
	- [Copy](#slice-copy)
- [Map](#map)
	- [Create](#map-create)
	- [Get/set](#map-get-set)
	- [Delete](#map-delete)
- [String](#string)
	- [To string](#to-string)
	- [Package "strings"](#package-strings)
	- [Package "fmt"](#package-fmt)
	- [Package "strconv"](#package-strconv)
- [Math](#math)
	- [Package "math"](#package-math)
	- [Package "math/rand"](#package-math-rand)
- [Async](#async)
	- [Goroutine](#goroutine)
	- [Channel](#channel)
	- [Package "sync"](#package-sync)
		- [`Once`](#sync-once)
		- [`Mutex`](#sync-mutex)
		- [`WaitGroup`](#sync-wait-group)
	- [Package "context"](#package-context)
		- [`Context`](#context)
- [Date, Time](#date-time)
	- [Package "time"](#package-time)
		- [`Time`](#time)
		- [`Duration`](#duration)
		- [`Ticker`](#ticker)
		- [`Timer`](#timer)
- [OS, IO](#os-io)
	- [Package "os"](#package-os)
		- [Env](#os-env)
		- [Manipulate files and dirs](#os-files-dirs)
		- [`File`](#os-file)
		- [`FileInfo`](#os-fileinfo)
	- [`UGO` permissions format](#ugo-permissions)
	- [Package "io"](#package-io)
	- [Package "path"](#package-path)
	- [Package "path/filepath"](#package-path-filepath)
	- [Package "flag"](#package-flag)
- [Testing](#testing)

Further reading:<br/>
* [Effective Go](https://go.dev/doc/effective_go)<br/>
* [Docs](https://go.dev/doc/)<br/>


========================================================================================================================

Workspace structure:
```
bin/   // generated executables
pkg/   // generated packages for libraries
src/
    github.com/user/projectname/
        main.go
        somepackage/.../
            ...
        .../
```
https://go.dev/doc/tutorial/workspaces<br/>
https://pkg.go.dev/cmd/go#hdr-Workspace_maintenance<br/>

---
Create module:
```sh
go mod init <prefix>/<module_name>
```
will create go.mod file for tracking dependencies.

---
Any source file can contain `init` function (both executable and library):
```go
func init() {
}
```
It can be used to set up whatever state is required.<br/>
`init` is called after all the variable declarations in the package have evaluated their initializers, and those are evaluated only after all the imported packages have been initialized.<br/>

---
Function `main` in the "main" package is an entry point for executable.<br/>
Library doesn't have main function.
```go
package main

func main() {
}
```


========================================================================================================================
# Run & Build <a id="run-and-build"></a>

Run:
```sh
go run file.go
```
or
```sh
go run .
```
https://pkg.go.dev/cmd/go#hdr-Compile_and_run_Go_program

---
Make executable binary:
```sh
go build
```

---
Build and install binary into GOBIN dir, so it can be launched by name from anywhere:
```sh
go install
```


========================================================================================================================
# Dependencies <a id="deps"></a>

https://go.dev/doc/modules/managing-dependencies<br/>
https://go.dev/doc/modules/developing

---
### Import <a id="deps-import"></a>

```go
import "module/path"
// or with alias:
import p "module/path"
```

Import by full path, but invoke by declared package name.<br/>
By convention package name is the last element of import path.

---
`import` or `const` statements can be grouped by parentheses:
```go
import (
	"one"
	aliasname "two"
)
```

---
Package member which name starts with a lowercase letter is not available beyond the package.<br/>
Member is public (exported) if name is Uppercase.

Public members accessible from outside by package name:
```go
import "somepackage"

var m = somepackage.Member
somepackage.SomeFunc()
```
but inside the same package they are accessible directly:
```go
package somepackage

var m == Member
SomeFunc()
```

---
### Install <a id="deps-install"></a>

To install third party library:
```sh
go get some_lib_path

// Specific version:
go get some_lib_path@v1.2.3
```
including a remote, e.g. "github.com/user/my_library_"

---
To use local module instead of remote:
```sh
go mod edit -replace example.com/my_module=../my_module
```
https://go.dev/doc/modules/gomod-ref#replace

---
List dependencies and available versions:
```sh
go list -m -u all
```
or specific module:
```sh
go list -m -u example.com/theirmodule
```

---
### Update <a id="deps-update"></a>

```sh
go mod tidy
```
will update `go.mod` file - add missing and remove unused deps.

https://pkg.go.dev/cmd/go#hdr-Add_missing_and_remove_unused_modules

---
To enable auto importing, use `GoImports` instead of `GoFmt`.


========================================================================================================================
# Control statements <a id="control-sts"></a>

## for <a id="control-sts-for"></a>

```go
for i := 0; i < n; i++ {
	// ...
}
```
Variables from init statement are only available in the scope of this `for` block.<br/>

Since v1.22 each iteration has its own copies of init variables.<br/>
E.g.:
```go
var printN func()
for n := 0; n < 9; n++ {
	if n == 2 {
		printN = func() {
			fmt.Println(n)
		}
	}
}
printN()  // will print 2, not 9
```

---
Init and post statements are optional:
```go
for i < n {
	// as `while` cycle
}
```

```go
for {
	// infinite loop
}
```

---
```go
for i, v := range someArray {
	// iterate over array or slice
}

for k, v := range someMap {
	// iterate over map
}
```

---
To break loop:
```
break
```

To break current iteration of loop:
```
contunue
```

---
## if/else <a id="control-sts-if"></a>

```go
if b < c {
	// ...
} else if b < d {
	// ...
} else {
	// ...
}
```

Like `for loop`, can have short init statement:
```go
if i := b; i < c {
	// ...
}
```

Variables from init statement are only accessible in the scope of current `if-else` block.

---
## switch/case <a id="control-sts-switch"></a>

```go
switch os := runtime.GOOS; os {
case "darwin":
	fmt.Println("OS X")
case "freebsd", "openbsd":
	fmt.Println("BSD")
default:
	// plan9, windows, ...
	fmt.Printf("%s\n", os)
}
```
Only the first matched case runs. `break` is not needed.<br/>
Case conditions can be a dynamic expressions.


========================================================================================================================
# Operators <a id="operators"></a>

### Precedence <a id="operators-precedence"></a>

In the order of precedence from hight to low:<br/>
Pistfix:	`()` `[]` `->` `.` `++` `--` <br/>
Unary:		`+` `-` `!` `~` `++` `--` `(type)*` `&` `sizeof` <br/>
Multiplicative:		`*` `/` `%` <br/>
Additive:	`+` `-` <br/>
Shift:		`<<` `>>` <br/>
Relational:		`<` `<=` `>` `>=` <br/>
Equality:		`==` `!=` <br/>
Bitwise AND:		`&` <br/>
Bitwise XOR:		`^` <br/>
Bitwise OR:		`|` <br/>
Logical AND:		`&&` <br/>
Logical OR:		`||` <br/>
Assignment:		`=` `+=` `-=` `*=` `/=` `%=` `>>=` `<<=` `&=` `^=` `|=` <br/>
Comma:		`,` <br/>

Expressions can be grouped by parenthesis to change order of evaluation.

---
Go uses *short circuit evaluation*:
```go
if true && f() { // `f` will never be called
```

---
### `==` equality <a id="operators-equality"></a>

* Pointers: are equal when they both point to the same address.
* Channels: both created by the same call to `make`.
* Structs: all corresponding fields are equal.
* Arrays: all corresponding elements are equal.
* Strings: all corresponding bytes are equal.

Functions, maps and slices are not comparable by `==`.<br/>
Use `bytes.EqualFord` or `reflect.DeepEqual` to compare them.

`Diff` function from `github.com/google/go-cmp/cmp` package can be used to get diff of two objects.


========================================================================================================================
# Variables <a id="vars"></a>

### Define <a id="vars-define"></a>

```go
var name Type
var name Type = value // declare and assign a value

var name = value  // type inference
name := value  // shorthand for declare and assign (available only inside function)
```
```go
const name Type = value
```
Constants can be `rune`, `string`, `bool` or numeric values.

---
Multiple declaration:
```go
var a, b Type
```

---
Multiple assignment:
```go
var zero, one = 1, "str"
var zero, one = SomeFunc(...)
```

To avoid `variable declared and not used` error use blank identifier `_`:
```go
_ = unusedVariable
```

---
Raw string literal:
```go
var noNeedToQuote = `'"\`
```

---
### Zero value <a id="vars-zero"></a>

Variables declared without an explicit initial value are given their zero value:
* `0`				for numeric types
*	`false`		for the boolean type
*	`""`			(the empty string) for strings
*	`nil`			for other types

---
### Scope <a id="vars-scope"></a>

* Block - members declared within a code block, such as `if` statement or function.<br/>
		Accessible whithin that block.<br/>
		Including short declarations from *init* statements of `if`, `for`, `switch`.<br/>
* Package - declared at top level of .go file.<br/>
		Accessible by all files within that package.<br/>
* Public/Global - package-scoped members, which names starts with an uppercase letter.<br/>
		Exported. Can be imported and used by other packages.<br/>

Inner-scoped variable *shadows* the outer variable with the same name.


========================================================================================================================
# Types <a id="types"></a>

## Basic types <a id="types-basic"></a>

```go
bool
string

int, int8, int16, int32, int64
uint, uint8, uint16, uint32, uint64, uintptr
    // When you need an integer value you should use `int` unless you have a specific reason to use a sized or unsigned integer.
float64, float32
	// package "math" operates float64. Prefer `float64` unless you have a specific reason to use float32.

rune   // alias for int32, represents character code
byte    // alias for uint8

complex64, complex128

nil    // zero value for slice, map, channel, interface, func, pointer

any   // alias for empty interface `interface{}`
```


--------------------------------------------------
## Types conversion <a id="types-conversion"></a>

Assignment between items of different type requires an explicit conversion.

```go
Type(value)  // Try to convert a value to type `Type`
```
e.g.:
```go
var floatval = float32(123)
```


--------------------------------------------------------
## Type assertion <a id="types-assertion"></a>

A *type assertion* provides access to an interface value's underlying concrete type.

```go
interfaceValue.(ConcreteType)    // for interface variables
```
e.g.:
```go
var v interface{} = ...
var intval = v.(int)    // panic when `v` is not int
```
```go
var intval, ok = v.(int)  // without error but `intval` will have nil value and `ok == false` when `v` is not int
```

---
*Type switch* permits several type assertions in series:
```go
switch v := value.(type) {    // `type` is keyword here
case int:
	// here `v` is of type `int`
default:
	// here `v` has same type as `value`
}
```


--------------------------------------------------
## Interface <a id="types-interface"></a>

An interface type is defined as a set of method signatures.<br/>
A value of interface type can hold any value that implements those methods.<br/>

---
Define:
```go
type IType interface {
	Method()
	IAnother // Embedded interface
	// ...
}
```

---
Type implements an interface by implementing its methods,<br/>
so an *empty interface* may hold values of any type, e.g.:
```go
func Func(anyType interface{}) {
	// this function accepts any type
}
```

---
Interface values can be thought of as a tuple of a value and a concrete type.<br/>
Calling a method on an interface value executes the method of the same name on its underlying type.<br/>

If the concrete value inside the interface itself is `nil`, the method will be called with a nil receiver.<br/>

Interface value that holds a `nil` concrete value is itself non-nil:
```go
type I interface {
	M()
}
type T struct {
}
func (t *T) M() {
}

var i I  // nil interface
var t *T
i = t  // non-nil interface but nil concrete type

fmt.Printf("(%v, %T)\n", i, i)
      // (<nil>, *main.T)
```


---------------------------------------------------
## Struct <a id="types-struct"></a>

Is a collection of fields.

---
Define:
```go
type Type struct {
	f1 int
	f2 int
	*Another   // Embedded struct
	// ...
}
```

---
Instantiate:
```go
var st = Type {
	f1: 123
}
```
Can be created with a subset of fields.

---
Anonymous struct can be defined and instantiated by single expression, e.g.:
```go
var unnamedStruct = struct{
	f1 int
}{
	f1: 123
}
```

---
Access fields via dot:
```go
st.Another = &another
```

---
Instantiate and get pointer:
```go
var stPtr = &Type { f2: value, Another: &another }
```

---
Instantiate by `new`:
```go
var stPtr = new(Type)
```
It allocates zeroed storage for a new item of type `Type` and returns its address, a value of type `*Type`.


---
### Embedding

*Struct embedding* creates a form of inheritance or composition.<br/>
It gives direct access to embedded struct's fields and methods. Own fields and methods takes precedence.<br/>
E.g.:
```go
type A struct {
	F string
	a string
}
func (a *A) M() {}

type B struct {
	A
	F int
}
func (b *B) M() {}

var b = B{
	F: 1,
	A: A{
		F: "AF",
		a: "a",
	},
}
b.M() // B's method
b.F  // "1", because A.F is hidden by B.F
b.a    // "a", direct access to A's field
b.A.F  // "AF", indirect to A's hidden field
```


-----------------------------------------------------
## Generics <a id="types-generics"></a>

*Type parameters* allows function to accept arguments of multiple types, e.g.:
```go
func GenericF[V int | float64](val V) {
	switch v := any(val).(type) {
	case int:
		fmt.Println("int", v)
	case float64:
		fmt.Println("float", v)
	}
}

GenericF[int](123)
// type argument can be omitted when compiler can infer the type:
GenericF(123)
```

---
Type parameters also applicable to type definitions, e.g.:
```go
type List[T any] struct {
	// Singly-linked list that holds values of any type
	next *List[T]
	val  T
}

var head = List[string]{ val: "A" }
head.next = &List[string]{ val: "B" }
```

---
*Type constraints* can be declared as interface, e.g.:
```go
type Number64 interface {
	int64 | float64
}
```


-------------------------------------------------------
## Reflection <a id="types-reflection"></a>

Package `"reflect"` implements runtime reflection.

Typical use is to take a value with static type `interface{}` and extract its dynamic type information by calling `TypeOf`, which returns a `reflect.Type`.

```go
TypeOf(v any) Type
ValueOf(v any) Value
DeepEqual(a, b any) bool
// etc.
```

```go
Type  // represents type info: name, size, fields, etc.
	.In(i int) Type  // i`th func parameter
	.MethodByName(name string) Method
	.AssignabeTo(t Type) bool
	// etc.

Value  // represents value of variable
	.Set(v Value)
	.Equal(v Value) bool
	.Len() int
	.Cap() int
	.IsNil() bool
	// etc.
```

https://pkg.go.dev/reflect


========================================================================================================================
# Pointer <a id="pointer"></a>

A pointer holds the memory address of a value.

```go
*Type
```
e.g.:
```go
var p *int
```

---
### Create <a id="pointer-create"></a>

Create pointer:
```go
p = &value
```

---
### Access <a id="pointer-access"></a>

Access value by pointer:
```go
*p = newvalue
	// now p value equals newvalue
```
It is a *dereferencing* or *indirecting*.

Indirection for accessing fields and methods of named type is transparent:
```go
var sp = &Struct{}
sp.field = value
	// explicit dereference `(*sp)` is not needed
```

---
### Passing by value vs Pointer <a id="pointer-vs-value"></a>

Everything in Go is passed by value.<br/>
Even pointers assigned the value of the memory address. So they are values too.<br/>
E.g., passing a struct into a function will create a local copy.<br/>

However, there are six types that actually hold pointer values, and using a pointer to these types (i.e., a pointer to a pointer) is not efficient: pointer, slice, map, channel, interface, function.


========================================================================================================================
# Function <a id="function"></a>

```go
func Some(param Type, ...) ReturnType {
	// ...
}
```

---
Function can return multiple values:
```go
func Some(param Type, ...) (RetType, RetType1) {
	// ...
	return zero, one
}
```

Returning values can be named:
```go
func Some(param Type, ...) (named RetType) {
	// ...
	return named
}
```

---
Function is also a value and can be returned, assigned to variable or passed as argument.
```go
var f = func() {
	// ...
}
f()
```

---
Closure:
```go
func parent() func() int {
	var closured = 1;
	return func() int {
		closured++;
		return closured;
	}
}
```

--------------------------------------------
## Defer <a id="function-defer"></a>

`defer` statement inside of a function defers a call until a surrounding function returns.
```go
func() string {
	defer anotherFunc() // will be invoked after some_code
		// even if some_code will panic

	// some_code...
	return res
}
```
Arguments of the deferred call are evaluated immediately.<br/>
Deferred calls are pushed onto stack and executes in LIFO order.<br/>
Useful for some clean-up actions.


--------------------------------------------
## Method <a id="method"></a>

Go does not have classes. However, you can define methods on types.<br/>
Method is a function with a special `receiver` argument.

```go
func (v Type) Abs() ReturnType {
	// v is always a local copy here
}
```

Method can be declared with a receiver whose type is defined in the same package only.

---
Method also can be declared with a pointer receiver:
```go
var s = SomeStruct{}

func (s *SomeStruct) setV(v string) {
	s.v = v  // changes the original `s` struct, not its local copy
}

s.setV("")
// Don't need to create pointer explicitly because of indirection.
// It interprets as `(&s).setV("")`.
```

***
Function with value parameter **must** take a **value** argument.<br/>
Method with value receiver **can** take either **value or pointer** receiver which interprets as `*p` implicitly.


========================================================================================================================
# Error <a id="error"></a>

`Error` is an interface which value are functions often returns as a second value.<br/>
`nil` indicates success.

e.g.:
```go
var i, err = strconv.Atoi("42")
if err != nil {
	fmt.Printf("couldn't convert number: %v\n", err)
	return
}
fmt.Println("Converted integer:", i)
```

---
### Create <a id="error-create"></a>

To create own error type need to implement `Error` interface:
```go
type MyError float32
func (e MyError) Error() string {
	return fmt.Sprint("incorrect value: ", float32(e))
}
```

Or instantiate Error object:
```go
errors.New(err any) errors.Error
```

e.g:
```go
import (
	"errors"
	"fmt"
	"log"
)
func Hello(name string) (string, error) {
	if name == "" {
		err := errors.New("empty name")
		log.Fatal(err)
		return "", err
	}
	message := fmt.Sprintf("Hi, %v. Welcome!", name)
	return message, nil
}
```

-----------------------------------------
## Throw <a id="error-throw"></a>

```go
panic(error any)
```
But all `defer`ed functions will be invoked before return.

---
## Catch <a id="error-catch"></a>

```go
recover() any
```
Calling it in `defer`ed function will capture the value given to `panic` and resume normal execution.

https://go.dev/doc/effective_go#recover


========================================================================================================================
# Array, Slice <a id="array-slice"></a>

https://go.dev/blog/slices-intro

```go
[n]Type   // array of n elements of type `Type`
[]Type   // slice (reference to array range)
```

----------------------------------
### Create <a id="slice-create"></a>

Array (fixed length):
```go
var array [n]Type
```

---
Slice (dynamic size):
```go
var slice = []Type{ val1, ... }  // allocate array of specified values and associated slice
var slice = make([]Type, len) []Type  // allocate a nil-filled array of specified length and return it's slice
```
In fact, slice does not store any data, it just describes a section of an underlying array.

---
Slice of an array:
```go
var slice = array[indexFrom:indexTo]  // points to same array in range of [from, to-1]
```
`from` or `to` bound can be omitted to get *from start* or *to end* of an array.
E.g.:
```go
var tail = []arr{1, 2, 3}[1:]  // 2, 3
```

------------------------------------
### Get/set <a id="slice-get-set"></a>

By index:
```go
array[index] = val
```

---
Size:
```go
len(arr []Type) int // length
cap(arr []Type) int // capacity - length of underlying array
```
`nil` slice has both length and capacity of 0.

-------------------------------------
### Append <a id="slice-append"></a>

```go
append(slice []Type, values ...Type) []Type // append values and return a new slice
```

`append()` does not change the original **slice** but may change the original **underlying array**.<br/>
When capacity is not enough, it allocates a new array using `make()` under the hood.<br/>
Therefore, the new slice **may** refer to a new underlying array after `append`.

---
To append a slice to slice (concat) use `v...` syntax to interpret slice as list of args:
```go
slice1 = append(slice1, slice2...)
```

--------------------------------------
### Copy <a id="slice-copy"></a>

From slice to slice:
```go
copy(dst []Type, src []Type) int
```
The source and destination may overlap.<br/>
It copies only the smaller number of elements when len(src) != len(dst).

---
Array cannot be released by GC while any slice refers it.<br/>
When only a small piece of underlying array is needed, allocate a new array and copy slice to prevent memory leaks:
```go
c := make([]byte, len(slice))
copy(c, slice)
```


========================================================================================================================
# Map <a id="map"></a>

https://go.dev/blog/maps

```go
map[KeyType]ValueType
```

Key can be an integer, float, string, pointer, interface, struct or array.<br/>

---
### Create <a id="map-create"></a>

```go
var m = map[KeyType]ValueType { key: value, ... } // allocate map of specified key-values
var m = make(map[KeyType]ValueType) // allocate empty map
```

---
### Get/set value by key <a id="map-get-set"></a>

```go
m[key] = value
var value = m[key]
var value, isExist = m[key]
```

---
### Delete value <a id="map-delete"></a>

```go
delete(m map, key Type)
```


========================================================================================================================
# String <a id="string"></a>

String is a readonly slice of runes.<br/>
Strings can be concatenated with `+` and `+=` operators.<br/>
Comparable by `<`, `>=`, `==`, `!=` (the underlying bytes will be compared).<br/>
Can be resliced or iterated like a normal slice.<br/>

E.g.:
```go
str := "test"
firstByte := str[0] // 116
substr := str[1:] // "est"
conc := "R" + substr // "Rest"
```

---
Convert from/to bytes:
```go
var cl = []byte(str)
var str = string(bytes)
```

-----------------------------------------
## To string <a id="to-string"></a>

Default string representation:
```go
fmt.Sprintf("%v", obj)
```

---
For a specific representation implement `Stringer` interface:
```go
type Type ...
func (st *Type) String() string {
	return "some custom representation"
}
```

------------------------------------------
## Package "strings" <a id="package-strings"></a>

```go
Contains(str, substr string) bool
Count(str, substr string) int
Index(str, substr string) int
LastIndex(str, substr string) int
HasPrefix(str, prefix string) bool
Compare(a, b string) int
Join(sl []string, separ string) string
Split(str, separator string) string
Replace(str, old, new string, limit int) string
ToUpper(str string) string
Trim(str, cutset string) string

NewReader(str string) *strings.Reader
```

------------------------------------------
## Package "fmt" <a id="package-fmt"></a>

```go
Sprintf(format string, values ...any) string  // Format and return
Printf(format string, values ...any) int, error  // Format and print to stdout.
	// Returns number of bytes written.
Println(values ...any) int, error  // With newline
```

---
Format string examples:
```go
"pointer: %p"
"value: %v"
"in full syntax: %#v"
"type: %T"
"decimal: %d"
"hex: %x"
"string: %s"
"quoted: %q"
```

---
Read stdin:
```go
Scan(a ...any) int, error // Read stdin and put into `a...`.
	// Returns count of space-separated tokens readen.
Scanln(a ...any) int, error  // same but stops at newline
```

-----------------------------------------
## Package "strconv" <a id="package-strconv"></a>

```go
ParseInt(s string, base int, bitSize int) int64, error
	// bitSize: 0, 8, 16, 32, 64 for int, int8, int16, int32, int64 appropriately
ParseFloat(s string, bitSize int) float64, error
ParseBool(s string) bool, error
FormatInt(n int64, base int) string
FormatFloat(n float64, fmt byte, prec int, bitSize int) string
	// fmt: 'f', 'e', 'E'
	// e.g. `strconv.FormatFloat(v, 'f', -1, 32)`
FormatBool(b bool) string
Atoi(s string) int, error // shorthand for `ParseInt(s, 10, 0)`
Itoa(n int) string // shorthand for `FormatInt(int64(n), 10)`
```

========================================================================================================================
# Math <a id="math"></a>

## Package "math" <a id="package-math"></a>

```go
IsNaN(x float64) bool
NaN() float64

Abs(x float64) float64
Ceil(x float64) float64
Floor(x float64) float64

Max(a, b float64) float64
Min(a, b float64) float64

Mod(a, b float64) float64
Pow(a, b float64) float64
Exp(x float64) float64

Log(x float64) float64
Log2(x float64) float64
Cos(rad float64) float64
Sin(rad float64) float64
Tan(rad float64) float64
Sqrt(x float64) float64
Cbrt(x float64) float64
```

---
NaN can not be represented as integer, so:
```go
int(math.NaN())		// 0
float64(math.NaN())		// NaN
```

---
`Min`/`Max` with `NaN` always returns NaN.<br/>
Comparing `NaN` to a number always results in false.<br/>

---
Octal number can be defined by leading `0o`:<br/>
```go
var perm = 0o644  // int 420
```

--------------------------------------
## Package "math/rand" <a id="package-math-rand"></a>

```go
Float32() float32  // [0.0, 1.0)
Float64() float64  // [0.0, 1.0)
Int() int
Intn(n int) int // [0, n)
```


========================================================================================================================
# Async <a id="async"></a>

https://go.dev/doc/effective_go#concurrency

-----------------------------------------
## Goroutine <a id="goroutine"></a>

Goroutine is a lightweight thread.<br/>
Goroutines run in the same address space, so access to shared memory must be synchronized.

---
Run function in a new goroutine:
```go
go someFunc(arg, ...)
```
Arguments will be evaluated in the current thread, not in the new goroutine.


------------------------------------------
## Channel <a id="channel"></a>

Channel is a typed conduit through which values can be sent between goroutines.<br/>
By default, sends and receives block until other side is ready.<br/>
Buffered channel blocks only when empty (blocks receiver) or full (blocks sender).<br/>

```go
chan Type 	// read|write
<-chan Type // read only
chan<- Type // write only
```

---
Create:
```go
var ch = make(chan Type)
var ch = make(chan Type, len) // Buffered
```

Send:
```go
ch<- value
```

Receive:
```go
var v = <-ch
var v, ok = <-ch  // `ok` will be false if channel closed by sender
```

Sender (only sender) can close the channel to signalize that no data will be send anymore:
```go
close(ch)
```
For example, to terminate a `for...range` loop.

---
To receive/send values from/to multiple channels use `select/case`.<br/>
E.g.:
```go
tick := time.Tick(100 * time.Millisecond)
boom := time.After(500 * time.Millisecond)
for {
	select {
	case <-tick:
		fmt.Println("tick.")
	case <-boom:
		fmt.Println("BOOM!")
		return
	default:
		fmt.Println(".")
		time.Sleep(50 * time.Millisecond)
	}
}
```
If `default` not specified, it blocks until one of the channels can read/write.<br/>
It chooses randomly if multiple are ready.<br/>

-------------------------------------
To repeatedly receive available values from the channel use `for...range`.<br/>
```go
for v := range ch {
	// ...
}
```
It will iterate until channel is closed.


--------------------------------------------
## Package "sync" <a id="package-sync"></a>

Provides basic synchronization primitives such as mutual exclusion locks.<br/>
Other than the *Once* and *WaitGroup* types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication.<br/>
Values containing the types defined in this package should not be copied.<br/>
https://pkg.go.dev/sync<br/>

---
### `Once` <a id="sync-once"></a>

To safely invoke a function only once, even if called concurrently multiple times.<br/>

```go
OnceFunc(f func())  func()   // returns a function that invokes f only once
OnceValue[T any](f func() T)  func() T   // the same with returning value
OnceValues[T1, T2 any](f func() (T1, T2))  func() (T1, T2)
```

---
### `Mutex` <a id="sync-mutex"></a>

Mutual exclusion locker.<br/>
To make a code block to be executed in mutual exclusion, <br/>
surround it with calls to `Lock` and `Unlock` methods of `sync.Mutex`.<br/>

```go
var m sync.Mutex
	// no need to initialize, zero value is ready to use
```

Methods:<br/>
`Lock()` will block current goroutine if mutex already locked.<br/>
`Unlock()` will unblock, also from any other goroutine. Throws error if not locked.<br/>

---
### `WaitGroup` <a id="sync-wait-group"></a>

WaitGroup waits for a collection of goroutines to finish.<br/>
When the counter becomes zero, all goroutines blocked on `Wait` are released.<br/>

```go
var wg sync.WaitGroup
```

Methods:
```go
Add(delta int)  // increase/decrease counter
Done()  // decrease counter by 1

Wait()  // blocks until the counter is zero
```

---
E.g.:
```go
import (
	"sync"
)

type Container struct {
	mu       sync.Mutex
	counters map[string]int
}

func (c *Container) inc(name string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.counters[name]++
}

func main() {
	c := Container{
		counters: map[string]int{"a": 0, "b": 0},
	}
	var wg sync.WaitGroup

	doIncrement := func(name string, n int) {
		for i := 0; i < n; i++ {
			c.inc(name)
		}
		wg.Done()
	}

	wg.Add(3)
	go doIncrement("a", 10000)
	go doIncrement("a", 10000)
	go doIncrement("b", 10000)

	wg.Wait()
	fmt.Println(c.counters)
}
```


---------------------------------------------
## Package "context" <a id="package-context"></a>

Context allows to execute goroutines in some *context*.<br/>
For carrying deadlines, cancelation signals, and other task-scoped values.<br/>
https://pkg.go.dev/context<br/>

Functions:
```go
Background()  Context  // create an empty context
	// Should be used at top level
TODO()  Context  // empty context too
	// Should be used when it's unclear which Context to use or it is not yet available

WithValue(parent Context, key, val any)   Context  // create a copy of parent in which the value associated with `key` is `val`
	// The `key` must be comparable and should not be of built-in type to avoid collisions between packages

WithCancel(parent Context)   Context, CancelFunc  // copy of parent with a new Done channel,
	// which is closed when the CancelFunc is called or when the parent context's Done channel is closed (which first)
WithCancelCause(parent Context)   Context, CancelCauseFunc  // same but cancelation func accepts an error,
	// which can be retrieved by `Cause(ctx)`

WithDeadline(parent Context, d time.Time)   Context, CancelFunc  // same with a timeout
WithTimeout(parent Context, d time.Duration)   Context, CancelFunc  // same with a duration

Cause(ctx Context)  // returns a cause of the ctx cancelation,
	// nil if not yet canceled
```

### `Context` <a id="context"></a>

Methods:
```go
Value(key any) any  // returns the value associated with this context for `key`
	// nil if no value is assotiated

Done() <-chan  // returns the channel which is closed when context or its parent is closed
Err() error  // error explaining why this context is closed:
	// `Canceled` if the context was canceled, `DeadlineExceeded` if the context's deadline passed,
	// `nil` if not yet closed
Deadline() time.Time, ok bool  // time of deadline
	// ok == false if no deadline is set
```

---
E.g., timeout:
```go
import (
	"context"
	"time"
	"math/rand"
)

func main () {
	var result = make(chan string)
	var ctx, cancel = context.WithTimeout(context.Background(), 5 * time.Second)
 	
	defer cancel()
	
	go doLongOperation(result)
	
	select {
	case <- ctx.Done():
		fmt.Println("Timeout reached")
	case r := <- result:
		fmt.Println(r)
	}
}

func doLongOperation(result chan string) {
	time.Sleep(time.Duration(rand.Intn(10)) * time.Second)
	result <- "Completed"
}
```

E.g., cancelable request:
```go
import (
	"context"
	"net/http"
)

func main() {
	var ctx, cancel = context.WithCancelCause(context.Background())
	
	go doRequest(ctx, url, response)
	// ...
	cancel(errors.New("operation is canceled"))
}

func doRequest(ctx context.Context, url string, ch chan Response) {
	var req, err = http.NewRequestWithContext(
		ctx,
		"GET",
		url,
		nil,
	)
	if err != nil {
		fmt.Println("Error creating request:", err)
		ch <- Response{ Url: url, Status: "Failed", Err: err }
	}

	res, err := http.DefaultClient.Do(req)

	if err != nil || res.StatusCode != 200 {
		var status = "Failed"
		if ctx.Err() == context.Canceled {
			status = "Canceled"
		}
		ch <- Response{ Url: url, Status: status, Err: err }
	} else {
		ch <- Response{ Url: url, Status: "OK" }
	}
}
```

E.g., nesting a value:
```go
type CtxKey string

ctxRu := context.WithValue(ctx, CtxKey("lang"), "ru")
ctxCounter := context.WithValue(ctxRu, CtxKey("counter"), 2)

ctxRu.Value(CtxKey("lang"))  // ru
ctxRu.Value(CtxKey("counter"))  // nil
ctxCounter.Value(CtxKey("lang"))  // ru
ctxCounter.Value(CtxKey("counter"))  // 2
```


========================================================================================================================
# Date, Time <a id="date-time"></a>

## Package "time" <a id="package-time"></a>

Constants:
```go
Nanosecond
Hour
Wednesday
April
RFC3339  // layout for ISO 8601 datetime format "2006-01-02T15:04:05Z07:00"
// etc.
```

Functions:
```go
Now() Time
Date(year int, month Month, day, hour, min, sec, nsec int, loc *Location) Time
Since(t Time) Duration
Unix(sec int64) Time

ParseDuration(str string) Duration, error // e.g. "300ms", "-1.5h", "2h45m"
LoadLocation(name string) *Location, error // e.g. "", "UTC", "Europe/Moscow"

Sleep(delay Duration)  // pause current goroutine for delay
After(delay Duration) <-chan Time // message to channel will be sent after delay

AfterFunc(delay Duration, f func()) *Timer  // run func after delay
	// func will be invoked in a new goroutine.

NewTicker(interval Duration)  *Ticker
NewTimer(d Duration)  *Timer
```

----------------------------------
### `Time` <a id="time"></a>

Represents an instant in time with nanosecond precision.

Methods:
```go
Year() int
Clock() int, int, int  // hours, minues, seconds
Unix() int64
UnixMilli() int64
Add(d Duration) Time
// etc.

Format(layout string) string
	// `layout` is a representation of the time stamp
	// "Jan 2 15:04:05 2006 MST"
	// An easy way to remember this value is that it holds, when presented in this order, the values:
	//	1   2  3  4  5    6  -7
```

-----------------------------------
### `Duration` <a id="duration"></a>

Built-in type for setting the time amount.

Methods:
```go
Abs() Duration  // unsigned duration
Truncate(m Duration) Duration  // round toward zero to a multiple of m
String() string // e.g. "72h3m0.5s"
Hours() float64
Nanoseconds() float64
// etc.
```

-----------------------------------
### `Ticker` <a id="ticker"></a>

Provides a channel that delivers `Time` *ticks*.

```go
C <-chan Time
```

Methods:
```go
Reset(d Duration)
Stop()
```

-----------------------------------
### `Timer` <a id="timer"></a>

Provides a channel that deliver `Time` once after dalay.

```go
C <-chan Time
```

Methods:
```go
Reset(d Duration) bool
Stop() bool
// returns false if already stopped or expired
```


========================================================================================================================
# OS, IO <a id="os-io"></a>

## Package "os" <a id="package-os"></a>

Stop program execution:
```go
Exit(code int)
```

---
Std in/out:
```go
Stdin *File
Stdout *File
```

---
### Env <a id="os-env"></a>

```go
Getenv(key string) string, error
Setenv(key, value string) error
Unsetenv(key string) error

Getwd() path string, e error // get current working directory
Chdir(path string) error
```

------------------------------------------------------
### Manipulate files and directories <a id="os-files-dirs"></a>

```go
Mkdir(path string, perm FileMode)    error
MkdirAll(path string, mode FileMode)    error

Rename(oldpath, newpath string)    error
Remove(path string)    error
RemoveAll(path string)    error

Create(path string)    *File, error  // if the file already exists, it is truncated
	// Assigns `644` permissions.
Open(path string)    *File, error   // readonly
OpenFile(path string, flag int, perm FileMode)    *File, error

ReadDir(path string)    []os.DirInfo, error
ReadFile(path string)    []byte, error
WriteFile(path string, data []byte, perm os.FileMode)    error

// where `flag` is a bitmask of:
O_CREATE
O_APPEND
O_TRUNC
O_RDONLY
O_WRONLY
O_RDWR
```

E.g.:
```go
var _, err = os.OpenFile("name", os.O_RDWR|os.O_CREATE, 0o644)
	// Will create file if does not exist and
	// open for reading or writing.
```

-------------------------------------------------------
### `File` <a id="os-file"></a>

```go
Close() error
Chmod(mode FileMode) error
Name() string   	// full path
Stat()    FileInfo, error
Readdir(limit int)    []FileInfo, error
Readdirnames(limit int)    []string, error

Read(buf []byte)    int, error
ReadAt(buf []byte, offset int64)    int, error

Write(data []byte)    int, error
WriteAt(data []byte, offset int64)    int, error

WriteString(str string)    int, error

// they are returns n readen/written bytes
```

### `FileInfo` <a id="os-fileinfo"></a>

```go
Name() string 	// basename
Size() int64
IsDir() bool
Mode() FileMode
ModeTime() time.Time
```


------------------------------------------------------
### `UGO` permissions format <a id="ugo-permissions"></a>

User, Group, Others
```
	U - number 0-7 - permissions for owner
	G - number 0-7 - permissions for group
	O - number 0-7 - permissions for others
		where:
			0 - forbidden
			4 - read
			5 - read and execute
			6 - read and write
			7 - read (4) + write (2) + execute (1)
```

E.g.:
```go
var mode = os.FileMode(0o755)
	// if directory: owner can list and create files/subdirs, anyone can list;
	// if file: owner can read, write and execute, anyone can read and execute;

```


--------------------------------------------
## Package "io" <a id="package-io"></a>

Reader:
```go
type Reader interface {
	Read(buf []byte) (n int, e error)
	// Populates data slice to `buf` and returns number of readen bytes
	// with error (`io.EOF` on end of file).
}
```

Writer:
```go
type Writer interface {
	Write(data []byte) (n int, e error)
}
```

Standart library contains many implementations of `Reader` and `Writer` for network connections, files, ciphers, etc.

---
#### Functions
```go
Copy(dst Writer, src Reader)    int64, error
CopyBuffer(dst Writer, src Reader, buf []byte)    int64, error // copy through buffer
CopyN(dst Writer, src Reader, n int64)    int64, error // copy n bytes

ReadFull(r Reader, buf []byte)    int, error  // read exactly len(buf) bytes
ReadAll(r io.Reader)    []byte, error   // read until EOF
WriteString(w Writer, s string)    int, error

// returns n readen/written bytes
```

----------------------------------------------
## Package "path" <a id="package-path"></a>

For paths separated by forward slashes, such as the paths in URLs.

```go
Base(path string)    string // get last element of path
Clean(path string)    string // get shorter equivalent
Dir(path string)    string
Ext(path string)    string
IsAbs(path string)    bool
Join(patrs ...string)    string
Split(path string)    dir, filename string
```


-----------------------------------
## Package "path/filepath" <a id="package-path-filepath"></a>

For filename paths in a way compatible with the target operating system-defined file paths.

```go
Base(path string)    string // get last element of path
Clean(path string)    string // shorter equivalent
Abs(path string)    string, error // absolute path
IsAbs(path string)    bool
Rel(basepath, targpath string)    string, error
Dir(path string)    string
Ext(path string)    string
Join(parts ...string)    string
Split(path string)    dir, filename string

EvalSymlinks(path string)    string, error  // resolve symlinks into real path

Walk(path string, func(path string, fi FileInfo, e error) error) // recursively walk on dir contents
```


-------------------------------------------
## Package "flag" <a id="package-flag"></a>

For parsing command line flags.

```go
Int(name string, def int, descr string)    *int
Bool(name string, def bool, descr string)    *bool
Float64(name string, def float64, descr string)    *float64
String(name string, def string, descr string)    *string

Set(name, value string)    error

Parse()
Parsed() bool
```

E.g.:
```go
var num = flag.Int("num", 0, "Some num")
flag.Parse()
fmt.Println("-num value:", *num)
```


========================================================================================================================
# Testing <a id="testing"></a>

To test function `SomeFunc(...)` from `file.go` need to create function `TestSomeFunc(t *testing.T)` in `file_test.go`.<br/>
When test failed need to invoke `t.Error`, `t.Fatal`, `tFatalf`, etc. from this test function to indicate failure.

```go
t.Fail()  // Mark test failed but continues execution
t.FailNow()  // Mark failed and call GoExit

t.Fatal(args ...any)  // Equivalent to Log and FailNow
t.Fatalf(format string, args ...any)  // same but with format

t.Error(args ...any)  // Equivalent to Log and Fail
```

---
Example:
```go
package abc
import (
	"regexp"
	"testing"
)
func TestAbc(t *testing.T) {
	v := GetAbc()
	r, err := regexp.Compile(`\babc\b`)
	if !r.MatchString(v) || err != nil {
		t.Fatal(v, err)
	}
}
```

----
Run tests:
```sh
go test
```
will execute Test* functions in *_test.go files.<br/>
`-v`   - flag for verbose output.
