================================================================================
Terminal hotkeys ===============================================================

	Ctrl+U  # cut all before cursor
	Ctrl+K  # cut all after cursor
	Ctrl+W  # cut word before cursor
	Ctrl+Y  # paste

	Ctrl+L  # clear screen
	Ctrl+S  # freeze output
	Ctrl+Q  # unfreeze

	Ctrl+C  # SIGINT - interrupt current task
	Ctrl+Z  # SIGTSTP - pause current task
	Ctrl+D  # EOF, exit

================================================================================
FHS ============================================================================

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
	/usr/  # secondary hierarchy for readonly files (unix system resources)
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

================================================================================
Package management =============================================================

	dpkg  # debian package manager
		-i <deb_file>  # install
		-r <package>     # remove package
		--purge <package>  # remove package and its dependencies
		-s <package>  # print package status details
		--list  # list all installed packages

	apt-get  # APT package handling utility
		update    # update index
		upgrade    # install newest versions of all packages
		install <package>  # install package
			-f  # attempt to fix broken dependencies
		remove <package>
		purge <package>
		-y  # automatic "yes" to prompts

	apt-cache
		show <package>  # print package records
		search <regex>  # search package in index

================================================================================
Bash basics ====================================================================

	# Bash is a dialect of Shell.

	# To make file an executable bash script:
		# 1. Add at first line shebang ("#!") with path to bash interpreter:
			#!/bin/bash
			# or:
			#!/bin/bash args
			# or:
			#!/bin/sh    # for posix shell compatible scripts
		# 2. Set executable permission for file

	#	comment
	;  # statements delimeter

	# 0 - success exit code.
	# true (or :) is NOP command that always returns 0.
	# false - command that always returns 1.

	# Bash has no types. Any command is a string.

	# Command and arguments separates by whitespaces.
	# Command becomes meaningful because how it uses.
		# Ex:
			echo "-n abc"  # "-n abc\n"
			echo -n abc  # "abc"
			echo -n `abc`  # command not found
	\	# escape specchar. also uses to escape newline.
	"some_val"  # escape most of specchars in expression. Exclude "$", "`", "\".
	'some_val'  # escape all specchars. Exclude only "'".
	$'\n\t...'  # string that contains ANSI-C escape characters

================================================================================
Statements groups ==============================================================

	{ <statement1>; <statement2>; ...; }  # statements group
		# Group interpretes as one command and returns output, so can be used
		# for IO redirection.
		# Ex:
			{
				expr1
				expr2
			} > dir/file
	( <statement1>; <statement2>; ...; )  # statements group
		# Executes in a subshell (child process). Has local scope, so vars
		# will not be available in parent scope.

	$( <command1>; <command2>; ...; )  # command substitution
		# Executes commands in a subshell and substitutes result.
		# Ex:
			a=$(
				echo "List of files:"
				ls -l
			)
			echo "$a"  # quoted to save whitespaces

	<( <cmd1>; <cmd2>; ...; )  # process substisution
		# Interprets output as file and allows its redirection.
		# Ex:
			while read line; do echo $line; done < <(ls -l | tail -n +2)
				# print lines from command output

	<command1> && <command2>  # reduced logical AND by exitcode
	<command1> || <command2>  # OR

	{<val1>,<val2>}  # variants substitution
	{<m>..<n>}  # by range
		# Command will be interpreted as command with list of arguments
		# provided by {...}.
		# Could not contain unescaped spaces!
		# Ex:
			v=2
			mkdir ./d{1," $v"}
			# or
			mkdir ./d{1,\ $v}
				# same as `mkdir ./d1 "./d 2"` or `mkdir ./d1 ./d\ 2`

	(( <expr1>, <expr2>, ... ))  # arithmetic expressions group
	$(( <expr1>, <expr2>, ... ))  # arithmetic expression substitution
		# (returns result of last)
		# Ex:
			echo $(( a = 1 + 1, b = 6 / 2 ))  # 3
			echo $a  # 2

================================================================================
Variables ======================================================================
	# (!) Always quote variable substitution!

	varname=some_value  # put|set value
		# Without spaces!

	$varname  # substitution of value
	${varname}  # same

	${varname:-default}  # value if defined and not empty, default otherwise
	${#varname}  # length
	${varname:offset:length}  # substring
	${varname/pattern/str}  # replace first match by str
	${varname/#pattern/str}  # replace if on start
	${varname/%pattern/str}  # replace if on end
	${varname//pattern/str}  # replace all matches
	${varname#pattern}  # delete shortest match on start
	${varname##pattern}  # delete longest match on start
	${varname%pattern}  # delete shortest match on end
	${varname%%pattern}  # delete longest match on end

	unset varname  # delete variable

================================================================================
Arrays =========================================================================

	arr=()  # new empty array
	arr=(<val0> <val1> ...)  # create and fill
	arr=([<index0>]=<val0> [<index1>]=<val1> ...)  # explicitly set index
	declare -a arr=(<val0> ...)  # declare array
	declare -A arr=([<key>]=<val1> ...)  # associative array

	arr[<key>]=<value>  # put|set value
	arr+=(<value>)  # append value

	${arr[<key>]}  # get item by index|key
	${arr[@]:<n>:<m>}  # slice
	${#arr[@]}  # get length

	${arr[*]}  # join values. Uses IFS as delimeter.
	${!arr[*]}  # join indexes|keys
	${arr[@]}  # iterate by values
	${!arr[@]}  # iterate by indexes|keys

	# Ex:
		files=(./*.txt)  # get filenames by glob pattern

	# Iterate:
		for val in "${arr[@]}"; do  # remember to quote!
			echo "$val"
		done

	seq <end>   # generate sequence of numbers [1; end]
	seq <start> <end>  # [start; end]
	seq <start> <step> <end>  # [start; end] with step

================================================================================
Control statements =============================================================

	if <command>; then
		...
	elif <command>; then
		...
	else
		...
	fi

	case <str> in
		<pattern1>) <command1> ;;
		<pattern2>|<pattern3>) <command2> ;;
		...
		*) <command_default> ;;
	esac

	while <command>; do
		...
	done
		# Ex:
			cancel=  # false
			n=0
			# repeat every 5 seconds until cancelled:
			while [ ! $cancel ] && sleep 5; do
				(( n++ ))
				echo "iter $n"
				[ $n -ge 5 ] && cancel=true
			done
		# Loop accepts lines from stdin:
			while IFS="" read line; do
				echo $line
			done < ./file.txt

	until <command>; do
		...
	done

	for <item> in <range>; do
		...
	done
		# Ex:
			for v in "one" "two" "three"; do
				echo "$v"
			done

	for (( <init>; <check>; <step>; )); do
		...
	done

	select <selected> in <item1> <item2> ...; do
		# will ask user to select item
		# uses PS3 as prompt
		# selected variable will contain selected item value or ""
		# REPLY will contain number of selected item (from 1)
		...
		break  # will ask again without break
	done

	# Cancel loop:
	break

	# Cancel current iteration:
	continue

================================================================================
Test command ===================================================================

	[ <expr> ]  # test command.
		# Unix-shell-compatible (POSIX).
		# <expr> can contain:
			-e <path>  # is exists
			-s <path>  # is file exists and not empty
			-f <path>  # is file
			-d <path>  # is dir
			-h <path>  # is symlink
			-r|-w|-x <path>  # is readable|writable|executable

			-t <fd>  # is file descriptor opened on a terminal
				# e.g. [ -t 0 ] - true if it's an interactive shell

			-z <str>  # is string empty
			-n <str>  # not empty
			<str1> == <str2>
			<str1> != <str2>
			<str1> \< <str2>  # ascii sorting
			<str> \> <str2>

			! <expr>  # NOT
			<expr1> -a <expr2>  # AND (not reduced)
			<expr1> -o <expr2>  # OR (not reduced)
			\( <expr> \)  # group to change precedence

			<num1> -eq <num2>  # is numbers are equal
			<num1> -ne <num2>  # not equal
			<num1> -lt <num2>  # less than
			<num1> -le <num2>  # less or equal
			<num1> -gt <num2>  # greater than
			<num1> -ge <num2>  # greater or equal
		# Ex:
			if [ $char == "a" ]; then ...

	[[ <expr> ]]  # test keyword.
		# It's more powerful but available in bash, not POSIX.
		# <expr> can contain (additional to test command):
			<str1> == <glob_pattern>  # without quotes!
			<str1> != <glob_pattern>
			<str1> =~ <regex_pattern>  # without quotes!
			<str1> < <str2>  # ascii sorting
			<str> > <str>

			<expr1> && <expr2>  # AND (reduced)
			<expr1> || <expr2>  # OR (reduced)

			( <expr> )  # group to change precedence

================================================================================
Regex ==========================================================================

	# Glob
		# Glob can be used to match string or filenames.
		# There spec characters:
			*   # any number of any chars (exclude "/" when matching filenames)
			**  # any dir|file and its subdirs (recursive *)
			?   # any single char
			[a-z]   # single char from range
			[^a-z]  # inversed
		# Glob pattern implicitly anchored from start to end of line.
			# Ex:
				ls -l ~/*.txt  # list all txt files in home dir
				rm -r ./*  # remove all files and dirs from cwd
				if [[ filename = *.png ]]; then ...

	# Extended glob
		# To enable it: `shopt -s extglob`
		# Also supports:
			?(pattern1|pattern2|...)  # zero or one occurence
			*(pattern1|pattern2|...)  # zero or more
			+(pattern1|pattern2|...)  # one or more
			@(pattern1|pattern2|...)  # one
			!(pattern1|pattern2|...)  # inverse

			# Ex:
				ls !(*.jpg|*.gif)

	# Regex in test command
		# Since bash3.0 supports =~ operator for [[]] keyword.
		# It matches string from left side by regex from right side and
		# returns 0 (matched), 1 (not matched) or 2 (incorrect pattern syntax).
			# Ex:
				if [[ some =~ ([a-z]{2})([a-z]{2}) ]]; then
					echo ${BASH_REMATCH[0]}  # "some"
					echo ${BASH_REMATCH[2]}  # "me"
				fi

	# Basic regex (BRE dialect)
		^  # beginnig of line
		$  # end of line
		.  # any char
		[a-z]  # single char from range
		[^a-z] # inversed
		<abc>  # word (space-separated sequence)
		*   # zero or more occurences

	# Extended regex (ERE dialect)
		# additionally to BRE it supports:
		+  # one or more occurences
		?  # zero or one occurence
		{n}  # n occurences of previous char or group
		{n,}  # n or more occurences
		{n,m}  # from n to m [n; m] occurences
		|  # logical OR
		()  # grouping

	# (!) Do not quote glob or regex.

================================================================================
Functions ======================================================================

	function func_name() {    # declare function
		# func body
		echo $1  # first argument
	}

	func_name  # invoke
	func_name <arg1> <arg2> ...  # invoke with arguments

	unset func_name  # delete function

	# Inside function are available:
		$FUNCNAME
		$1, $2, ...  # arguments
		$#    # number of args

	local varname=<value>  # define local variable
		# By default all variables defined inside function are available
		# in caller's scope and can overwrite existing vars.

	return <n>  # return from function
		# Function can return only number, it's like an exitcode.

================================================================================
Script =========================================================================

	$0  # command or script name
	$1, $2, ..., ${10}, ...    # arguments
		# Ex:
			sn=`basename $0`
			echo "Script name: $sn"
	$#  # number of arguments
	$@  # all arguments as string (separated by IFS)
		# Ex:
			args=("$@")  # args as array
			IFS="," echo "${args[*]}"  # print args separated by ","
	shift <n>  # shift arguments list to left (exclude $0)
		# n = 1 by default
	set <arg1> <arg2> ...  # set command line arguments

	getopts <format> <arg>  # parse one command line argument (invoke in while
		# to get all args)
		# <format> - string like "a:bc:"
			# ":" after key means that value required for this key
		# <arg> - variable that will contain key
		# to get value - OPTARG variable
		# Ex:
			while getopts "ad:" arg; do
				case $arg in
					a) a=true ;;
					d)
						if [ -d "$OPTARG" ]; then
							dir=$OPTARG
						fi ;;
				esac
			done

	exit <code>  # quit script with exitcode [0-255]. 0 means normal exit.
	$?  # stores exitcode returned by last command

	trap '<command1>; <command2>; ...' <signal>  # trap incoming signals
	trap - <signal>  # restore trap to default
	trap  # print traps list
		# It can be used to perform cleanup.
		# where signal:
			HUP
			INT
			QUIT
			TERM
			EXIT
		# Ex:
			trap 'rm -f tmpfile' EXIT
			trap 'exit $?' ERR  # exit from script when error occured

	exec <path>    # run external program. Process will be replaced
	source <path>    # run script in the current environment (like an import)
	. <path>    # same
	eval <cmd> ...  # concat and evaluate given command, return its exit code

	set -x    # enable debug mode
	set +x    # disable debug mode

================================================================================
Environment variables ==========================================================

	export <name>=<value>  # export env var to child processes

	env  # print current environment variables
	env <name>=<value>... <cmd> <arg>...
		# extend current environment with passed variables and run command

	# Predefined global env vars:
		BASH_VERSION  # string describing the version
		HOSTNAME  # hostname of your computer
		PPID      # PID of the parent process
		PWD       # current working directory
		RANDOM    # random number between 0 and 32767 (new on each expanding)
		UID       # ID number of the current user
		COLUMNS   # width of terminal in characters
		LINES     # height of terminal in characters
		HOME      # current user's home directory
		PATH      # colon-separated list of paths
		PS1       # string that describes the format of shell prompt
		TMPDIR    # directory that is used to store temporary files
		IFS       # args separator (' \t\n' by default)

	# To set env vars need to add|change it in:
		# global:
		/etc/environment

		# login shell:
		/etc/profile
		~/.profile

		# nonlogin shell:
		/etc/bashrc
		~/.bashrc

		# interactive shell:
		/etc/profile
		~/.profile
		~/.bashrc

		# noninteractive shell:
		/etc/bashrc

================================================================================
History ========================================================================

	history <N>  # print list of N last commands

	!<N>   # run command number N
	!-<N>  # -N'th command
	!<str>    # last command beginning with str
	!<str>:p  # print instead of run

	!!   # last command
	!$   # last word|argument of last command
	!*   # arguments of last command

	^a^b  # replace 'a' to 'b' in last command and run

	# precede command by the space to prevent saving in history

	Ctrl+R  # start reverse-search in history
		# press again to search next (older) command
	Ctrl+J  # stop, copy found command to input
	Ctrl+C  # cancel search

================================================================================
Processes ======================================================================

	<some_command> &  # run command in background

	$!  # contains PID of recently started background task
		# Ex:
			( sleep 10; ) & p=$!  # run and save pid
			kill -INT $p

	wait <pid>  # pause current process until specified process stop

	bg <pid>    # switch paused task to background and resume it
		# pid - PID or %task_number
	fg <pid>    # switch task to foreground
	jobs  # list of background tasks
	top  # live task manager
		-d <sec>  # update interval (10 seconds by default)

	$$  # PID of current process

	ps  # list processes
		-A  # all
		u   # user-oriented format
		a   # all with TTY, include other users
		x   # all without TTY
		r   # only running
		-t <tty>   # by TTY
		-p <pid>   # by PID
		-u <user>  # by user id or name

		# Ex:
			ps uaxf | grep "glob_to_filter"

	kill <signal> <pid>  # send signal to process
		# where <signal>:
			-1  # SIGHUP
			-2  # SIGINT
			-3  # SIGQUIT
			-15 # SIGTERM (default)
			-9  # SIGKILL
		# <pid> - PID or %task_number
	killall <name>  # kill process by name
		-s <signal>
		-i  # interactive

	strace -p <pid>  # trace process activity: syscalls and signals

	sleep <n>  # put current process to sleep for <n> seconds

================================================================================
IO =============================================================================

	echo <value>  # print line to stdout
		-n  # without ending newline
		-e  # enable escape-sequences
		-E  # supress escape-sequences

	<cmd> <<-EOF  # here document
		<some content line>
		...
	EOF
		# redirect multiline string
		# Can be used to feed commands list to an interactive program.

	exec N< <file>  # create|replace file descriptor N

	read <varname>...  # read line from stdin and put to variable(s)
		# uses IFS as delimeter
		-p <prompt>  # show prompt
		-s  # hide input
		-r  # don't allow backslash escaping
		-a  # split to array
		-d <char>  # use <char> instead of EOL
		-t <sec>  # timeout
		-n <n>  # read max <n> chars if delimeter not received before
		-N <n>  # read exactly <n> chars. Ignore delimeter.
		-u <fd>  # specify FD instead of stdin
		# Ex:
			exec 3< "file_to_read"
			read -u 3 line
			echo "first line: $line"

	<target> N< <source>  # input redirection
		# N = 0 by default
	<source> N> <target>  # output redirection (rewrite, create if doesnt exists)
		# N = 1 by default
	<source> N>> <target>  # append
		# N = 1 by default
		# where:
			<source>, <target>  # input|output (file, statements group, etc.)
			N  # FD number
		# Ex:
			cat >> file
			iconv -f cp1251 -t utf8 < album_cp1251.cue > album_utf8.cue

	# Predefined FDs:
		0  # stdin
		1  # stdout
		2  # stderr

	# Redirection can be filtered.
	# Ex:
		wrongCmd 2> "$file"    # write stderr to file
		cmd > "$file" 2>&1     # write both stdout and stderr to file
		cmd &> "$file"         # same
		cmd > "$file_out" 2> "$file_err"  # write stdout and stderr to different files
		cmd 1>&2    # write stdout to stderr

	<cmd1> | <cmd2>    # pipe, conveyer. Uses for chaining - get stdout from
		# first and send it to stdin of next command. Each command executes
		# in a subshell.
		# Ex:
			cat somefile | grep "word_to_search"
			cat somefile | tr abc ABC > file2

	/dev/null  # path to system's black hole
		# It can be used e.g. to silence stdout|stderr.
		# Ex:
			{ command1; command2; } 2> /dev/null  # errors will be suppressed

	/dev/tty  # current terminal. Can be used to guarantee that output will reach
		# terminal although stdout redirection

	sync  # flush any buffered data out to disk

================================================================================
FS =============================================================================

	fuser <file>  # list users that are using filesystem|file
		-m <mount_point>
		-k  # kill all found processes
		-v  # verbose

	fdisk -l  # list devices
	fdisk -l <device>  # list partitions
		# <device> - block device, e.g. /dev/sdb

	df [<mount_point>]  # show fs usage
		-h  # human readable
	lsblk  # list block devices
		-o <output>  # comma-separated options: "name", "rm", "size", "ro",
			# "type", "fstype", "mountpoint", "label", "uuid",
			# "log-sec", "phy-sec", etc (optionally with + sign to append).
			# default: name,maj:min,rm,size,ro,type,mountpoint

	mount <partition> <mountpoint>  # mount filesystem
		# <partition> - e.g. /dev/sdb1
		# <mountpoint> - target directory to mount
		# options:
			-t <type>  # filesystem type: "ext4", "ntfs", "vfat", "smbfs", etc,
			-o <rights>  # options, "rw" (read,write), "ro" (readonly),
				# "force" (for repair), "remount" (change mountpoint or rights)
			--bind <dir>  # create mirror
		# Ex:
			sudo mkdir /mnt/somemp
			sudo mount /dev/sdb1 /mnt/somemp
	umount <partition|mountpoint>  # unmount filesystem

	fdisk <device>  # change partition table of this device
	mkfs -t <type> <partition>  # format

	dd if=<source_file|device> of=<target_file|device>  # copy blocks of data
		bs=<block_size>
		count=<blocks_number>

	mlabel -i <partition> ::<label>  # change FAT label
	ntfslabel <partition> <label>  # change NTFS label
	e2label <partition> <label>  # change EXT label

	# Ex:
		# create bootable usb
		sudo -s
		umount /dev/sdb1
		mkfs -t vfat /dev/sdb1
		dd bs=4M if=./someimage.iso of=/dev/sdb && sync
			# or
			# cat ./someimage.iso > /dev/sdb && sync
		fdisk /dev/sdb
			# then select option "a" to set boot flag
		mlabel -i /dev/sdb1 ::LIVE

	# Disable journaling on HFS+ to make it writable in GNU/Linux:
	diskutil disableJournal /path/to/volume

================================================================================
Files ==========================================================================

	chmod <value> <file>  # set privileges
		# where <value> can be:
			ABC
				# where:
				# A - "u" (user,owner), "g" (group), "o" (others), "a" (all),
					# "ug", "uo", etc.
				# B - "+" (add permission), "=" (rewrite permission),
					# "-" (remove permission)
				# C - "r" (read), "w" (write), "x" (execute), "rw", "rwx", etc.
					# Special flags:
						# "s" - setuid|setguid (execute with owner's
						# permissions)
						# "t" - sticky bit (only owners can delete|rename
						# files in this directory)
				# e.g. `chmod ug+x file`
			UGO
				# where:
				# U - number 0-7 - permission for owner
				# G - number 0-7 - permission for group
				# O - number 0-7 - permission for others
				# where:
					# 0 - forbidden
					# 4 - read
					# 5 - read and execute
					# 6 - read and write
					# 7 - read, write and execute
				# e.g. `chmod 754 file`
		# options:
			-R  # recursive
			--reference <file>  # copy privileges from another file
			-v  # verbose
			-f  # silent
	chown <user>:<group> <path>
		-R  # recursive
		# Ex:
			sudo chown -R $(whoami) some/dir

	pwd  # print current working directory
	cd <dir>  # change current directory

	ls <dir|file>...    # print list of items in directory or
		# info about file
		-a  # show hidden (beginning with '.')
		-A  # without ./ and ../
		-l  # with info (chmod, size, mtime)
		-F  # show "/" after dir, "*" after executable file
		-h  # human-readable size (kb, mb, gb)
		-t  # sort by modified time (desc)
		-S  # sort by size
		-r  # reverse order
		-s  # show blocks number
		-d  # directory itself instead of its content
	du <dir|file>  # print size of file or directory recursively (disk usage)
		-d <n>  # max depth
		-c  # show grand total
		-h  # human readable
		-s  # print only total for each argument

	dd  # copy and convert bytes
		bs=<c>  # read|write up to <c> bytes at a time (e.g. "1M")
		if=<source>  # input file or device
		of=<dest>  # input file or device

	cp <source>... <target>  # copy file|dir
		-r  # recursive - to copy directory
		-i  # interactive mode (prompt before overwrite)
		-u  # update mode (only newer or non-existing)
		-P  # dont follow symbolic links in source
		-L  # always follow symlinks in source
		--preserve=<attrs>  # preserve attributes
			# available params: mode, ownership, timestamps, context,
			# links, xattr, all
		-p  # same as --preserve=mode,ownership,timestamps
		-a  # preserve all attributes
		-v  # verbose
	mv <source>... <target>  # move file|dir
		-v  # verbose
		-i  # interactive mode
		-u  # update mode
	touch <file>  # create empty file
		-c  # do not create if doesnt exists
		-a  # only update access time
		-m  # only update modified time
		-d <rel_date>  # change modified time
	mkdir <dir>  # create empty dir
		-r  # recursive
		-v  # verbose
	rm <file>  # remove file|dir
		-r  # recursive - to remove dir
		-f  # force	- without prompt for subdirs
		-v  # verbose
	ln <file_target> <link_path>  # create link (hard by default)
		-s  # symbolic
		-v  # verbose
	file <filename>  # identify file type

	locate <file>  # quick file search
		-i  # ignore case
		-b  # match only basename
		-c  # print only count of found
		--regex  # use extended regex
	find <dir> <search> <action>  # recursively search files|dirs in
		# <dir> by <search> pattern and perform <action> for each item
		# where <dir> is a path
		# where <search> can contain:
			\( <expr> \)  # group expressions to change precedence
			! <expr>          # NOT
			<expr> -o <expr>  # OR
			<expt> -a <expr>  # AND
			-name "<glob_pattern>"  # search by filename
			-path "<glob_pattern>"  # search by path or filename
			-mtime <n>  # by date modified (days)
				# where <n>:
					<N>  # <N> days
					+<N>  # more than <N>
					-<N>  # less than
			-type <type>  # by type
				# where <type>:
					f  # file
					d  # directory
					c  # character device
					b  # block device
					l  # symbolic link
			-size <size>  # by size (blocks)
				# where <size>:
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
		# and where <action>:
			-print  # simple print found list (default)
			-delete
			-exec <command> "{}" \;  # execute command(s) for each found file.
				# {} is a placeholder for found file path
			-exec <command> "{}" +   # execute once and use results as
				# arguments list
			-quit  # stop execution on first match
		# Ex:
			find ./* -exec touch -m {} \;  # update modified time recursively

	md5sum [<file>]  # md5 hash of file|input

	shed [<file>]  # hex editor
		-r     # readonly
		-s <n>  # cursor offset

	tar <file>...  # tar archiving
		-f <file>  # archive file
		-C <file>  # destination
		-x  # extract
		-c  # create
		-r  # append files
		-u  # update mode. Append files if they are newer
		-t  # list contents
		-z  # use gzip compression
		-j  # use bzip2 compression
		# Ex:
			tar -xz -f ./archive.tar.gz -C ./target
			tar -xj -f ./archive.tar.bz2 -C ./target
			tar -xJ -f ./archive.tar.xz -C ./target
			tar -cz -f "../${PWD##*/}.tar.gz" .

	zip <archive_file> <file>...  # zip archiving
		-d <file>...  # delete files from archive
		-r  # recursively
		-u  # update mode
		-e  # encrypt
		# Ex:
			zip -r ./archive.zip ./file1 ./file2 ./dir
	unzip <archive>
		-d <path>    # specify target dir

	dump -<n> <fs>  # backup filesystem, <n> - backup level (0 - full)
		-u  # save date and level in /etc/dumpdates
		-f <dumpfile>
		-a  # auto-size, fill dest device
	restore  # restore|view dump
		-f <dumpfile>
		-x <filename>  # restore specified file
		-r  # restore to cwd
		-i  # interactive restore
			# commands:
				# cd, ls, pwd, add <filename>, extract

================================================================================
Text processing ================================================================

	less [<file>]    # view file|input with pagination
		-N  # show line numbers
		-M  # show prompt (number of lines, percent, filename)
	head [<file>]    # print first part of file|input
		-n <lines>   # number of lines to print
		-c <bytes>   # bytes to print
	tail [<file>]    # print last part
		-n <lines>
		-c <bytes>
		-f   # watch for updates

	grep <pattern> [<file>...]  # search by pattern in contents of each
		# file or stdin
		-r  # resursive
		-G  # use basic regular expression (BRE) (default)
		-E  # use extended regular expression (ERE)
		-P  # use perl regex
		-F  # fixed string, dont interpret pattern as regex
		-m <n>  # specify max count of matches
		-v  # invert match
		-i  # ignore case
		-w  # match whole words
		-x  # match whole lines
		-C <n>  # show <n> lines around (context)
		-H  # show filenames
		-h  # dont show filenames
		-n  # show line numbers
		-l  # print only filenames
		-L  # print only filenames of not matched
		-c  # print only count of matched lines per file
		-q  # supress output (return only exit code)
		-s  # supress warnings
		# Ex:
			ls -a | grep ".bash*"

	sed <expression> [<file>]  # SED - stream editor.
		# Applies single expression or script to each line of the
		# input text (file or stdin).
		-e <expression>  # to specify multiple expressions
			# ; can be used as separator instead
		-f <script_file>  # file containing sed expressions
			# also uses for interpreter script: #!/bin/sed -f
		-n [<print_command>]  # no printing unless an explicit request to print
		-r  # use extended regex
		-i[<suffix>]  # save backup (if suffix provided) and rewrite file
			# instead of printing to stdout

		# expression syntax:
			<address> # address lines to work width (at beginning of expression)
				# <address> is:
					<n>  # line number (count from 1)
						# $ - specchar for last line
					/<regex>/
			<addr1>,<addr2>  # lines range [addr1; addr2]
			<addr1>,+<n>   # line <addr1> and next <n> lines
			<n>~<step>    # line <n> and every <step>'th line
			!  # invert address restriction

			{ <commands> }  # group commands

			p  # print line
			=  # print line number
			d  # delete line
			a <str>  # append line after current
			i <str>  # insert line before current
			c <str>  # replace current line or range
			s/<regex>/<repl>/<flags>  # substitute (first occurence by default)
				# regex - basic regular expression
				# & - specchar - found substring to past in replacement pattern
				# flags:
					<n>  # address occurence
					g  # global
					I  # ignore case
			y/<chars>/<chars>/  # transform (like tr shell command)

			h  # put pattern buffer to hold buffer
			H  # append to hold buffer
			x  # exchange pattern buffer and hold buffer
			g  # put hold buffer to pattern buffer
			G  # append to pattern buffer

			r <file>  # read file and paste contents after current line
			w <file>  # write to file
			n  # skip line
			q  # quit (skip all next lines)

		# Ex:
			sed "2 ! s/([a-z]+)/(\1)/g w out.txt" -r
				# wrap words into parentheses
				# on every lines exclude line 2 and write modified lines to file
			sed "1,2 {
				i qwe
				a rty
			}"
				# wrap 1 and 2 lines and print to stdout
			find ./static/ -type f -name "*.es6" | \
				xargs -i sed -r -i \
				"s/import ([a-z0-9_]+) from '(.+)'/import * as \1 from '\2'/I" {}
				# modify imports and rewrite files, recursively

	sort [<file>]    # sort lines
		-u    # unique
		-n    # numeric sort
		-f    # ignore case
		-r    # reverse
		-k <selec>  # sort by selected fields
			# where <selec>:
				# <n> - fields from <n> to EOL
				# <n>r - reverse order
				# <n>,<m> - range [n; m]
		-t <char>   # fields separator (whitespace by default)
	uniq  	# remove duplicate lines
		-c  # print duplicates with counters
		-d  # reverse - print only duplicates

	cut [<file>]  # select fields for each line file|input
		-c <selec>  # select characters
		-b <selec>  # select bytes
		-f <selec>  # select fields
			# where <selec>:
				# <n>,<m>,... - numbers of chars, bytes or fields
					# e.g. '-f 1,3' - first and third fields
				# <n>-<m> - range [m; m]
		-d <char>  # fields delimeter (default - tab)
		-s   # do not print lines without delimeters

	tr <str1> <str2>    # filter input - replace all chars from <str1> to
		# appropriate chars from <str2>

	wc [<file>]  # tells how many lines, words and bytes in file|input
		-l  # count lines
		-w  # count words
		-m  # count chars
		-c  # count bytes

	diff <file1> <file2>     # show differences between two files
		-c    # context format
		-u   # unified format (+, -, @@)
		-N   # treat absent files as empty
		-a   # treat all files as text
		-r   # recursively compare files in subdirectories
	patch < <patch_file>    # apply diff file
		-c    # interpret diff as context
		-u    # as unified
		-p <n>   # strip <n> leading slashes from file paths
		-i <patch_file>  # read patch from file instead of stdin
		-o <out_file>
		-b   # backup changing files

================================================================================
Network ========================================================================

	# IpRoute2 package: ip, ss, bridge, ctstat, etc.

	# ip - show/manipulate routing, devices, policy routing and tunnels
	ip link|l      # list network interfaces
		ls up|down   # only up|down
		-s  # show interface statistics

	ip link set <device>   # change interface attributes
		up|down       # up or down network interface
		<name>      # rename
		mtu <mtu_number>     # set MTU value
		multicast on|off     # set MULTICAST flag
		address <addr>     # set IP or MAC address
		broadcast <addr>
		promisc on|off   # enable|disable promiscuous mode

	ip show <device>      # show interface attributes

	ip addr|a          # list addresses associated with network interfaces
		-4    # only IPv4
		-6    # only IPv6
		show <device>   # only specified interface
	ip addr add|del <addr> dev <device>    # add|remove ip address for interface
	ip addr add|del broadcast <addr> dev <device>   # broadcast address

	ip neighbour|neigh|n    # show ARP table entries
	ip neight add <addr> lladdr <mac|lladdress> dev <device>    # add ARP entry
		# for neighbour <addr> on the <device>
		nud perm|noarp|stale|reachable    # Neigh bour Unreachability Detection
			# perm - valid forever and can only be removed administratively
			# noarp - can be removed when its lifetime expires
			# stale - valid but suspicious
			# reachable - valid until the reachability timeout expires
	ip neigh chg <addr> dev <device> nud <state>    # change state
	ip neigh del <addr> dev <device>
	ip neigh flush <addr>     # flush table entries

	ip route|r   # list route table entries
		<addr>    # only entry for specified address
	ip route add|del [default] <network>/<mask>   # add|delete new route
		via <gateway>
		dev <device>

	# Ex:
		ip addr add 192.168.1.1/24 dev enp6s0   # set network mask 255.255.255.0
		ip route add default via 192.168.2.254  # set default gateway

	# ss - investigate sockets
	ss  # dump socket statistics
		-r|--resolve   # try to resolve numeric address/ports
		-n|--numeric   # do not resolve
		-l|--listening   # only listening
		-a|--all         # show both listening and non-listening
		-e|--extended     # show detailed information
		-p|--processes    # show processes using socket
		-i|--i            # show internal TCP info
		-4|--ipv4      # show only IPv4
		-6|--ipv6      # show only IPv6
		-0|--packet    # show PACKET sockets
		-t|--tcp       # show TCP
		-u|--udp       # show UDP
		-o|--options   # show timer information
		-s|--summary   # print summary statistics

	=======================================
	fuser <port>/<protoocol>  # search process by listening port

	ifup|ifdown [<interface>]  # bring interface(s) up or down
		-a  # all interfaces

	ping <addr>
		-s <bytes>  # packet size
	traceroute <addr>
		-n  # dont resolve names

	telnet <addr> <port>
		-l <user>
		-n <tracefile>  # record trace info
		-S <tos>  # type of service
		# commands:
			mode line|character|isig|-isig|edit|-edit
			send eof|eor|el|escape|nop|susp
			close
			quit

		# Ex (smtp):
			$ telnet 123.123.123.123 25

			HELO smtp.example.com
			MAIL FROM: sender@host
			RCPT TO: receiver@host
			DATA
			Subject: some subject
			some message
			.

	wget <url>  # download files via http, https or ftp
		-t <num>  # number tries
		-O <path>  # output file
		-c  # continue partially downloaded file
		-r  # recursively
		-D <domain>  # restrict only for specified domain
		-S  # collect headers
		--spider  # do not load content

	tcpdmp [filter]  # dump traffic
		-i <interface>
		-c <n>  # limit number of puckets
		-n    # dont resolve names
		-A    # print as ascii
		-X    # print both numeric and ascii
		-l    # make stdout line buffered
		-w <file>    # dump to file
		-r <file>    # read dump from file
		# filter:
			host <addr>
			port <n>

	nmap <target>  # port scanner
		-sL   # list scan
		-sn   # ping scan
		-Pn   # no ping (skip discovery stage)
		-PS   # TCP SYN/ACK
		--disable-arp-ping
		-n    # no DNS resolution
		--dns-servers <dns_servers>
		--traceroute    # trace hop path
		-sS, -sT, -sA, -sW, -sM    # SYN, Connect, ACK, Window, Maimon
			# TCP scan technique
		-sN, -sF, -sX  # Null, FIN, Xmas TCP scan technique
		-sY    # INIT scan SCTP technique
		-sU    # UDP scans
		-sI <zombie_host>[:<port>]    # iddle scan
		-sV    # probe to determine service version, info
		-p <range>    # set range of ports to scan
		-iL <file>    # list of hosts from file

================================================================================
SSH ============================================================================

	apt-get install openssh-server
	apt-get install openssh-client

	ssh <user>@<hostname> [<commands>]    # connect
		# commands - single quoted commands
		-i <path>  # private key for authentication (default: ~/.ssh/id_rsa)
		-p <number>  # port number
		-A  # forward key
		-L <local_host>:<port>:<target_host>:<port>
			# local port forwarding
			# Creates tunnel from local_host:port to target_host:port
		-R <port>:<target_host>:<port>
			# remote port forwarding
			# Creates tunnel from remote_server:port to target_host:port

	ssh-keygen    # generate key pair
		-t dsa|rsa
		-b <n>    # length (1024 (def), 2048, 4096)
		-f <path>    # file to save keys (default: ~/.ssh/id_rsa and
			# ~/.ssh/id_rsa.pub)
	ssh-copy-id <user>@<hostname>    # send public key to server
		# to remote ~/.ssh/autorized_keys dir
		-i <path>    # public key file (default: ~/.ssh/id-rsa.pub)
		-p <number>    # port number

	puttygen -o <destfile> -O <type> <keyfile>  # convert ssh key
		# type - output format. "private" - putty format,
			# "private-openssh", "public" - standart ssh.com,
			# "public-openssh", "fingerprint"

	scp [<user_from>>@<host_from>:]<path_src> [<user_to>@<host_to>:]<path_dst>
		# copy files locally or to|from remote system over ssh
		-i <path>  # private key (passes to ssh)
		-P <number>  # port number
		-p  # preserve mtime and modes
		-r  # recursive
		-v  # verbose

	rsync [<user_from>@<host_from>:]<path_src> [<user_to>@<host_to>:]<path_dst>
		# copy files locally or to|from remote system over ssh. Uses delta
		# transfer algorithm.
		-A  # with ACL
		-a  # recursive with symlinks and devices saving mtime, owner, group
		-b  # backup files instead of rewriting (uses "~" prefix by def)
		-u  # skip files which target mtime > source mtime
		-r  # recursive
		-z  # compress
		--exclude <pattern>  # prevent syncing (root - root of src)
		--delete  # delete extraneous files from target (absent in source)
		--ignore-errors  # delete even if there IO errors
		--existing  # skip creating new files
		--ignore-existing  # skip updating files
		--devices  # copy devices
		--specials  # copy special files
		--links  # copy symlinks as symlinks
		--times  # preserve mtime
		--perms  # preserve access permissions
		--group  # preserve groups info
		-v  # verbose
		# if <path_src> have trailing slash - it will be same as /* glob
		# Ex:
			rsync -auv --delete \
				--exclude "/files/*" --exclude "/logs" \
				./ "$user@$host:$dest"

	# client config:
		~/.ssh/config or /etc/ssh/ssh_config

	# server config:
		/etc/ssh/sshd_config

================================================================================
Tmux ===========================================================================

	# Tmux - terminal manager.
	# Tmux has three levels of hierarchy: Sessions, windows, and panes.
	# Sessions are groups of windows, and a window is a layout of panes.

	tmux  # start the tmux session
	tmux new
		-s <name>

	# In Tmux press the ctrl+b, then:
		d  # detach
		[  # switch to scroll mode
		q  # quit current mode

		s  # list sessions
		$  # rename session

		c  # new window
		,  # rename window
		&  # kill window

	tmux ls  # list of the running sessions

	tmux a  # attach to the tmux session
		-t <name>

	tmux kill-session
		-t <name>

================================================================================
Services =======================================================================

	# Systemd - create and manage services.

	# To create service put unit file
	# into /etc/systemd/system/<servicename>.service directory.

	systemctl
		daemon-reload  # index new unit files
		enable <servicename>  # enable autostart at boot
		start <servicename>  # start manually
		status <servicename>  # view service info and status

	# Example of unit file:
		[Unit]
		Description=My Service
		After=network.target

		[Service]
		Type=simple
			# simple, forking, oneshot, dbus, notify, idle
		Restart=always
			# always, on-success, on-failure, on-abnormal, on-watchdog, on-abort
		RestartSec=0  # delay
		ExecStart=/usr/local/bin/myservice.sh

		[Install]
		WantedBy=runlevel3.target

================================================================================
Vim ============================================================================

	vim <file>  # open file in vim editor
		-R    # readonly
		-r    # restore from temp backup

	# Vim will launch in command mode.
	# commands:
		CTRL+g    # show filename, size and status

		i  # activate edit mode before cursor (insert)
		I  # at line start
		a  # after cursor (add)
		A  # at line end
		o  # at new line below
		O  # at new line line above
			# will be switched to editor mode

		ESC    # switch back to command mode

		.    # repeat last command

		gg    # go to start
		G     # go to EOF
		<N>G  # go to line N
		0     # go to line start
		^     # go to first non-whitespace char of the line
		$     # go to line end
		w     # go to next word
		W     # go to next word (skip punctuation)
		w     # go to previous word
		W     # go to previous word (skip punctuation)

		Ctrl+f  # next page
		Ctrl+f  # prev page

		J   # join current and next lines

		x     # delete char after cursor
		<N>x  # N chars
		X     # delete char before cursor
		<N>X  # N chars

		dd    # cut current line
		<N>dd # cut current line and next N-1 lines
		d0    # cut from cursor to line start
		d$    # cut from cursor to line end
		dG    # cut from cursor to EOF

		yy    # copy current line
		<N>yy # N lines
		y0    # copy from cursor to line start

		v     # start selection mode
		d     # cut selection
		y     # copy selection

		p     # paste after cursor
		P     # paste before cursor

		u    # undo
		CTRL+r    # redo

		/    # search after
		?    # search before
		n    # find next

		:%s/<regex>/<subs>/   # substitute first occurence for each line
		:%s/<regex>/<subs>/g  # substitute all oocurences

		:e <file>    # open file in new buffer
		:buffers     # list opened files
		:b <N>  # switch to file

		:w   # save
		:w <file>    # save to file
		:w>> <file>  # append to file
		:Nw>> <file>  # append line N to file
		:N,Mw>> <file>  # append lines [N; M] to file
		:r <file>   # read file and append below current line
		:Nr <file>  # read and append below line N

		:q   # quit
		:q!  # quit without save
		:cq  # quit with non-zero exit code

		:set number    # show line numbers (nonumber to disable)
		:set incsearch    # enable inremental search
		:set autoindent    # enable indentaion
		:set syntax=some_lang|off    # enable|disable syntax highlighting

	# settings can be defined in VIMINIT environment variable:
		# Ex:
			export VIMINIT='set number incsearch'

================================================================================
Miscellaneous ==================================================================

	man <cmd>
	while ( nc -l 80 < <some_response_file> > : ) ; do <some_cmd> ; done
		# simple server

	curl ifconfig.co  # get public ip

	while true; do
		inotifywait -r -e MODIFY <some_dir> && <some_cmd>
	done  # watch on directory and run command when any file changed

	date +%T  # print time (%H:%M:%S)
	date +%s  # print timestamp
	date -d "12/31/2016 23:59:59" +%s  # date to timestamp

	cat url.txt | xargs wget  # pass stdout to argument
	cat url.txt | xargs -i wget "{} something"  # with placeholder

	which <name>    # search executable in PATH
	whereis <name>  # search executable in system dirs
	locate <name>   # search file using precompiled index

	whoami  # current username
	id <username>  # user id and groups

	useradd <username>  # create user
		-d  <dir>  # set home directory
		-m    # create home if not exists
		-g <group>  # set primary group
	usermod <username>  # edit user
		-L  # lock user
		-U  # unlock
	chsh <username>
	passwd <username>  # change password
	userdel <username>
		-r  # delete home dir

	crontab  # view|edit user's crontab
		-u <username>  # for specified user
		-e  # edit
		-l  # print content
		-r  # remove

	lscpu  # display info about cpu
	lshw  # display info about hardware
		-short
	lsblk  # list block devices
	free  # display free memory
