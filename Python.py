
# version 3.5

================================================================================
Basics =========================================================================
================================================================================

    # Python is interpreted, dynamic language.
    # Supports object-oriented style.
    # Can be used in interactive mode.

    # Python doesnt use curly braces for code blocks. It uses
    # tabs|spaces indentation.
    # Doesnt need a semicolon on line end. But semicolon uses to separate
    # several statements in one line.
    # One statement can be splitted to multiple lines by adding "\" symbol
    # at each line end.


    # To make script file executable:
        # add shebang at first line:
            #!/usr/bin/env python3
        # set executable permission for file

    ================================
    Modules

        # Import module:
        import package1, package2.module2, ...
        from package import module
        from package.module import member1, member2

        # Reimport module:
        reload(module_name)

        # To make subdir to be a package need to put empty "__init__.py" file
        # to this dir.
        # This __init__ file also can contain some initialization code.

        # src/
        #    __init__.py
        #    main.py
        #    ...
        #    package/
        #        __init__.py
        #        file1.py
        #        ...
        #        sub/
        #            __init__.py
        #            file2.py
        #            ...

        # So, in main.py it can be imported:
        #   from src.package import file1;
        #   from src.package.sub import file2;
        #   from src.package.file1 import SomeFunc;

    # dependencies
        # specify module's dependencies in requirements.txt and
        # use pip install -r requirements.txt to install them.

    ================================
    Variables

        # Assignment
            name = "public variable"
            _name = "private variable"
            a, b, c = 1, 2, "c"  # multiple assignment
            a, b = (one, two)  # destructuring

        # Delete variable
            del name

        # Check identity
            a is b
            a is not b

        dir([obj]) : list  # get list of names of variables in current scope
            # or attributes of given object

        globals(): dict  # get dict of global variables

    ================================
    Types

        # Mutable objects passes by reference, primitives - by value.

        bool   # True, False
            # in logical context any non-zero and non-empty value
            # interpretes as True
        int
        float
        complex
        str
        list
        tuple
        set
        dict
        None  # null value

        # Get type:
        type(obj) : type  # "<class 'typeName'>"

        # All types inherited from object.

        Type conversion:

            int(x, base)
            hex(x)
            oct(x)
            float(x)
            complex(x, imag)
            str(obj, encoding="utf-8")
            bytes(obj [, encoding])
            list(iterable)
            tuple(iterable)
            set(iterable)
            dict(iterable)

    ================================
    Operators

        **  # power

        ~

        +a, -a
        *, /
        %  # modulus
        //  # integer division
        +, -

        >>, <<

        &, ^, |

        <=, <, >, >=
        ==, !=

        =

        is, is not
        in, not in

        not
        and
        or

    ================================
    Control statements

        if expr:
            # code

        if (expr):
            # code
        elif expr:
            # code
        else:
            #code

        valOnTrue if expr else valOnFalse  # ternar operator

        while expr:
            # code

        for item in iterable:
            # code

        break  # to break loop
        continue  # to break current iteration of loop

        pass  # empty statement, does nothing (e.g. for stubs)

    ================================
    Functions

        # Define:
        def func(arg1, arg2 = defVal, *args, **kwargs):
            "optional documentation string"
            val1 = args[0]  # args is a tuple
            val2 = kwargs[key]  # kwargs is a dict
            ...

            def nestedFunc():
                nonlocal arg1  # to access parent func scope
                global globVar  # to access global scope
                ...

            return expr

        # Call:
        func("a")
        func("a", "b")
        func("a", "b", 1, 2, 3)

        # Get reference:
        f = func
        f("a")

    Lambda
        # Lambda contains only one expression

        lmb = lambda a, b: a + b  # returns automatically

    ================================
    OOP

        isinstance(obj, type) : bool
        issubclass(sub_type, super_type) : bool

        Type attributes:

            __doc__ : str  # documentation string
            __module__ : str  # module name (path)
            __name__ : str  # class name when imported
                # "__main__" when called from command line
            __bases__ : tuple  # tuple of parent types

        Builtin methods that can be overriden:

            __init__(self [, *args])  # constructor
                # Typename(*args)
            __del__(self)  # destructor
                # del obj
            __repr__(self) : str  # "official" string representation
                # repr(obj)
            __str__(self) : str  # "informal" string representation
                # str(obj)
            __bytes__(self) : bytes
                # bytes(obj)
            __lt__(self, other) : bool  # "rich comparison" methods
            __le__(self, other) : bool
            __eq__(self, other) : bool
            __ne__(self, other) : bool
            __gt__(self, other) : bool
            __ge__(self, other) : bool


        class Parent:
            "optional documentation string " \
            "blah blah"

            staticF = "static field"

            def __init__(self, f):
                # constructor
                print("Parent constructor")
                self.f = f

            def setF(self, f):
                print("Parent.setF", f)
                self.f = f

            def getF(self):
                return self.f

            @classmethod
            def staticMethod(cls, stf):
                # @classmethod - with required first argument
                # @staticmethod - can have 0 arguments
                print("staticMethod", stf)
                cls.staticF = stf

            def __del__(self):
                # destructor
                print(self.__class__, " destroyed")


        class Child (Parent):

            __privF = "private field"

            def __init__(self):
                print("Child constructor")
                super().__init__("child")

            def setF(self, f):
                print("Child.setF", f)
                self.f = f

            def __str__(self):
                return "Child (f='%s')" % (self.f)

            def callParent(self):
                Parent.setF(self, "f")


        p = Parent("parent")

        print(Parent.staticF)
        Parent.staticMethod("f");
        p.staticMethod("f2")

        c = Child()
        print(c.getF())
        c.setF("child2")

    ================================
    Debug
        # import pdb

        pdb.run(statement [, globals][, locals])  # exec statement in
            # interactive debugger
        pdb.runcall(func [, *args]) : obj  # call function in debugger

        pdb.set_trace()  # enter debugger at curr stack frame
        pdb.pm()  # enter post-mortem debugging (sys.last_traceback)
        pdb.post_mortem([traceback])  # using given traceback or currently
            # handled exception

        # commands:
            p  # print
            pp  # pretty print
            n  # step to next line
            s  # step into
            c  # continue
            q  # exit

================================================================================
Environment ====================================================================
================================================================================

    Exit program:

        sys.exit()

    Environment variables:

        os.getenv(key [, defVal]) : str

    ================================
    Command line arguments
        # import sys

        sys.argv : list  # list of arguments [scriptname, arg1, arg2, ...]

    getopt  # To parse commang line arguments
        # import getopt

        getopt.getopt(argv, opts [, longopts]) : tuple
            # argv - command line arguments without first (scriptname),
                # e.g. sys.argv[1:]
            # opts - str of short option letters, e.g. "X:Y:" (-Xval1 -Y val2)
            # longopts - list of long options, e.g. ["opt1=",
                # "opt2="] (--opt1=val1 --opt2 val2)
                # ":" and "=" means that value required for this option
            # returns 2-tuple contains list of found key-value tuples
                # and list of free arguments that are left

            # Ex:
                argv = sys.argv[1:]
                    # ["-Bb", "-A", "-C", "c", "--lA=la", "--lB", "f"]
                opts, args = getopt.getopt(argv, "AB:C:", ["lA=", "lB"])
                    # opts = [('-B', 'b'), ('-A', ''), ('-C', 'c'),
                        # ('--lA', 'la')];
                    # args = ['f']
                for k, v in opts:
                    if k == "-A":
                        # process A ...
                    elif k == "-B":
                        # process B ...
                    # ...

    argparse
        # import argparse

        argparse.ArgumentParser()

        add_argument(name,
                type=str, required=False, default=None, help='')
            # name - string like '--flag_name'
        parse_args() : args
        parse_known_args() : (args, rest)

        # Ex:
            parser = argparse.ArgumentParser()
            parser.add_argument(
                    '--model_file',
                    type=str,
                    required=True,
                    help='Path to .ckpt file')
            args, unparsed = parser.parse_known_args()

    ================================
    Handle interruption
        # import signal

        signal.SIGINT : int
        signal.SIGTERM : int
        ...

        signal.signal(int, func(int, frame))

    ================================
    Run subprocess
        # import subprocess

        subprocess.PIPE : int  # special value that can be used as the
            # stdin, stdout, stderr args to indicate that a pipe to the
            # standard stream should be opened

        subprocess.call(args_list) : int  # run subprocess and return returncode
        subprocess.check_output(args_list) : bytes  # raise error if returncode != 0

        subprocess.run(args,
                input=None,
                stdout=None, stderr=None,
                cwd=None) : CompletedProcess
            # run command (using Popen) and return results
            # CompletedProcess:
                cmd : str
                returncode : int
                stdout : None|bytes
                stderr : None|bytes

        Popen
            # from subprocess import Popen

            Popen(args,
                    stdin=None, stdout=None, stderr=None,
                    cwd=None)

            cmd : str
            returncode : int
            stdin : None|BufferedWriter
            stdout : None|BufferedReader
            stderr : None|BufferedReader

            communicate([bytes], timeout=None) : bytes
                # write input, read output and return
                # can raise TimeoutExpired if timeout specified
            poll() : None|int  # check if process has terminated
            wait(timeout=None) : int
            send_signal(int)
            terminate()
            kill()

================================================================================
Exceptions =====================================================================
================================================================================

    # Catch:
    try:
        # ...
    except ExceptionSub as e:
        # ...
        print(e.args)  # tuple of arguments that was passed to exception
            # constructor
    except (*Exceptions):
        # ...
    except:
        # ...
        raise  # re-raise exception
    else:
        # if try executed without exception

    try:
        # ...
    except:
        # ...
    finally:
        # ...

    # Raise:
    raise ExceptionClass(arg)

    BaseException  # base exception class
        SystemExit  # raises by sys.exit()
        KeyboardInterrupt
        GeneratorExit
        Exception  # base class for all builtin non-system-exiting and for
            # user-defined exceptions
            AssertionError
            ImportError
            StopIteration  # raises by next() function when sequence end reaches
            ArithmeticError
            BufferError
            LookupError
            EOFError
            RuntimeError
            Warning
            ...

    # Stacktrace:
        # import traceback

        traceback.format_exc([limit]) : str

================================================================================
Math ===========================================================================
================================================================================

    abs(n) : number
    round(fl [, n]) : int  # round fl to n digits after point
    min(*numbers) : number
    max(*numbers) : number
    sum(iterable [, start]) : number

    ================================
    math package
        # import math

        math.inf
        math.nan

        math.floor(fl) : int
        math.ceil(fl) : int
        math.log(n) : number
        math.log10(n) : number
        math.pow(n, m) : number
        math.sqrt(n) : number
        math.modf(fl) : tuple  # separate float to fractional and integer parts

    ================================
    random package
        # import random

        random.choice(sequence) : val  # select random element from list
        random.randrange(start, stop, step) : number  # select random num
            # from range
        random.random() : float  # [0; 1)
        random.uniform(n1, n2) : float  # [n1; n2)
        random.shuffle(list)

================================================================================
Strings ========================================================================
================================================================================

    s = "string"
    s = 'string'
    s = """multiline
        string\n"""
    s = "line one " \
            "line two"

    s1 + s2  # concat
    s * n  # repeat n times
    "%s %d %02d %f %1.2f %o %x %#x" % (*values)  # format

    char = str[i]
    substr = str[iFrom:iTo]
    substr = str[iFrom:iTo:step]
        # for example: 'qwerty'[::-1] - reversed string
    substr in s  # check for membership
    substr not in s

    # special chars:
    \b, \f, \n, \r, \t, \v, \s

    # raw string:
    r"some \nstring"

    # bytes:
    b"some bytes"  # only ascii
    b.decode(encoding="utf-8") : str

    chr(code) : str  # get char by charcode
    ord(char) : int  # get charcode by char

    len(s) : int
    min(s) : char
    max(s) : char

    ================================
    String methods:

        count(str [, i_from, i_to]) : int  # number of occurences
        startswith(prefix [, i_from, i_to]) : bool
        endswith(suffix [, i_from, i_to]) : bool
        find(str [, i_from, i_to]) : int
        replace(old, new [, limit]) : str
        strip([chars]) : str  # remove leading and trailing whitespaces

        isalpha() : bool
        isalnum() : bool
        isdigit() : bool
        isspace() : bool

        islower() : bool
        lower() : str
        isupper() : bool
        upper() : str
        swapcase() : str  # invert case
        capitalize() : str
        title() : str  # each word capitalized

        join(seq) : str  # this string is a separator
        split(separ [, limit])
            # e.g.: "a b c d".split(" ", 2) == ['a', 'b', 'c d']

        encode(encoding="utf-8") : bytes

    ================================
    Regex
        # import re

        re.U  # UNICODE
        re.S  # DOTALL ("." will match all include newlines)
        re.I  # IGNORECASE
        re.L  # LOCALE (locale-aware)
        re.M  # MULTILINE

        re.compile(pattern, flags=0) : pattern
        re.escape(str) : str

        re.match(pattern, str, flags=0) : match|None  # match beginning of string
            # pattern - regex string or pattern object
            # match:
                .group(index) : str
                    # 0 - full match, from 1 - groups
                .groups() : tuple
        re.fullmatch(pattern, str, flags=0) : match|None  # match whole string
        re.search(pattern, str, flags=0) : match|None  # first occurence
        re.findall(pattern, str, flags=0) : list<str>
        re.finditer(pattern, str, flags=0) : iterator<match>
        re.sub(pattern, repl, str, limit=0, flags=0) : str  # replace
        re.split(pattern, str) : list<str>

        Pattern:

            match(str [, start_pos, end_pos]) : match|None
            fullmatch(str [, start_pos, end_pos]) : match|None
            search(str [, start_pos, end_pos]) : match|None
            findall(str [, start_pos, end_pos]) : list<str>
            finditer(str [, start_pos, end_pos]) : iterator<match>
            sub(repl, str, limit=0) : str
            start([group]) : int
            end([group]) : int

        # Ex:
            r = re.compile(r'([a-zа-я]{3})', re.I|re.U)
            f = r.findall("abc def Йцу")  # ['abc', 'def', 'Йцу']

    ================================
    Template  # To format string with placeholders
        # import string.Template

        Template(format_str)

        substitute(keyw_args) : str
        safe_substitute(keyw_args) : str  # not raise error if value not found

        # Ex:
            t = Template("some ${key} string")
            t.substitute(key="short")  # "some short string"


    ================================
    Base64
        # import base64

        base64.b64encode(bytes) : str
        base64.b64decode(str) : bytes

================================================================================
Collections ====================================================================
================================================================================

    # list, tuple, dictionary
    # Any collection can contain elements of different types

    ================================
    List

        lst = [item1, ...]

        lst1 + lst2  # concat
        lst * n  # repeat n times

        item = lst[index]
        slice = lst[iFrom:iTo]
        slice = lst[iFrom:iTo:step]
        lst[index] = newitem
        del lst[index]
        obj in lst  # check for membership
        obj not in lst

        len(lst) : int
        min(lst) : obj
        max(lst) : obj

    List methods:

        append(obj)
        extend(seq)  # append contents of seq to this
        insert(index, obj)
        remove(obj)  # first occurence
        pop([index]) : obj  # get and remove
        sort(key=lambda(v) : v)
        reverse()
        index(obj) : int
        count(obj) : int

    ================================
    Tuple
        # Tuple is a read-only List

        tp = (item1, ...)

        tp1 + tp2  # concat
        tp * n  # repeat n times

        item = tp[index]
        slice = tp[nFrom:nTo]
        obj in tp  # check for membership
        obj not in tp

        len(tp) : int
        min(tp) : obj
        max(tp) : obj

    ================================
    Dict

        mp = {"key1": val1, ...}

        val = mp[key]  # throws KeyError if does not exists
        mp[key] = newval
        del mp[key]
        key in mp  # check for membership
        key not in mp

        len(mp) : int

    Dict methods:

        clear()
        copy() : dict
        fromkeys(seq [, defVal]) : dict
        get(key [, defVal]) : obj
        setdefault(key [, defVal]) : obj
        update(dict2)  # append dict2's pairs to this
        items() : dict_items  # key-value pairs (tuples)
            # use iter(seq) func to create iterator from dict_keys, dict_values
            # or dict_items
        keys() : dict_keys
        values() : dict_values

    ================================
    Set

        s = set(iterable)
        s = {val1, val2, ...}

        v in s
        v not in s

        len(s) : int

    Set methods:

        add(obj)
        remove(obj)
        discard(obj)  # remove if exists
        pop(obj) : obj
        clear()

        union(seq) : set  # disjunction
        update(seq)  # disjunction
        intersection(seq) : set  # conjunction
        intersection_update(seq)
        difference(seq) : set  # subtraction
        difference_update(seq)
        symmetric_difference(seq) : set
        symmetric_difference_update(seq)

        issubset(set) : bool
        issuperset(set) : bool

    ================================
    Looping

        for item in seq:
            ...

        for item in sorted(seq):
            ...

        for item in reversed(seq):
            ...

        for i, v in enumerate(seq):
            ...

        for k, v in dict.items():
            ...

    ================================
    Iterators

        # To create iterator object from any sequence:
            iter(seq) : iterator

        # to iterate on iterator:
            next(iterator) : obj

        # Generator is a function that makes its argument iterable using yield
        # statement
            # Ex:
            def reverse(obj):
                for index in range(obj.count()-1, -1, -1):
                    yield obj.getSomeItem(index)

        # Generator expression:
            (expr for item in iterable)  # creates iterator


        filter(func(v) : bool, iterable) : iterator
        map(func(v) : obj, iterable) : iterator
        zip(*iterables) : iterator
        range(nFrom, nTo [, step]) : iterator  # [nFrom; nTo)

    ================================
    Comprehension

        # Iterate by sequence and generate new list:
            [expr for item in iterable]

        # new dict:
            {key_expr: val_expr for item in iterable}

        # Comprehension + filter:
            [expr for item in iterable if expr]

        # Ex:
            {str(v) for v in arr}  # create set of stringified items

    ================================
    JSON
        # import json

        json.dumps(obj, indent=None, ensure_ascii=True, allow_nan=True,
                sort_keys=False) : str
        json.dump(obj, file_p, indent=None, ensure_ascii=True, allow_nan=True,
                sort_keys=False)  # write to file opened in text mode
        json.loads(json_str) : obj
        json.load(file_p) : obj

================================================================================
Date & Time ====================================================================
================================================================================

    time package
        # import time

        time.timezone : int  # timezone delta in seconds
        time.tzname : tuple

        time.time() : float  # timestamp

        time.localtime() : time_struct
        time.localtime(timestamp) : time_struct
            .tm_year
            .tm_mon  # 1-12
            .tm_mday  # 1-31
            .tm_wday  # 0-6
            .tm_hour  # 0-23
            .tm_min  # 0-59
            .tm_sec  # 0-59
            .tm_yday  # 1-366
            .tm_isdst  # 0,1,-1
        time.gmtime(timestamp) : time_struct

        time.asctime(time_struct) : str
        time.mktime(time_struct) : float

        time.strftime(fmt, time_struct) : str
        time.strptime(timestr, fmt) : time_struct

        time.sleep(dur)  # suspend thread for dur seconds (float)

================================================================================
IO, Files ======================================================================
================================================================================

    File

        open(filename [, mode, buffering, encoding]) : File
            # mode - r (read, default), r+ (read, write), rb (read, binary),
                # w (rewrite, create non-existing), w+ (rewrite, read, create),
                # a (append, create), a+ (read, append, create)
            # buffering - 0 (no buffer), 1 (line buffer), >1 (spec buff size),
                # -1 (system default)
            # encoding - encoding name str, like "utf-8"

    File object

        closed : bool
        mode : str
        name : str  # path

        read([limit]) : data  # data - string or binary
        readline([limit]) : data
        readlines([limitHint]) : list  # read as list of strings
        write(data) : int
        writelines(seq)
        tell() : int  # get current position
        seek(offset [, where]) : int
            # where - 0 (from start), 1 (curr pos), 2 (end)
        close()

    ================================
    os, os.path packages
        # import os

        os.path.exists(path) : bool
        os.path.isfile(path) : bool
        os.path.isdir(path) : bool
        os.path.islink(path) : bool
        os.path.abspath(path) : str
        os.path.relpath(path [, base]) : str
        os.path.isabs(path) : bool
        os.path.join(*parts) : str
        os.path.normpath(path) : str
        os.path.split(path) : tuple  # for "/d1/d2" - ("d1", "d2"),
            # but for "/d1/d2/" - ("d1/d2", "")
        os.path.basename(path) : str  # second half from split()
        os.path.dirname(path) : str  # first half from split()
        os.path.getatime(path) : float  # last access timestamp
        os.path.getmtime(path) : float  # last modified timestamp
        os.path.getctime(path) : float  # creation timestamp

        os.rename(path, newPath)
        os.remove(filepath)
        os.rmdir(dirpath)  # must be empty
        os.mkdir(dirname [, mode=0o777])
        os.makedirs(dirpath [, mode=0o777, exist_ok=False])
        os.listdir(dirpath) : list  # list of names
        os.chdir(dirpath)
        os.getcwd() : str
        os.chmod(path, mode)

    ================================
    shutil module
        # import shutil

        shutil.copy(src, dst)  # copy file
        shutil.copytree(src, dst [, symlinks=False])  # copy dir recursive
            # if symlinks = true symlinks will be copied as symlinks instead of
            # copying linked files
        shutil.move(src, dst)  # move file|dir

    ================================
    Glob  # Searching files by unix-shell-like pattern
        # import glob

        glob.glob(pattern [, recursive]) : list
            # where pattern - string like "./**/*.ext" (finds all .ext files
            # in all subdirectories)
        glob.iglob(pattern [, recursive]) : iterator


    ================================
    Standart IO

        Console  # Read (write) from (to) stdin (stdout) by default

            input(prompt) : str
            print(*values, sep=' ', end='\n')

        STDIN, STDOUT, STDERR  # even if redirected
            # import sys

            sys.stdin.read(minSize) : str  # until EOF reached
            sys.stdout.write(str)
            sys.stderr.write(str)

================================================================================
Socket =========================================================================
================================================================================

    # import socket

    socket.socket(family=AF_INET, type=SOCK_STREAM, proto=0, fileno=None)

    bind(addr)
        # addr - tuple (ip, portnumber)
        # if ip is empty string INADDR_ANY will be used
    listen([backlog])
    accept() : (socket, addr)

    connect(addr)

    close()
    detach() : int  # detach file descriptor
    recv([bufsize] [, flags]) : bytes  # read up to bufsize bytes
        # returns empty if socket closed by other side
    send(bytes [, flags]) : int  # attempt to send data, return sent bytes amount
    sendall(bytes [, flags])

    getsockname() : addr  # local address
    getpeername() : addr  # remote address
    setsockopt(level, optname, value)
    getsockopt(level, optname) : int
    settimeout(value)
        # value - float (seconds) or None
            # None - blocking mode without timeout
            # 0 - non-blocking mode without timeout
    gettimeout() : float|None
    setblocking(bool)
        # setblocking(True) == settimeout(None)
        # setblocking(False) == settimeout(0.0)
    getblocking() : bool

    Example:

        # server
        import socket

        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        sock.bind(('localhost', 49001))
        sock.listen()
        while True:
            conn, addr = server_sock.accept()
            try:
                while True:
                    recvd = conn.recv()
                    if not recvd:
                        break
                    conn.sendall(recvd)
            finally:
                conn.close()

        # client
        import socket

        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect(('localhost', 49001))
        try:
            message = 'qweйцу'.encode()
            sock.sendall(message)
            amount_received = 0
            amount_expected = len(message)
            while amount_received < amount_expected:
                recvd = sock.recv()
                amount_received += len(recvd)
        finally:
            sock.close()

================================================================================
Urllib =========================================================================
================================================================================

    urllib.request
        # from urllib import request

        request.urlopen(url|request, data=None [, timeout], context=None) : response
            # higher-level api for http.client
            # returns:
                # for http, https - http.client.HTTPResponse;
                # for ftp, file, dataurl - urllib.response.addinfourl;
            # data - bytes
            # timeout - float, seconds
            # context - ssl.SSLContext object
            # response always has methods:
                geturl() : str  # to determine redirect
                getcode() : int  # http response code
                getinfo() : http.client.HTTPMessage

        request.build_opener(*handlers) : urllib.request.OpenerDirector
            # chain handlers and create opener
            # handler - subclass of urllib.request.BaseHandler,
                # e.g. HTTPBasicAuthHandler, HTTPDigestAuthHandler,
                # ProxyBasicAuthHandler, HTTPRedirectHandler & etc.
        request.install_opener(opener)  # install given OpenerDirector
            # as global opener

    Request
        # from urllib import request

        request.Request(url, data=None, headers={}, origin_req_host=None,
                method=None)
            # url - str
            # data - bytes
            # origin_req_host - referer str
            # method - request method name str

        full_url : str
        type : str  # uri scheme
        host : str
        origin_req_host : str
        data : bytes
        method : str

        add_header(name, val)
        remove_header(name)
        has_header(name) : bool
        header_items() : list  # list of 2-tuples

    HTTPResponse
        # from http.client import HTTPResponse

        status : int  # http response status
        reason : str  # response reason phrase
        closed : bool  # is stream closed

        read([n]) : bytes  # read n bytes from response body
        readinto(bytes)
        getheader(name, defVal=None) : str
        getheaders() : list  # list of 2-tuples


    OpenerDirector

        open(url, data=None [, timeout]) : response  # same as urlopen(),
            # but uses this opener handlers
            # url - Request object or url string

    HTTPPasswordMgr, HTTPPasswordMgrWithDefaultRealm, HTTPPasswordMgrWithPriorAuth
        # from urllib import request

        request.HTTPPasswordMgr()
        request.HTTPPasswordMgrWithDefaultRealm()
        request.HTTPPasswordMgrWithPriorAuth()  # can send auth credentials
            # immediately without waiting for 401

        add_password(realmname, authuri, username, passw)
        find_user_password(realmname, authuri) : tuple


    Parse URL
        # from urllib import parse

        parse.urlsplit(uri_str) : SplitResult  # get struct containing url parts
        parse.urlunsplit(parts) : str
        parse.urlparse(uri_str) : ParseResult  # same as urlsplit(), but also
            # splits params
        parse.urlunparse(parts) : str

        parse.urlencode(query_dict, safe="", encoding=None) : str  # url-encode
            # values and create query string
        parse.parse_qs(qs, keep_blank_values=False, encoding="utf-8") : dict
            # parse query string and url-decode values
        parse.quote(str, safe="/", encoding=None) : str  # replace special
            # characters by %xx escape
        parse.unquote(str, encoding="utf-8") : str
        parse.quote_plus(str, safe="", encoding=None) : str  # same as quote(),
            # but replaces "+" to " "
        parse.unquote_plus(str, encoding="utf-8") : str


    Example:

        from urllib import request
        from urllib import parse

        url = "http://httpbin.org/post"

        data = parse.urlencode({"key": "val"})
        data = data.encode("ascii")

        req = request.Request(url, data=data, method="POST")

        pm = request.HTTPPasswordMgrWithDefaultRealm()
        pm.add_password(None, url, "user", "passw");

        handler = request.HTTPBasicAuthHandler(pm)
        opener = request.build_opener(handler)

        # setup opener as global:
        request.install_opener(opener)
        r = request.urlopen(req)

        # or use opener in certain request:
        r = opener.open(req)

        print(r.read().decode("utf-8"))

================================================================================
Multithreading =================================================================
================================================================================

    # import threading

    threading module

        threading.active_count() : int
        threading.enumerate() : list  # list of active threads
        threading.main_thread() : Thread
        threading.current_thread() : Thread
        threading.get_ident() : int  # current thread identifier


    Thread

        threading.Thread(group=None, name=None, daemon=None,
                target=None, args=(), kwargs={})
        # To create new thread need to pass target callable
        # or inherit Thread class and override __init__() and run() methods

        name : string
        ident : int
        daemon : bool  # daemon thread stops when program exits

        start()
        is_alive() : bool
        join([timeout])  # timeout - seconds (float)

    Timer  # Inherited from Thread

        threading.Timer(interval, action_callable, args=(), kwargs={})
            # Wait for interval seconds (float) and run action once.
            # action_callable - function that will be called with args
            # and kwargs.

        start()
        cancel()

        # Ex:
            def tmf(*args, **kwargs):
                print(args[0], kwargs["b"])  # a b

            def tmf(a, b):
                print(a, b)  # a b

            tm = Timer(1, tmf, args=("a"), kwargs={"b":"b"})
            tm.start()


    ================================
    Lock

        threading.Lock()

        acquire(blocking=True, timeout=-1) : bool
        release()

    RLock  # Reentrant lock
        # Can be locked multiple times by the same thread (must be
        # realeased same number of times).

        threading.RLock()

        acquire(blocking=True, timeout=-1) : bool
        release()

    Condition  # Allows threads wait until they are notified by another thread

        threading.Condition([lock])

        wait([timeout]) : bool  # release lock and block thread until notified.
            # When notified it's acquires lock again
        wait_for(predicate, timeout=None) : bool
        notify([n])  # wake up n treads (1 by default)
        notify_all()
        # wait() and notify() throws RuntimeError if underlying lock not
            # acquired yet.
        acquire() : bool  # acquire underlying lock
        release()  # release underlying lock

    ================================
    Context management protocol
        # Direct calls to acquire() and release() can be replaced by context
        # management statement:

        # Ex:
            with condition:
                condition.wait()

            with condition:
                condition.notify()

================================================================================
SMTP ===========================================================================
================================================================================

    # import smtplib

    smtplib.SMTP(host="", port=0, local_hostname=None [, timeout])

    login(user, password)
    starttls(keyfile=None, certfile=None, context=None)
        # context - ssl.SSLContext object
    sendmail(from_addr, to_addr, msg, options=[])
        # msg - plain message - ascii string or bytes
    send_message(msg, from_addr=None, to_addrs=None, options=[])
        # msg - email.message.Message object
    quit()  # terminate smtp session


    SMTP plain message structure:

        MIME-Version: 1.0\r\n
        Content-type: text/html; charset=UTF-8\r\n
        From: from_name <from_addr>\r\n
        To: to_name <to_addr>\r\n
        X-Sender: <from_addr>\r\n
        X-Priority: priority_n\r\n  # 1-5 (1 - highest)
        X-Mailer: app_name\r\n
        Return-Path: <from_addr>\r\n
        \r\n
        message_body


    # Ex:
        message = """
        From: From Person <from@fromdomain.com>
        To: To Person <to@todomain.com>
        Subject: SMTP e-mail test

        This is a test e-mail message.
        """
        try:
            smtp = smtplib.SMTP('localhost')
            smtp.sendmail("sender@domain.net", ["receiver@domain.net"], message)
            print("Successfully sent email")
        except Exception as e:
            print("Error:", e)

================================================================================
Imaging library (PIL) ==========================================================
================================================================================

    # from PIL import Image

    Image

        Image.open(filename) : Image
        Image.open(file) : Image
        Image.new(mode, size [, color]) : Image
        Image.fromstring(mode, size, data)  # from raw data

        Image.blend(img1, img2, alpha) : Image  # interpolate using alpha constant
        Image.composite(img1, img2, mask) : Image  # interpolate using mask
        Image.merge(mode, bands) : Image  # merge bands to one image
        Image.eval(img, func)  # apply func to each pixel

    ================================
    Image object

        format : string|None  # e.g. "PNG", "JPEG", etc
        mode : string  # pixel format, e.g. "RGB", "L"
        size : tuple  # dimension (2-tuple)
        palette : ImagePalette|None  # colour palette
        info : dict  # additional info

        verify()
        save(filename [, format])
        convert(mode) : Image
            # mode:
                1  # 1-bit pixels, black and white, stored with one pixel per byte
                L  # 8-bit pixels, black and white
                P  # 8-bit pixels, mapped to any other mode using a colour palette
                RGB  # 3x8-bit pixels, true colour
                RGBA  # 4x8-bit pixels, true colour with transparency mask
                CMYK  # 4x8-bit pixels, colour separation
                YCbCr  # 3x8-bit pixels, colour video format
                I  # 32-bit signed integer pixels
                F  # 32-bit floating point pixels
        copy() : Image
        crop(rect) : Image  # copy of region
            # rect - (x, y, x_end, y_end)
        paste(img, rect [, mask])
        paste(color, rect)  # fill rect
            # color - int (for single-bands) or tuple (for multi-bands)
        resize(size [, filter]) : Image
            # filter:
                Image.NEAREST
                Image.BILINEAR
                Image.BICUBIC
                Image.ANTIALIAS
        thumbnail(size [, filter])  # downscale
        rotate(angle) : Image  # counter-clockwise
        transform(size, method, data [, filter]) : Image
            # method:
                Image.EXTENT  # cut out a rectangular subregion
                Image.AFFINE  # affine transform
                Image.QUAD  # map a quadrilateral to a rectangle
                Image.MESH  # map a number of source quadrilaterals
                    # in one operation
                Image.PERSPECTIVE
                # Ex:
                    img.transform((300, 300), Image.EXTENT, (50, 50, 250, 250))
                        # resample 200x200 subrect to 300x300 and ret as new image
        transpose(method) : Image  # flip or rotate
            # method:
                Image.FLIP_LEFT_RIGHT
                Image.FLIP_TOP_BOTTOM
                Image.ROTATE_90
                Image.ROTATE_180
                Image.ROTATE_270

        filter(imagefilter) : Image  # filter using ImageFilter
        point(func [, mode]) : Image  # map each pixel
        split() : tuple  # get tuple of bands images
        getbands() : tuple  # get bands names, e.g.: ("R", "G", "B")
        putalpha(band)

        getbox() : tuple  # get bounding rect of nonempty regions
        getpixel(x, y) : int|tuple  # get pixel value
        putpixel(x, y, value)
        getdata() : seq  # get sequence of pixel values
        putdata(seq [, scale, offset])  # pix = val * scale + offset

        tostring() : string  # to raw data

================================================================================
PyTest =========================================================================
================================================================================

    # Testing framework

    import pytest

    class TestMath:
        def setup_class(cls):
            # setup once

        def teardown_class(cls):
            # teardown once

        def setup(self):
            # setup for every test

        def teardown(self):
            #

        @pytest.fixture()
        def user_defined_fixture(request):
            # will be called for tests that mention this fixture
            # available predefined fixtures:
            # cache,
            # capfd, capfdbinary, caplog, capsys, capsysbinary,
            # doctest_namespace,
            # monkeypatch, stub,
            # pytestconfig,
            # record_xml_attribute, record_xml_property,
            # recwarn,
            # tmpdir, tmpdir_factory
            return some_fixture_result

        @pytest.fixture(autouse=True)
        def some_auto_fixture(self, monkeypatch):
            # will be called for every test
            monkeypatch.setattr(obj, 'method', method_stub)

        def test_sometest(self, some_fixture):
            assert(bool_expression)

        def test_with_exception(self):
            with pytest.raises(ExceptionType):
                # some code


    $ python3 -m pytest <tests_dir>  # run all tests found in directory
        -v  # verbose
        -l  # dump variables on test failure
        -s  # no capture stdout
    $ python3 -m pytest <test_file>::<test_func>  # run a specific test

================================================================================
virtualenv =====================================================================
================================================================================

    # virtualenv is a tool to create isolated Python environments.

    $ python3 -m venv <virtualenv_directory>  # create new virtual environment

    $ . <virtualenv_directory>/bin/activate  # activate

    # when inside virtualenv:
    $ deactivate  # exit
