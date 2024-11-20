# Unix shell cheatsheet

### Table of contents:
* [Terminal hotkeys](#hotkeys)
* [Filesystem Hierarchy Standard](#fhs)
* [Package management](#package-management)
	* [brew](#brew)
	* [dpkg](#dpkg)
	* [apt](#apt)
* [Group statements, substitutions](#group-statements)
* [Variables](#variables)
* [Arrays](#arrays)
* [Control statements](#control-statements)
* [Test command/keyword](#test-command-keyword)
* [Glob, regex](#regex)
* [Function](#function)
* [Script](#script)
	* [Define](#script-define)
	* [Run](#script-run)
	* [Exit](#script-exit)
	* [Command line arguments](#script-arguments)
	* [Catch signals](#script-signals)
* [Environment variables](#env-vars)
* [History](#history)
* [Processes, tasks](#processes-tasks)
	* [Background tasks](#background-tasks)
	* [Processes](#processes)
* [IO](#io)
	* [Basic print/read](#io-basic)
	* [Input/output redirection](#io-redirection)
	* [Special files](#io-special-files)
	* [Pipe](#io-pipe)
* [Filsystem](#fs)
	* [Usage](#fs-usage)
	* [Devices](#fs-devices)
	* [Mount](#fs-mount)
	* [Partitioning](#fs-partitions)
* [Files, directories](#files-dirs)
	* [Access rights](#files-access)
	* [Working directory](#files-cwd)
	* [View](#files-view)
	* [Create, copy, remove](#files-crud)
	* [Search](#files-search)
	* [Archive](#files-archive)
	* [Backup](#files-backup)
* [Text processing](#text-processing)
	* [View](#text-view)
	* [Grep](#text-grep)
	* [Sed](#text-sed)
	* [Lines, words, chars](#text-lines-words)
	* [Diff](#text-diff)
* [Network](#network)
	* [Interfaces](#network-interfaces)
	* [Addresses](#network-addresses)
	* [ARP table](#network-arp)
	* [Route table](#network-route)
	* [Investigate sockets](#network-sockets)
	* [Telnet](#network-telnet)
	* [Wget](#network-wget)
	* [Ping, scan, dump](#network-etc)
* [SSH](#ssh)
* [Tmux](#tmux)
* [Vim](#vim)
* [Systemd services](#systemd)
* [User management](#user-management)
* [Miscellaneous commands](#misc)


================================================================================
# Terminal hotkeys <a id="hotkeys"></a>

Cut all before cursor: `Ctrl U`<br/>
Cut all after cursor: `Ctrl K`<br/>
Cut a word before cursor: `Ctrl W`<br/>
Paste: `Ctrl Y`<br/>

Clear screen: `Ctrl L`<br/>
Freeze stdout: `Ctrl S`<br/>
Unfreeze: `Ctrl Q`<br/>

SIGINT - interrupt current task: `Ctrl C`<br/>
SIGTSTP - pause current task: `Ctrl Z`<br/>
EOF, exit: `Ctrl D`<br/>


================================================================================
# FHS - Filesystem Hierarchy Standard <a id="fhs"></a>

```
/boot/  # boot loaders
	vmlinuz-x.x.x-x
	grub/grub.conf
/dev/   # essential devices
/proc/  # virtual filesystem providing info about processes and kernel info
/mnt/   # temporarily mounted filesystems
/media/ # mount points for removable media

/bin/   # essential command binaries available for single user mode
/sbin/  # same for root
/lib/   # libraries for /bin and /sbin
/opt/   # optional software packages
/etc/   # system-wide configs
	init.d/  # init scripts and daemons
		rc  # do runlevel changes (run rcN.d/ scripts)
	rcN.d/   # init scripts running at certain runlevel N (links to init.d/)
		# 0 - shutdown
		# 1 - single user mode
		# 2 - multiuser, no network
		# 3 - multiuser, with network
		# 5 - multiuser, GUI
		# 6 - reboot
	crontab
	cron.d/
	fstab  # filesystems table

	hostname
	hosts
	network/
		interfaces
	resolv.conf

	passwd   # list of users
	shadow   # passwords
	group    # list of groups
	gshadow  # group passwords
	sudoers

	skel/  # default user's configs
	apt/
		sources.list
/usr/  # secondary hierarchy for readonly files (Unix System Resources)
	bin/
	sbin/
	lib/
	include/
	local/  # tertiary hierarchy for local data specific to this host

/tmp/  # temp files (usually removed on reboot (see $TMPTIME env var))
/var/  # variable files (logs, spool files, emails, etc.)
	cache/
	tmp/  # temp files to be preserved between reboots
	lib/   # state information, e.g. databases
	mail/
	lock/
	run/
	spool/
		cron/crontabs/  # users' crontabs
	log/
		dmesg
		kern.log
		daemon.log
		auth.log
		messages
		syslog

/root/  # root's home directory
/home/  # users' home directories
```


================================================================================
# Package management <a id="package-management"></a>

## Homebrew (MacOS) <a id="brew"></a>

https://docs.brew.sh/Manpage

```sh
# Install package:
brew install <package>

# specific version:
brew install <package>@<ver>

# Uninstall:
brew uninstall <package>

# Uninstall unused dependencies:
brew autoremove

# Search packages:
brew search <text>
# or:
brew search /<regex>/

# View package details:
brew info <package>

# Update package:
brew updgrade <package>
```

---
## Debian package manager <a id="dpkg"></a>

```sh
# Install package:
dpkg -i <deb_file>

# Uninstall package:
dpkg -r <package>

# Uninstall package and its dependencies:
dpkg --purge <package>

# Print package status details:
dpkg -s <package>

# List all installed packages:
dpkg --list
```

---
## APT package handling utlity (Ubuntu) <a id="apt"></a>

```sh
# Update index:
apt-get update

# Install newest versions of all packages:
apt-get upgrade

# Install package:
apt-get install <package>
	-f  # try to fix broken dependencies

# Uninstall:
apt-get remove <package>
apt-get purge <package>
	-y  # automatic "yes" to prompts
```

```sh
# Print package records:
apt-cache show <package>

# Search package in index:
apt-cache search <regex>
```


================================================================================
# Group statements, substitutions <a id="group-statements"></a>

### Statements group

```sh
{ <statement1>; <statement2>; ...; }
```
Grouped statements interpretes as one command and returns output.<br/>
Can be used for IO redirection, e.g.:
```sh
{
	expr1
	expr2
} > dir/file
```

---
Execute statements in a subshell:
```sh
( <statement1>; <statement2>; ...; )
```
Subshell (child process) has own scope, so variables will not be available in parent script.

---
### Command substitution

```sh
$( <command1>; <command2>; ...; )
```
Executes in a subshell and substitutes result.<br/>
e.g.:
```sh
a=$(
	echo "List of files:"
	ls -l
)
echo "$a"  # Quoted to preserve whitespaces
```

---
### Process substitution

```sh
<( <cmd1>; <cmd2>; ...; )
```
Interprets output as file and allows its redirection.<br/>
e.g.:
```sh
# Print 2th+ lines of `ls` output:
while read line; do
	echo $line
done < <(ls -l | tail -n +2)
```

---
### Reduced logical AND/OR by exitcode

I.e., *short circuit evaluation*
```sh
<command1> && <command2>
<command1> || <command2>
```

---
### Variants substitution <a id="variants"></a>

```sh
{<val1>,<val2>}
{<m>..<n>}  # By range
```
Command will be interpreted as command with list of arguments generated by `{...}`.<br/>
Could not contain unescaped spaces!<br/>

E.g.:
```sh
mkdir ./d{1,2," end"}
	# is the same as `mkdir ./d1 ./d2 "./d end"`
```

---
### Arithmetic expression

```sh
(( <expr1>, <expr2>, ... ))  # Arithmetic expressions group
$(( <expr1>, <expr2>, ... ))  # Arithmetic expression substitution
	# Returns result of the last expression.
```
E.g.:
```sh
echo $(( a = 1 + 1, b = 6 / 2 ))  # 3
echo $a  # 2
```


================================================================================
# Variables <a id="variables"></a>

(!) Always quote variable substitution!

### Set

```sh
varname=some_value
	# Without spaces!
```

---
### Substitute value

```sh
$varname
${varname}  # same

${varname:-default}  # Value if defined and not empty, default otherwise
${#varname}  # Length
${varname:offset:length}  # Substring
${varname/pattern/str}  # Replace first match by str
${varname/#pattern/str}  # Replace if on start
${varname/%pattern/str}  # Replace if on end
${varname//pattern/str}  # Replace all matches
${varname#pattern}  # Delete shortest match on start
${varname##pattern}  # Delete longest match on start
${varname%pattern}  # Delete shortest match on end
${varname%%pattern}  # Delete longest match on end
```
e.g.:
```sh
Q="qwerty-uiop"
echo ${Q/\-/_}  # "qwerty_uiop"
```

---
### Delete variable

```sh
unset varname
```

================================================================================
# Arrays <a id="arrays"></a>

### Create

```sh
arr=()
arr=(<val0> <val1> ...)  # Create and fill
arr=([<index0>]=<val0> [<index1>]=<val1> ...)  # Explicitly set index

declare -a arr=(<val0> ...)  # Declare array

declare -A arr=([<key>]=<val1> ...)  # Associative array
```

---
### Edit

Set value:
```sh
arr[<key>]=<value>
```

Append value:
```sh
arr+=(<value>)
```

---
### Read

Value by index/key:
```sh
${arr[<key>]}
```

Length:
```sh
${#arr[@]}
```

---
### Slice

```sh
${arr[@]:<n>:<m>}
```

---
### Join

Values:
```sh
${arr[*]}
```

Indexes/keys:
```sh
${!arr[*]}
```

---
### Iterate

By values:
```sh
${arr[@]}
```
By indexes/keys:
```sh
${!arr[@]}
```

E.g.:
```sh
# Get filenames by glob pattern:
files=(./*.txt)
```

```sh
# Iterate values:
for val in "${arr[@]}"; do  # Don't forget to quote
	echo "$val"
done
```

---
### Generate sequence

```sh
seq <end>   # Numbers [1; end]
seq <start> <end>  # [start; end]
seq <start> <step> <end>  # [start; end] with step
```


================================================================================
# Control statements <a id="control-statements"></a>

### If/else

```sh
if <command>; then
	# ...
elif <command>; then
	# ...
else
	# ...
fi
```

---
### Switch/case

```sh
case <str> in
	<pattern1>) <command1> ;;
	<pattern2>|<pattern3>) <command2> ;;
	# ...
	*) <command_default> ;;
esac
```

---
### While

```sh
while <command>; do
	# ...
done
```
E.g.:
```sh
cancel=
n=0
# Repeat every 5 seconds until cancelled:
while [ ! $cancel ] && sleep 5; do
	(( n++ ))
	echo "iter $n"
	[ $n -ge 5 ] && cancel=true
done
```

E.g., read lines from file:
```sh
while IFS="" read line; do
	echo $line
done < ./file.txt
```

---
### Until

```sh
until <command>; do
	# ...
done
```

---
### For

```sh
for (( <init>; <check>; <step>; )); do
	# ...
done
```

---
### For...in

```sh
for <item> in <sequence>; do
	# ...
done
```
E.g.:
```sh
for v in "one" "two" "three"; do
	echo "$v"
done
```

---
### Select

```sh
select <selected> in <item1> <item2> ...; do
	# ...
	break
done
# Will ask user to select item.
# Uses PS3 as prompt.
# Selected variable will contain selected item value or "".
# REPLY will contain number of selected item (from 1).
#	Without break will ask again.
```

---
### Cancel loop:
`break`

### Cancel current iteration:
`continue`


================================================================================
# Test command/keyword <a id="test-command-keyword"></a>

### Test command
Unix-shell-compatible (POSIX).

```sh
[ <expr> ]
```

`<expr>` can contain:
```sh
-e <path>  # Is exists
-s <path>  # Is file exists and not empty
-f <path>  # Is file
-d <path>  # Is dir
-h <path>  # Is symlink
-r|-w|-x <path>  # Is readable|writable|executable

-t <fd>  # Is file descriptor opened on a terminal
	# e.g., `[ -t 0 ]` - true if it's an interactive shell

-z <str>  # Is string empty
-n <str>  # Not empty
<str1> == <str2>
<str1> != <str2>
<str1> \< <str2>  # ASCII sorting
<str> \> <str2>

! <expr>  # NOT
<expr1> -a <expr2>  # AND (not reduced)
<expr1> -o <expr2>  # OR (not reduced)
\( <expr> \)  # Group to change precedence

<num1> -eq <num2>  # Is numbers are equal
<num1> -ne <num2>  # Not equal
<num1> -lt <num2>  # Less than
<num1> -le <num2>  # Less or equal
<num1> -gt <num2>  # Greater than
<num1> -ge <num2>  # Greater or equal
```

E.g.:
```sh
if [ $char == "a" ]; then ...
```

---
### Test keyword

```sh
[[ <expr> ]]
```
It's more powerful but available in bash, not POSIX.

`<expr>` can contain (additionally to test command):
```sh
<str1> == <glob_pattern>  # Without quotes!
<str1> != <glob_pattern>
<str1> =~ <regex_pattern>  # Without quotes!
<str1> < <str2>  # ASCII sorting
<str> > <str>

<expr1> && <expr2>  # AND (reduced)
<expr1> || <expr2>  # OR (reduced)

( <expr> )  # Group to change precedence
```


================================================================================
# Glob, regex <a id="regex"></a>

### Glob

Glob can be used to match string or filenames.

Special characters:
```sh
*   # Any number of any chars (exclude "/" when matching filenames)
**  # Any file or dir and its subdirs (recursive *)
		# Should be enabled by `shopt -s globstar`
?   # Any single char
[a-z]   # Single char from range
[^a-z]  # Inversed
```

Glob pattern implicitly anchored from start to end of line.<br/>

E.g.:
```sh
ls -l ~/*.txt  # List all txt files in home dir.
rm -r ./*  # Remove all files and dirs from cwd.
if [[ filename = *.png ]]; then ...
```

---
### Extended glob

Enable:
```sh
shopt -s extglob
```

```sh
?(pattern1|pattern2|...)  # Zero or one occurence
*(pattern1|pattern2|...)  # Zero or more
+(pattern1|pattern2|...)  # One or more
@(pattern1|pattern2|...)  # One
!(pattern1|pattern2|...)  # Inverse
```

E.g.:
```sh
# List all files except jpg and gif:
ls !(*.jpg|*.gif)
```

---
### Basic regex (BRE dialect)

```sh
^  # Beginnig of line
$  # End of line
.  # Any char
[a-z]  # Single char from range
[^a-z] # Inversed
<abc>  # Word (space-separated sequence)
*   # Zero or more occurences
```

---
## Extended regex (ERE dialect) <a id="regex-ere"></a>

Additionally to BRE it supports:
```sh
+  # One or more occurences
?  # Zero or one occurence
{n}  # n occurences of previous char or group
{n,}  # n or more occurences
{n,m}  # from n to m [n; m] occurences
|  # Logical OR
()  # Grouping
```

---
### Regex in test command

Since bash3.0 supports `=~` operator for `[[]]` keyword.<br/>
It matches string from left side by regex from right side and returns 0 (matched), 1 (not matched) or 2 (incorrect pattern syntax).<br/>

E.g.:
```sh
if [[ some =~ ([a-z]{2})([a-z]{2}) ]]; then
	echo ${BASH_REMATCH[0]}  # "some"
	echo ${BASH_REMATCH[2]}  # "me"
fi
```

---
(!) Do not quote glob or regex.


================================================================================
# Function <a id="function"></a>

### Declare

```sh
function func_name() {
	# ...
	echo $1  # First argument
}
```

### Invoke

```sh
func_name
func_name <arg1> <arg2> ...  # Invoke with arguments
```

### Delete

```sh
unset func_name
```

---
Special variables available inside function body:
```sh
$FUNCNAME
$1, $2, ...  # Arguments
$#    # Number of arguments
```

---
By default all variables defined inside function are available in caller's scope and can overwrite existing outer variables.

Define local function variable:
```sh
local varname=<value>
```

---
Function can return only number, it's like an exitcode.

```sh
return <n>
```


================================================================================
# Script <a id="script"></a>

Bash is a dialect of Shell.

## Define <a id="script-define"></a>

To make file an executable bash script:
1. Add shebang (`#!`) at first line with path to bash interpreter:<br/>
	`#!/bin/bash`<br/>
	or:<br/>
	`#!/bin/bash args`<br/>
	or:<br/>
	`#!/bin/sh`   for posix-shell-compatible scripts<br/>
2. Set executable permission for file

`#` indicates a comment.

`;` can be used to separate multiple siatements in single line.

---
Bash has no types. Any command is a string.

Command and arguments should be separated by whitespaces.<br/>

Command becomes meaningful because *how it used*.<br/>
e.g.:
```sh
echo "-n abc"  # "-n abc\n"
echo -n abc  # "abc"
echo -n `abc`  # "command not found"
```

`\`	can be used to escape special characters.<br/>

```sh
"some_val"  # Escape most of specchars in expression, except "$", "`" and "\".
'some_val'  # Escape all specchars, except only "'".
$'\n\t...'  # String that contains ANSI-C escape characters.
```

---
## Run <a id="script-run"></a>

Run external program:
```sh
exec <path>
```
Process will be replaced.

---
Run script in the current shell (like an import):
```sh
source <path>
# or
. <path>
```

---
Concat and evaluate given command:
```sh
eval <cmd> ...
```
Returns its exit code.

---
## Exit <a id="script-exit"></a>

`0` means success exit code.<br/>
`true` (or `:`) is NOP command that always returns 0.<br/>
`false` is a command that always returns 1.<br/>

Stop script execution:
```sh
exit <code>  # Quit script with specified exitcode [0-255]. 0 means normal exit.
```

`$?` variable contains exitcode returned by last evaluated command.

---
## Command line arguments <a id="script-arguments"></a>

Special variables:
```sh
$0  # Command or script name
$1, $2, ..., ${10}, ...    # Arguments
$#  # Number of arguments
$@  # All arguments as string (separated by IFS)
```

E.g.:
```sh
sn=`basename $0`
echo "Script name: $sn"
```
```sh
args=("$@")  # Arguments as array
IFS="," echo "${args[*]}"  # print args separated by ","
```

---
Change arguments:
```sh
shift <n>  # Shift arguments list to left (exclude $0)
	# n = 1 by default
set <arg1> <arg2> ...  # replace arguments
```

---
Parse arguments:
```sh
getopts <format> <arg>
	# <format>: string like "a:bc:"
		# ":" after key means that value required for this key.
	# <arg>: variable that will contain key.
	# To get value use OPTARG variable.
```
E.g.:
```sh
while getopts "ad:" arg; do
	case $arg in
		a) a=true ;;
		d)
			if [ -d "$OPTARG" ]; then
				dir=$OPTARG
			fi ;;
	esac
done
```

---
## Catch signals <a id="script-signals"></a>

Trap can be used to perform cleanup.

Create a trap:
```sh
trap '<command1>; <command2>; ...' <signal>
```

Print traps list:
```sh
trap
```

Restore to default:
```sh
trap - <signal>
```
Where `<signal>` is one of:
```
HUP
INT
QUIT
TERM
EXIT
ERR
```

E.g.:
```sh
trap 'rm -f somefile' EXIT
trap 'exit $?' ERR  # Exit from script when any error occured
```

---
## Debug
```
set -x    # enable debug mode
set +x    # disable debug mode
```


================================================================================
# Environment variables <a id="env-vars"></a>

Expose variable to child processes:
```sh
export <name>=<value>
```

Print current env variables:
```sh
env
```

Extend current environment with passed variables and run command:
```sh
env <name>=<value>... <cmd> <arg>...
```

---
### Predefined global env vars

```sh
BASH_VERSION  # String describing the version
HOSTNAME  # Hostname of your computer
PPID      # PID of the parent process
PWD       # Current working directory
RANDOM    # Random number between 0 and 32767 (new on each expanding)
UID       # ID number of the current user
COLUMNS   # Width of terminal in characters
LINES     # Height of terminal in characters
HOME      # Current user's home directory
PATH      # Colon-separated list of paths
PS1       # String that describes the format of shell prompt
TMPDIR    # Directory that is used to store temporary files
IFS       # Args separator (' \t\n' by default)
```

---
### To set env vars need to add/change it in:

Globally:<br/>
`/etc/environment`<br/>

For login shell:<br/>
`/etc/profile`<br/>
`~/.profile`<br/>

For nonlogin shell:<br/>
`/etc/bashrc`<br/>
`~/.bashrc`<br/>

For interactive shell:<br/>
`/etc/profile`<br/>
`~/.profile`<br/>
`~/.bashrc`<br/>

For noninteractive shell:<br/>
`/etc/bashrc`<br/>


================================================================================
# History <a id="history"></a>

Print list of N last executed commands:
```sh
history <N>
```

---
### Run a command from history:
```sh
!!   # Run last command
!-<N>  # Run N'th command counting from end
!<N>   # Run command number N
!<str>    # Run last command beginning with str
!<str>:p  # Just print command, do not run
^a^b  # Replace a to b in last command and run

```
E.g.:
```sh
echo qwe rty
^qwe^iop  # Will run `echo iop rty`
```

---
```sh
!$   # Get last word or argument of last command
!*   # Get all arguments of last command
```

---
### Hotkeys

Start reverse-search in history:<br/>
`Ctrl R`<br/>
	Press again to search next (older) command.

Stop, copy found command to input:<br/>
`Ctrl J`<br/>

Cancel search:<br/>
`Ctrl C`<br/>

---
Precede command by the whitespace to prevent saving it in history.


================================================================================
# Processes, tasks <a id="processes-tasks"></a>

`$!` contains PID of recently started background task.<br/>
`$$` contains PID of current process.

-----------------------------------------------------
## Background tasks <a id="background-tasks"></a>

Run command as a background task:
```sh
<some_command> &
```

Pause current process until a specified process stop:
```sh
wait <pid>
```

Resume paused (e.g., by `ctrl+z`) task in background:
```sh
bg <pid>
	# <pid>: PID (process id) or `%task_number`
```

Bring background task to foreground:
```sh
fg <pid>
```
`pid` or `%task_number` can be omitted, so the most recent task will be used.

List of active background tasks:
```sh
jobs
```
`task_number` can be found here.<br/>

---
E.g.:
```sh
# Run in subshell, mute output, save pid to `p` variable:
( curl -o ubuntu20.img https://cloud-images.ubuntu.com/minimal/releases/focal/release/ubuntu-20.04-minimal-cloudimg-amd64.img 2> /dev/null ) & p=$!
# Stop:
kill -INT $p
```

---
Live task manager:
```sh
top
	-d <sec>  # Updates interval (10 seconds by default)
```

--------------------------------------------
## Processes <a id="processes"></a>

List processes:
```sh
ps
	-A  # All
	u   # User-oriented format
	a   # All with TTY, include other users
	x   # All without TTY
	r   # Only running
	-t <tty>   # By TTY
	-p <pid>   # By PID
	-u <user>  # By user id or name
```
e.g.:
```sh
ps uaxf | grep "vscode"
```

---
Send signal to a process:
```sh
kill <signal> <pid>
	# where <signal>:
		-1  # SIGHUP
		-2  # SIGINT
		-3  # SIGQUIT
		-15 # SIGTERM (default)
		-9  # SIGKILL
	# <pid>: PID or %task_number
```

Kill process by name:
```sh
killall <name>
	-s <signal>
	-i  # Interactive
```

---
Trace process activity: syscalls and signals:
```sh
strace -p <pid>
```

---
Pause current process:
```sh
sleep <n_sec>
```


================================================================================
# IO <a id="io"></a>

Flush any buffered data out to disk:
```sh
sync
```

----------------------------------------------
## Basic print/read <a id="io-basic"></a>

Print to `stdout`:
```sh
echo <value>
	-n  # Without ending newline
	-e  # Enable escape-sequences
	-E  # Supress escape-sequences
```

Read line from `stdin` into variable(s):
```sh
read <varname>...
	-p <prompt>  # Show prompt
	-s  # Hide input
	-r  # Don't allow backslash escaping
	-a  # Split to array
	-d <char>  # Use specified character instead of EOL
	-t <sec>  # Timeout
	-n <n>  # Read max <n> chars if delimeter not received before
	-N <n>  # Read exactly <n> chars. Ignore delimeter.
	-u <fd>  # Specify FD instead of stdin
```
uses IFS as delimeter.<br/>

---
*Here document*: special-purpose code block.<br/>
Can be used to feed commands list to an interactive program.
```sh
<cmd> <<-EOF
	<some content line>
	...
EOF
```
Such a multiline string IO redirection.

---
Create/replace file descriptor:
```sh
exec N< <file>
```
where `N`: number of file descriptor.<br/>

E.g.:
```sh
exec 3< "file_to_read.txt"
read -u 3 line
echo "first line of file: $line"
```

---
### Predefined FDs:
	0  - stdin
	1  - stdout
	2  - stderr

-------------------------------------
## Input/output redirection <a id="io-redirection"></a>

Redirect input:
```sh
<target> N< <source>
```
`N` = 0 by default.

Redirect output rewriting:
```sh
<source> N> <target>  # rewrite, create if doesn't exist
```
`N` = 1 by default.

Redirect output appending:
```sh
<source> N>> <target>
```
`N` = 1 by default.

Where:<br/>
`<source>`, `<target>`: input/output - file, statements group, etc.<br/>
`N`: FD number.<br/>

E.g.:
```sh
cat >> file.txt
iconv -f cp1251 -t utf8 < album_cp1251.cue > album_utf8.cue
```

---
Redirection can be filtered or joined.<br/>
E.g.:
```sh
some_cmd 2> "$file"    # Write stderr to file
some_cmd > "$file" 2>&1     # Write both stdout and stderr to file
some_cmd &> "$file"         # same
some_cmd > "$file_out" 2> "$file_err"  # Write stdout and stderr to different files
some_cmd 1>&2    # Redirect stdout to stderr
```

---------------------------------------------
## Special files <a id="io-special-files"></a>

`/dev/null`: system's black hole.<br/>
Writing to it will always succeeds.<br/>
Reading from it is equivalent to read EOF.<br/>
It can be used e.g., to silence stdout or stderr.<br/>

e.g.:
```sh
{ command1; command2; } 2> /dev/null  # Errors will be muted
```

---
`/dev/zero`: infinite stream of null-bytes (0x00).<br/>

---
`/dev/tty`: current terminal.<br/>
Can be used to guarantee that output will reach terminal although stdout redirection.

---------------------------------------------
## Pipe <a id="io-pipe"></a>

Uses for chaining: get stdout from one command and send it to stdin of another command.

```sh
<cmd1> | <cmd2>
```
E.g.:
```sh
cat somefile | grep "word_to_search"
cat somefile | tr abc ABC > file2
```

---
To paass stdout to argument use `xargs`, e.g.:
```sh
cat url.txt | xargs wget
cat url.txt | xargs -i wget "{} something"  # with placeholder
```


================================================================================
# Filesystem <a id="fs"></a>

## Usage <a id="fs-usage"></a>

List users which are using filesystem or file:
```sh
fuser <file>
	-m <mount_point>
	-k  # Kill all found processes
	-v  # Verbose
```

View FS usage (devices/partitions used/capacity):
```sh
df [<mount_point>]
	-h  # Human-readable format
```

---------------------------------------------
## Devices <a id="fs-devices"></a>

List devices:
```sh
fdisk -l
```

List device partitions:
```sh
fdisk -l <device>
	# <device>: block device, e.g., /dev/sdb
```

List block devices:
```sh
lsblk
	-o <output>
		# comma-separated options: "name", "rm", "size", "ro",
		# "type", "fstype", "mountpoint", "label", "uuid",
		# "log-sec", "phy-sec", etc (optionally with "+" sign to append).
		# Default: name,maj:min,rm,size,ro,type,mountpoint
```

---
Copy data blocks:
```sh
dd if=<source_file|device> of=<target_file|device>
	bs=<block_size>
	count=<blocks_number>
```

-------------------------------------------------
## Mount <a id="mount"></a>

Mount filesystem:
```sh
mount <partition> <mountpoint>
	# <partition>: e.g., /dev/sdb1
	# <mountpoint>: target directory to mount
	# Options:
		-t <type>  # Filesystem type: "ext4", "ntfs", "vfat", "smbfs", etc.
		-o <rights>  # Permissions: "rw" (read,write), "ro" (readonly),
			# "force" (for repair), "remount" (change mountpoint or rights)
		--bind <dir>  # Create mirror
```
E.g.:
```sh
sudo mkdir /mnt/somemp
sudo mount /dev/sdb1 /mnt/somemp
```

Unmount filesystem:
```sh
umount <partition_or_mountpoint>
```

--------------------------------------------------
## Partitioning <a id="fs-partitions"></a>

Change partition table:
```sh
fdisk <device>
```

Format:
```sh
mkfs -t <type> <partition>
```

Change label:
```sh
mlabel -i <partition> ::<label>  # Change FAT label
ntfslabel <partition> <label>  # Change NTFS label
e2label <partition> <label>  # Change EXT label
```

---
E.g., make bootable USB:
```sh
sudo -s
umount /dev/sdb1
mkfs -t vfat /dev/sdb1
dd bs=4M if=./someimage.iso of=/dev/sdb && sync
	# or
	# cat ./someimage.iso > /dev/sdb && sync
fdisk /dev/sdb
	# then select option "a" to enable boot flag
mlabel -i /dev/sdb1 ::LIVE
```

---------------------------------------------------
Disable journaling on HFS+ to make it writable in GNU/Linux:
```sh
diskutil disableJournal /path/to/volume
```


================================================================================
# Files, directories <a id="files-dirs"></a>

## Access rights <a id="files-access"></a>

Change permissions:
```sh
chmod <value> <file>
	# <value> can be:
		# in ABC format:
			# where:
			# A - "u" (user,owner), "g" (group), "o" (others), "a" (all),
				# "ug", "uo", etc.
			# B - "+" (add permission), "=" (rewrite permission),
				# "-" (remove permission)
			# C - "r" (read), "w" (write), "x" (execute), "rw", "rwx", etc.
				# Special flags:
					# "s" - setuid|setguid (execute with owner's permissions)
					# "t" - sticky bit (only owners can delete|rename files in this directory)
			# e.g., `chmod ug+x file.txt`
		# in UGO format:
			# where:
			# U - number 0-7 - permission for owner
			# G - number 0-7 - permission for group
			# O - number 0-7 - permission for others
			# where:
				# 0 - forbidden
				# 4 - read
				# 5 - read and execute
				# 6 - read and write
				# 7 - read (4) + write (2) + execute (1)
			# e.g., `chmod 754 file.txt`
	# options:
		-R  # Recursively
		--reference <file>  # Copy privileges from another file
		-v  # Verbose
		-f  # Silent
```

---
Change owner:
```sh
chown <user>:<group> <path>
	-R  # Recursively
```
e.g.:
```sh
sudo chown -R $(whoami) some/dir
```

--------------------------------------------
## Working directory <a id="files-cwd"></a>

Print current working directory:
```sh
pwd
```

Change current working directory:
```sh
cd <dir>
```

-----------------------------------------------
## View <a id="files-view"></a>

Print list of items in directory or info about file:
```sh
ls <dir|file>...
	-a  # Show hidden (beginning with '.')
	-A  # Omit ./ and ../
	-l  # With info (chmod, size, mtime)
	-F  # Mark directories by "/" and executables by "*"
	-h  # Human-readable size (kb, mb, gb)
	-t  # Sort by modified time (desc)
	-S  # Sort by size
	-r  # Reverse order
	-s  # Show blocks number
	-d  # Directory itself instead of its content
```

---
Print size of file or directory (recursively):
```sh
du <dir|file>
	-d <n>  # Max depth
	-c  # Show grand total
	-h  # Human readable
	-s  # Print only total for each argument
```

---
Identify file type:
```sh
file <filename>
```

---------------------------------------------------
## Create, copy, remove <a id="files-crud"></a>

---
Copy file or directory:
```sh
cp <source>... <target>
	-r  # Recursively, to copy directory
	-i  # Interactive mode (will prompt before overwrite)
	-u  # Update mode (only newer or non-existing)
	-P  # Don't follow symbolic links in source
	-L  # Always follow symlinks in source
	--preserve=<attrs>  # Preserve attributes
		# Available params: "mode", "ownership", "timestamps", "context",
		# "links", "xattr", "all"
	-p  # same as `--preserve=mode,ownership,timestamps`
	-a  # Preserve all attributes
	-v  # Verbose
```

---
Move file or directory:
```sh
mv <source>... <target>
	-v  # Verbose
	-i  # Interactive mode
	-u  # Update mode
```

---
Create empty file or update mod time of existing:
```sh
touch <file>
	-c  # No not create if doesn't exist
	-a  # Only update access time
	-m  # Only update modified time
	-d <rel_date>  # Change modified time
```

---
Create directory:
```sh
mkdir <dir>
	-r  # Recursively
	-v  # Verbose
```

---
Delete file or directory:
```sh
rm <file>
	-r  # Recursively, to remove dir
	-f  # Force	- without prompt for subdirectories
	-v  # Verbose
```

---
Create link:
```sh
ln <file_target> <link_path>
	-s  # Symbolic link
	-v  # Verbose
```

Copy bytes:
```sh
dd
	bs=<c>  # Read|write up to <c> bytes at a time (e.g., "1M")
	if=<source>  # Input file or device
	of=<dest>  # Output file or device
```

---------------------------------------------
## Search <a id="files-search"></a>

Quick file search:
```sh
locate <filename>
	-i  # Ignore case
	-b  # Match only basename
	-c  # Print only count of found files
	--regex  # Use extended regex (ERE dialect)
```
Uses precompiled index.

---
Search executable location:
```sh
which <name>    # In PATH
whereis <name>  # In system dirs
```

---
Recursively search files or directories:
```sh
find <dir> <search> <action>
	# where <dir> is a directory to search in.
	# where <search> can contain:
		! <expr>          # NOT
		<expr> -o <expr>  # OR
		<expt> -a <expr>  # AND
		-name "<glob_pattern>"  # Search by filename
		-path "<glob_pattern>"  # Search by path or filename
		-mtime <n>  # By date modified (days)
			# where <n>:
				<N>  # <N> days
				+<N>  # more than <N>
				-<N>  # less than
		-type <type>  # By type
			# where <type> is:
				f  # file
				d  # directory
				c  # character device
				b  # block device
				l  # symbolic link
		-size <size>  # By size (blocks)
			# where <size> is:
				<N>  # <N> blocks
				<N>c  # <N> bytes
				<N>b  # blocks
				<N>w  # 2-byte words
				<N>k  # kilobytes
				<N>M  # megabytes
				<N>G  # gigabytes
				+<N>|+<N>c  # more than
				-<N>|-<N>c  # less than
		-user <username>
		-perm <mode>
		\( <expr> \)  # Group expressions to change precedence
	# and where <action> is an action to perform on each found item:
		-print  # Just print (default)
		-delete
		-exec <command> "{}" \;  # Execute command(s) for each found file.
			# `{}` is a placeholder for the found file path.
		-exec <command> "{}" +   # Execute once and use results as an arguments list
		-quit  # Stop execution on first match
```

e.g.:
```sh
# Update modified time recursively:
find ./* -exec touch -m {} \;
```

--------------------------------------------
## Archive <a id="files-archive"></a>

Tar:
```sh
tar <file>...
	-f <file>  # Archive file
	-C <file>  # Destination
	-x  # Extract
	-c  # Create
	-r  # Append files
	-u  # Update mode. Append files if they are newer
	-t  # List contents
	-z  # Use gzip compression
	-j  # Use bzip2 compression
```

e.g.:
```sh
# Extract gzip:
tar -xz -f ./archive.tar.gz -C ./target

#Extract bz2:
tar -xj -f ./archive.tar.bz2 -C ./target

# Extract xz:
tar -xJ -f ./archive.tar.xz -C ./target

# Gzip current directory:
tar -cz -f "../${PWD##*/}.tar.gz" .
```

---
Zip:
```sh
zip <archive_file> <file>...
	-d <file>...  # Delete files from archive
	-r  # Recursively
	-u  # Update mode
	-e  # Encrypt
```
E.g.:
```sh
zip -r ./archive.zip ./file1 ./file2 ./dir
```

---
Unzip:
```sh
unzip <archive>
	-d <path>    # Target dir
```

------------------------------------------
## Backup <a id="files-backup"></a>

Create dump:
```sh
dump -<n> <fs>
	# <n>: backup level (0 - full)
	-u  # Save date and level in /etc/dumpdates
	-f <dumpfile>
	-a  # Auto size, fill destination device
```

Restore/view dump:
```sh
restore
	-f <dumpfile>
	-x <filename>  # Restore certain file
	-r  # Restore to cwd
	-i  # Interactive restore
		# commands:
			# cd, ls, pwd, add <filename>, extract
```

-----------------------------------------
## Etc

MD5 hash:
```sh
md5sum [<file>]
```

---
HEX editor:
```sh
shed [<file>]
	-r     # Readonly
	-s <n>  # Cursor offset
```


================================================================================
# Text processing <a id="text-processing"></a>

## View <a id="text-view"></a>

View file or input with pagination:
```sh
less [<file>]
	-N  # Show line numbers
	-M  # Show prompt (number of lines, percent, filename)
```

Print beginning of file or input:
```sh
head [<file>]
	-n <lines>   # Number of lines to print
	-c <bytes>   # Bytes to print
```

Print ending of file or input:
```sh
tail [<file>]
	-n <lines>
	-c <bytes>
	-f   # Watch for updates
```

------------------------------------------
## Grep <a id="text-grep"></a>

Search by pattern in file or stdin:
```sh
grep <pattern> [<file>...]
	-r  # Recursive
	-G  # Use basic regular expression (BRE) (default)
	-E  # Use extended regular expression (ERE)
	-P  # Use perl regex
	-F  # Fixed string, don't interpret pattern as regex
	-m <n>  # Specify max count of matches
	-v  # Invert match
	-i  # Ignore case
	-w  # Match whole words
	-x  # Match whole lines
	-C <n>  # Show <n> lines around (context)
	-H  # Show filenames
	-h  # Don't show filenames
	-n  # Show line numbers
	-l  # Print only filenames
	-L  # Print only filenames of not matched
	-c  # Print only count of matched lines per file
	-q  # Supress output (will return only exit code)
	-s  # Supress warnings
```

E.g.:
```sh
ls -a | grep ".bash*"
```

----------------------------------------------
## Sed <a id="text-sed"></a>

SED: stream editor.<br/>
Applies an expression or script to the each line of input (file or stdin).

```sh
sed <expression> [<file>]
	-e <expression>  # Specify multiple expressions
		# ";" can be used as separator instead
	-f <script_file>  # File containing sed expressions
		# Also uses for interpreter script: `#!/bin/sed -f`
	-n [<print_command>]  # No printing unless an explicit request to print
	-r  # Use extended regex
	-i[<suffix>]  # Save backup (if suffix provided) and rewrite file instead of printing to stdout

	# Expression syntax:
		<address> # Address lines to work width (at beginning of expression)
			# <address> is:
				<n>  # Line number (count from 1)
					# $ - specchar for last line
				/<regex>/
		<addr1>,<addr2>  # Lines range [addr1; addr2]
		<addr1>,+<n>   # Line <addr1> and next <n> lines
		<n>~<step>    # Line <n> and every <step>'th line
		!  # Invert address restriction

		{ <commands> }  # Group commands

		p  # Print line
		=  # Print line number
		d  # Delete line
		a <str>  # Append line after current
		i <str>  # Insert line before current
		c <str>  # Replace current line or range
		s/<regex>/<repl>/<flags>  # Substitute (first occurence by default)
			# regex - basic regular expression (BRE)
			# & - specchar - found substring to past in replacement pattern
			# flags:
				<n>  # Address occurence
				g  # Global
				I  # Ignore case
		y/<chars>/<chars>/  # Transform (like `tr` command)

		h  # Put pattern buffer to hold buffer
		H  # Append to hold buffer
		x  # Exchange pattern buffer and hold buffer
		g  # Put hold buffer to pattern buffer
		G  # Append to pattern buffer

		r <file>  # Read file and paste contents after current line
		w <file>  # Write to file
		n  # Skip line
		q  # Quit (skip all next lines)
```

E.g.:
```sh
# Wrap words into parentheses on every lines exclude line 2 and write modified lines to the file:
sed "2 ! s/([a-z]+)/(\1)/g w out.txt" -r

# Wrap lines 1 and 2 and print to stdout:
sed "1,2 {
	i qwe
	a rty
}"

# Modify ES imports and rewrite files, recursively:
find ./static/ -type f -name "*.es6" | \
	xargs -i sed -r -i \
	"s/import ([a-z0-9_]+) from '(.+)'/import * as \1 from '\2'/I" {}
```

-------------------------------------------
## Lines, words, chars <a id="text-lines-words"></a>

Sort lines:
```sh
sort [<file>]
	-u    # Unique
	-n    # Numeric sort
	-f    # Ignore case
	-r    # Reverse
	-k <select>  # Sort by selected fields
		# where <select>:
			# <n> - fields from <n> to EOL
			# <n>r - reverse order
			# <n>,<m> - range [n; m]
	-t <char>   # Fields separator (whitespace by default)
```

Filter duplicated lines:
```sh
uniq
	-c  # Print duplicates with counters
	-d  # Reverse, print only duplicates
```

Select fields:
```sh
cut [<file>]
	-c <select>  # Select characters
	-b <select>  # Select bytes
	-f <select>  # Select fields
		# where <select>:
			# <n>,<m>,... - numbers of chars, bytes or fields
				# e.g., `-f 1,3` - first and third fields
			# <n>-<m> - range [m; m]
	-d <char>  # Fields delimeter (\t by default)
	-s   # Do not print lines without delimeters
```

Count lines, words, bytes:
```sh
wc [<file>]
	-l  # Count lines
	-w  # Count words
	-m  # Count chars
	-c  # Count bytes
```

Replace characters:
```sh
tr <str1> <str2>
	# replace all chars from <str1> to appropriate (by index) chars from <str2>
```

-----------------------------------------
## Diff <a id="text-diff"></a>

Show differences:
```sh
diff <file1> <file2>
	-c    # Context format
	-u   # Unified format (+, -, @@)
	-N   # Treat absent files as empty
	-a   # Treat all files as text
	-r   # Recursively compare files in subdirectories
```

E.g.:
```sh
# Replace double-spaces by tabs, then diff:
diff ./scroller.vue -u <(cat ./scroller-v2.vue | sed "/.*/ s/  /\t/g")
```

Apply diff file:
```sh
patch < <patch_file>
	-c    # Interpret diff as context
	-u    # As unified
	-p <n>   # Strip <n> leading slashes from file paths
	-i <patch_file>  # Read patch from file instead of stdin
	-o <out_file>
	-b   # Backup changing files
```


================================================================================
# Network <a id="network"></a>

IpRoute2 package: `ip`, `ss`, `bridge`, `ctstat`, etc.<br/>
https://baturin.org/docs/iproute2/<br/>

---
## `ip`

View and manipulate routing, devices, policy routing and tunnels.

---
### Interfaces <a id="network-interfaces"></a>

List network interfaces:
```sh
ip link|l
	ls up|down   # Only up|down
	-s  # Show interface statistics
```

Change interface attributes:
```sh
ip link set <device>
	up|down       # Up or down network interface
	<name>      # Rename
	mtu <mtu_number>     # Set MTU value
	multicast on|off     # Set MULTICAST flag
	address <addr>     # Set IP or MAC address
	broadcast <addr>
	promisc on|off   # Enable|disable promiscuous mode
```

Show interface attributes:
```sh
ip show <device>
```

---
Bring interface(s) up or down:
```sh
ifup|ifdown [<interface>]
	-a  # All interfaces
```

---
### Addresses <a id="network-addresses"></a>

List addresses associated with network interfaces:
```sh
ip addr|a
	-4    # Only IPv4
	-6    # Only IPv6
	show <device>   # Only specified interface
```

Add or remove ip address for interface:
```sh
ip addr add|del <addr> dev <device>
```

Broadcast address:
```sh
ip addr add|del broadcast <addr> dev <device>
```

---
### ARP table <a id="network-arp"></a>

Show ARP table entries:
```sh
ip neighbour|neigh|n
```

Add ARP entry for neighbour addr:
```sh
ip neight add <addr> lladdr <mac|lladdress> dev <device>
```

Change state:
```sh
ip neigh chg <addr> dev <device> nud <state>
	# <state>: perm|noarp|stale|reachable    # Neighbour Unreachability Detection
		# perm: valid forever and can only be removed administratively
		# noarp: can be removed when its lifetime expires
		# stale: valid but suspicious
		# reachable: valid until the reachability timeout expires

ip neigh del <addr> dev <device>
ip neigh flush <addr>
```

---
### Route table <a id="network-route"></a>

List route table entries:
```sh
ip route|r
	<addr>    # Only entries for specified address
```

Add or remove route:
```sh
ip route add|del [default] <network>/<mask>
	via <gateway>
	dev <device>
```
E.g.:
```sh
# Set network mask 255.255.255.0:
ip addr add 192.168.1.1/24 dev enp6s0
# Set default gateway:
ip route add default via 192.168.2.254
```

---
## Investigate sockets <a id="network-sockets"></a>

Dump socket statistics:
```sh
ss
	-r|--resolve   # Try to resolve numeric address/ports
	-n|--numeric   # Do not resolve
	-l|--listening   # Only listening
	-a|--all         # Show both listening and non-listening
	-e|--extended     # Show detailed information
	-p|--processes    # Show processes using socket
	-i|--i            # Show internal TCP info
	-4|--ipv4      # Show only IPv4
	-6|--ipv6      # Show only IPv6
	-0|--packet    # Show PACKET sockets
	-t|--tcp       # Show TCP
	-u|--udp       # Show UDP
	-o|--options   # Show timer information
	-s|--summary   # Print summary statistics
```

--------------------------------------------
## Telnet <a id="network-telnet"></a>

```sh
telnet <addr> <port>
	-l <user>
	-n <tracefile>  # Record trace info
	-S <tos>  # Type of service
	# commands:
		mode line|character|isig|-isig|edit|-edit
		send eof|eor|el|escape|nop|susp
		close
		quit
```
E.g., SMTP:
```sh
$ telnet 123.123.123.123 25

HELO smtp.example.com
MAIL FROM: sender@host
RCPT TO: receiver@host
DATA
Subject: some subject
some message
.
```

------------------------------------------
## Wget <a id="network-wget"></a>

Download files via http, https or ftp:
```sh
wget <url>
	-t <num>  # Number of tries
	-O <path>  # Output file
	-c  # Continue partially downloaded file
	-r  # Recursively
	-D <domain>  # Restrict only for specified domain
	-S  # Collect headers
	--spider  # Do not load content
```

-----------------------------------------
## Etc <a id="network-etc"></a>

Get public ip:
```sh
curl ifconfig.co
```

Search process by listening port:
```sh
fuser <port>/<protoocol>
```

Ping:
```sh
ping <addr>
	-s <bytes>  # Packet size
```

Trace:
```sh
traceroute <addr>
	-n  # Don't resolve names
```

Dump traffic:
```sh
tcpdump [filter]
	-i <interface>
	-c <n>  # Limit number of puckets
	-n    # Don't resolve names
	-A    # Print as ascii
	-X    # Print both numeric and ascii
	-l    # Make stdout line buffered
	-w <file>    # Dump to file
	-r <file>    # Read dump from file
	# filter:
		host <addr>
		port <n>
```

Scan ports:
```sh
nmap <target>
	-sL   # List scan
	-sn   # Ping scan
	-Pn   # No ping (skip discovery stage)
	-PS   # TCP SYN/ACK
	--disable-arp-ping
	-n    # No DNS resolution
	--dns-servers <dns_servers>
	--traceroute    # Trace hop path
	-sS, -sT, -sA, -sW, -sM    # SYN, Connect, ACK, Window, Maimon
		# TCP scan technique
	-sN, -sF, -sX  # Null, FIN, Xmas TCP scan technique
	-sY    # INIT scan SCTP technique
	-sU    # UDP scans
	-sI <zombie_host>[:<port>]    # Idle scan
	-sV    # Probe to determine service version, info
	-p <range>    # Set range of ports to scan
	-iL <file>    # List of hosts from file
```


================================================================================
# SSH <a id="ssh"></a>

```sh
apt-get install openssh-server
apt-get install openssh-client
```

Connect:
```sh
ssh <user>@<hostname> [<commands>]
	# <commands>: single quoted commands to execute
	-i <path>  # Private key for authentication (default: "~/.ssh/id_rsa")
	-p <number>  # Port number
	-A  # Forward key
	-L <local_host>:<port>:<target_host>:<port>
		# Local port forwarding
		# Creates tunnel from local_host:port to target_host:port
	-R <port>:<target_host>:<port>
		# Remote port forwarding
		# Creates tunnel from remote_server:port to target_host:port
```

Generate key pair:
```sh
ssh-keygen
	-t dsa|rsa
	-b <n>    # Length (1024 (def), 2048, 4096)
	-f <path>    # File to save keys (default: "~/.ssh/id_rsa" and "~/.ssh/id_rsa.pub")
ssh-copy-id <user>@<hostname>    # Send public key to server into remote "~/.ssh/autorized_keys" dir
	-i <path>    # Public key file (default: "~/.ssh/id-rsa.pub")
	-p <number>    # Port number
```

Convert ssh key:
```sh
puttygen -o <destfile> -O <type> <keyfile>
	# <type>: output format. "private" (putty format),
		# "private-openssh", "public" (ssh.com standard),
		# "public-openssh", "fingerprint"
```

-------------------------------------------------
Transfer files via ssh:
```sh
scp [<user_from>>@<host_from>:]<path_src> [<user_to>@<host_to>:]<path_dst>
	-i <path>  # Private key (passes to ssh)
	-P <number>  # Port number
	-p  # Preserve mtime and modes
	-r  # Recursively
	-v  # Verbose
```

Transfer files using *delta transfer algorithm* (sync, backup):
```sh
rsync [<user_from>@<host_from>:]<path_src> [<user_to>@<host_to>:]<path_dst>
	-A  # With ACL
	-a  # Recursively with symlinks and devices saving mtime, owner, group
	-b  # Backup files instead of rewriting (uses "~" prefix by default)
	-u  # Skip files which target mtime > source mtime
	-r  # Recursively
	-z  # Compress
	--exclude <pattern>  # Prevent syncing (root is a root of src)
	--delete  # Delete extraneous files from target (absent in source)
	--ignore-errors  # Delete even in case of IO errors
	--existing  # Do not create new files, only update
	--ignore-existing  # Do not update files, only create
	--devices  # Copy devices
	--specials  # Copy special files
	--links  # Copy symlinks as symlinks
	--times  # Preserve mtime
	--perms  # Preserve access permissions
	--group  # Preserve groups info
	-v  # Verbose
	# If <path_src> have trailing slash it will be the same as "/*" glob
```

E.g.:
```sh
rsync -auv --delete \
	--exclude "/files/*" --exclude "/logs" \
	./ "$user@$host:$dest"
```

---------------------------------------------------
### Client config:
`~/.ssh/config or /etc/ssh/ssh_config`

### Server config:
`/etc/ssh/sshd_config`


================================================================================
# Tmux <a id="tmux"></a>

Tmux: terminal manager.<br/>
Tmux has three levels of hierarchy: *Sessions*, *windows*, and *panes*.<br/>
*Sessions* are groups of *windows*, and *window* is a layout of *panes*.<br/>

---
Start tmux session:
```sh
tmux
# or
tmux new
	-s <name>
```

In the tmux CLI press the `Ctrl B`, then use commands available:<br/>

`d`  - Detach<br/>
`[`  - Switch to scroll mode<br/>
`q`  - Quit current mode<br/>
<br/>
`s`  - List sessions<br/>
`$`  - Rename session<br/>
<br/>
`c`  - New window<br/>
`,`  - Rename window<br/>
`&`  - Kill window<br/>

---
List active sessions:
```sh
tmux ls
```
Attach to session:
```sh
tmux a
	-t <name>
```

End session:
```sh
tmux kill-session
	-t <name>
```


================================================================================
# Vim <a id="vim"></a>

Vim: terminal text editor.

Open a file in Vim editor:
```sh
vim <file>
	-R    # Readonly
	-r    # Restore from temp backup
```

Vim will launch in *command mode*.<br/>

---
### Commands

Switch to *edit mode*:
```sh
i  # Before cursor (insert)
I  # At line start
a  # After cursor (add)
A  # At line end
o  # At new line below
O  # At new line line above
```

Switch back to *command mode*:
```sh
Esc
```

Navigate:
```sh
gg    # Go to start
G     # Go to EOF
<N>G  # Go to line N
0     # Go to line start
^     # Go to first non-whitespace char of the line
$     # Go to line end
w     # Go to next word
W     # Go to next word (skip punctuation)
w     # Go to previous word
W     # Go to previous word (skip punctuation)

Ctrl+f  # Next page
Ctrl+f  # Prev page
```

Edit:
```sh
J   # Join current and next lines

x     # Delete char after cursor
<N>x  # N chars
X     # Delete char before cursor
<N>X  # N chars

dd    # Cut current line
<N>dd # Cut current line and next N-1 lines
d0    # Cut from cursor to line start
d$    # Cut from cursor to line end
dG    # Cut from cursor to EOF

yy    # Copy current line
<N>yy # N lines
y0    # Copy from cursor to line start

v     # Start selection mode
d     # Cut selection
y     # Copy selection

p     # Paste after cursor
P     # Paste before cursor

u         # Undo
CTRL+r    # Redo
```

Search:
```sh
/    # Search after
?    # Search before
n    # Find next

:%s/<regex>/<subs>/   # Substitute first occurence for each line
:%s/<regex>/<subs>/g  # Substitute all oocurences
```

Open, Save:
```sh
:e <file>    # Open file in new buffer
:buffers     # List opened files
:b <N>  # Switch to file

:w   # Save
:w <file>    # Save to file
:w>> <file>  # Append to file
:Nw>> <file>  # Append line N to file
:N,Mw>> <file>  # Append lines [N; M] to file
:r <file>   # Read file and append below current line
:Nr <file>  # Read and append below line N
```

Quit:
```sh
:q   # Quit
:q!  # Quit without save
:cq  # Quit with non-zero exit code
```

Settings:
```sh
:set number    # Show line numbers (nonumber to disable)
:set incsearch    # Enable inremental search
:set autoindent    # Enable indentaion
:set syntax=some_lang|off    # Enable|disable syntax highlighting
```

Etc:
```sh
CTRL+g    # Show filename, size and status
.    # Repeat last command
```

-------------------------------------------
Settings can be defined in `VIMINIT` environment variable.<br/>
e.g.:
```sh
export VIMINIT='set number incsearch'
```


================================================================================
# Systemd services <a id="systemd"></a>

Systemd: create and manage services.

To create a service put *unit* file into `/etc/systemd/system/<servicename>.service` directory.

Index new unit files:
```sh
systemctl daemon-reload
```

Enable autostart on boot:
```sh
systemctl enable <servicename>
```

Start manually:
```sh
systemctl start <servicename>
```

View service info and status:
```sh
systemctl status <servicename>
```

---------------------------------
Example of unit file:
```sh
[Unit]
Description=My Service
After=network.target

[Service]
Type=simple
	# "simple", "forking", "oneshot", "dbus", "notify", "idle"
Restart=always
	# "always", "on-success", "on-failure", "on-abnormal", "on-watchdog", "on-abort"
RestartSec=0  # delay
ExecStart=/usr/local/bin/myservice.sh

[Install]
WantedBy=runlevel3.target
```


================================================================================
# User management <a id="user-management"></a>

Get current username:
```sh
whoami
```

Get user id and groups:
```sh
id <username>
```

---
Create user:
```sh
useradd <username>
	-d  <dir>  # Set home directory
	-m    # Create home if not exists
	-g <group>  # Set primary group
```

Edit user:
```sh
usermod <username>
	-L  # Lock user
	-U  # Unlock
```

Change shell:
```sh
chsh <username>
```

Change password:
```sh
passwd <username>
```

Delete user:
```sh
userdel <username>
	-r  # Delete home dir
```


================================================================================
# Miscellaneous commands <a id="misc"></a>

### Simple server

```sh
while ( nc -l 80 < <some_response_file> > : ); do
	<some_cmd>
done
```

### Watch directory and run command when any file changed

```sh
while true; do
	inotifywait -r -e MODIFY <some_dir> && <some_cmd>
done
```
Or:
```sh
fswatch -o <dir> | xargs -n1 <cmd>
```

---
### Datetime

Print time (%H:%M:%S):
```sh
date +%T
```

Print timestamp:
```sh
date +%s
```

Date to timestamp:
```sh
date -d "12/31/2016 23:59:59" +%s
```

---
### View or edit crontab

```sh
crontab
	-u <username>  # For specified user
	-e  # Edit
	-l  # Print content
	-r  # Remove
```

---
### Get system info

```sh
# CPU:
lscpu

# Hardware:
lshw
	-short

# Free memory
free
```
