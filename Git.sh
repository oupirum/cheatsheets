
================================================================================
Config =========================================================================

	git config -e  # edit .gitconfig
		--local  # for current repository
		--global  # globally for user

# ~/.gitconfig example:
	[user]
		name = oupirum
		email = oupirum@gmail.com
	[core]
		autocrlf = input
			# true - replace crlf to lf and vice-versa (for windows)
			# input - only replace crlf to lf on commit (for linux|mac)
			# false - disable
		safecrlf = warn
			# true - refuse irreversible autocrlf changes
			# warn - only show warn message
		editor = vim
	[alias]
		hist = log --pretty=format:\"%C(red)%h%Creset %C(green)%ad%Creset%C(yellow)%d%Creset | %s\n  %C(blue)[%an <%ae>]%Creset\n\" --graph --date-order --date=short
		hists = log --pretty=format:\"%h %ad%d | %s\n  [%an <%ae>]\n\" --graph --date-order --date=short --all
		co = checkout
		st = status
		pushit = !git push origin $(git rev-parse --abbrev-ref HEAD)
		pullit = !git pull origin $(git rev-parse --abbrev-ref HEAD)

================================================================================
Create repo ====================================================================

	mkdir repodir
	cd repodir
	git init  # create new repo in cwd

================================================================================
Staging, commit ================================================================

	git status

	git add <file>  # stage for commit file|dir
		--all  # include removals
		-p|--patch  # interactively select hanks

	git reset <file>  # unstage file
	git reset <hash>  # reset HEAD to the specified state
		--mixed  # reset index (default)
		--soft  # reset only head point to; doesn't touch index and working tree
		--hard  # reset both index and working tree

	git update-index --assume-unchanged <file>  # temporarily ignore

	git rm <file>  # unstage and remove
		--cached  # remove from index ("forget", stage file for removal)

	git apply <patch_file>  # apply patch file generated from diff

	git commit
		-m <message>
		--amend  # change previous commit

	git diff  # show differences in working area
		--staged  # in staged area
		--only-name
		--word-diff=<mode>  # none, color, plain, porcelain
	git diff <file>
	git diff <hash> <file>  # between commit and working area
	git diff <hash1> <hash2>  # between two specified commits
	git diff <hash1>:<file> <hash2>:<file>

	git clean [<path>]  # recursively remove untracked files
		-n  # only show what would be done
		-d  # remove directories too
		-f  # force

		-x  # use -e for ignoring instead of .gitignore
		-e <pattern>  # exclude
		-X  # remove only ignored

================================================================================
Stashing =======================================================================

	git stash  # stash the working tree
	git stash push [<paths>...]  # create and push new stash entry
		-m <message>
		-u  # include untracked
			# (stash and then clean up)
		--all    # include also ignored files
			# (stash and then clean up)
		-p|--patch  # interactively select hanks
			# keep index by default
		-k|--keep-index  # keep staged changes untouched
		--no-keep-index
	git stash create <message>   # create new stash entry (returns hash)
	git stash store -m <message> <hash>  # put stash entry to list
	git stash list             # list all stash entries
	git stash show -p <stash>  # view stash content
		# <stash> - stash@{N} or stash^{/regex}
	git stash apply <stash>    # apply from stash entry
	git stash pop <stash>      # apply and delete stash entry
	git stash drop <stash>     # delete stash entry

================================================================================
Commits ========================================================================

	git log  # print history of commits
		--all  # all branches
		--graph  # tree view
		--topo-order  # default
		--date-order  # order by date
		--max-count <n>  # limit
		--since <date> --until <date>
			# date - string like "2013-01-31 01:30:00", "7 days ago", etc.
		--first-parent  # show only first parent commit for merged branch
		-S <str>    # search for commits where str added or deleted
		-G <regex>  # search by regex
	git shortlog

	git show <hash>  # view commit

	git checkout <hash|tag|branch>  # reset to certain commit or head
	git checkout <hash|tag|branch> -- <file>  # only specified file
	git revert <hash|tag>  # revert certain commit to it previous

	git tag <name>  # create tag for current commit
	git tag <name> <hash>  # create tag for certain commit
		-a <name> -m <message>  # create annotated tag

	git reflog  # history of refs

================================================================================
Branches =======================================================================

	git branch  # list branches
		-a  # both local and remote
		--merged|--no-merged

	git branch <new_branch>  # create new branch
	git checkout -b <new_branch>  # create new branch and switch to it
	git checkout -b <new_branch> <from_branch>

	git branch -m <branch> <newname>  # rename

	git branch -d <branch>  # delete branch
		-r  # remote tracking

	git merge <branch>  # merge branch to current
		--no-commit
		-s|--strategy resolve|recursive|octopus|ours|subtree
		-X theirs|ours  # to prefer those|these changes if there are conflicts
			# for recursive strategy
		--squash  # squash merged commits into one
	git merge --abort  # cancel merge

	git rebase <branch>  # reapply current on top of specified branch
		-i [HEAD~<N>]  # interactive mode (e.g. for squashing)
			# N - number of last commits to rebase
		-s|--strategy recursive|resolve|octopus|ours|subtree
	git rebase --continue  # continue rebase (e.g. after fixing conflicts)
	git rebase --skip  # skip step
	git rebase --abort  # cancel rebase

	git cherry-pick <hash>...  # apply given commits on the current branch
		-e  # edit commit messages
		-m  # parent number of the mainline
		--ff  # fast forward (if head is the same as parent of picked)

	git cherry-pick --continue
	git cherry-pick --quit  # skip
	git cherry-pick --abort

================================================================================
Remote =========================================================================

	git clone <repository> <target_dir>  # create clone of repo
		--bare  # create "clean" clone, that uses as shared repo

	git remote add <remote> <repository>  # set repo as remote for current

	git remote rm <remote>

	git remote  # list remote repos
	git remote show <remote>  # show info

	git fetch <remote> <branch>  # refresh from remote repo
	git pull <remote> <branch>  # fetch and merge
		# same as 'fetch origin branch; merge origin/branch'
		--rebase  # pull and rebase
			# e.g. 'pull --rebase origin master' is same as:
			# 'checkout master; pull origin master;
			#  checkout current_branch; rebase master'
		-s|--strategy recursive|resolve|octopus|ours|subtree

	git push <remote> <branch>  # push local branch to remote repo
		--tags  # with tags
		-f  # force (for diverged branch)
	git push <remote> :<remote_branch>  # override remote branch
	git push <remote> <local_branch>:<remote_branch>

	git push <remote> --delete <branch>  # delete remote branch
	git remote prune <remote>  # remove stale remote-tracking branches
		--dry-run  # only show what will be pruned

================================================================================
Worktree =======================================================================

	# Multiple working trees attached to the same repository

	git worktree add <dir> [<branch>]  # create new worktree
		-b <new-branch>  # create new branch
	git worktree list  # list associated worktrees
	git worktree remove <worktree>  # delete specified
	git worktree prune  # clean up stale worktree files

================================================================================
.gitignore =====================================================================

	# To ignore dir or file need to add it to .gitignore file:

		# <repo>/.gitignore:
		dirname/
		filename

================================================================================
git flow =======================================================================

	# High-level operations for Driessen branch model
	# There branches: develop, feature, release, master, hotfix

	git flow init  # in repo dir

	git flow feature start <feature>  # create branch <feature> from develop
	git flow feature finish <feature>  # merge <feature> into develop
	git flow feature publish <feature>
	git flow feature pull <remote> <feature>

	git flow release start <release> [from_hash]  # create release branch
		# from develop,
		# optionally from certain commit
	git flow release finish <release>  # merge release into master and
		# back into develop
	git flow release publish <release>
	git flow release pull <remote> <release>

	git flow hotfix start <version> [from_hash]  # create hotfix branch
		# from master
	git flow hotfix finish <version>  # merge hotfix into develop and
		# back into master
	git flow hotfix publish <version>
	git flow hotfix pull <remote> <version>

	# use -k option to keep branch after finish

================================================================================
git grep =======================================================================

	# Grep search in working tree

	git grep "pattern"
		-G  # use basic regex (default)
		-E  # use extended regex
		-F  # fixed string, dont interpret pattern as regex
		--cached  # include staged
		--no-index  # include not staged
		--untracked  # include untracked
		-v  # invert match
		-i  # ignore case
		-w  # match whole words
		-n  # show line numbers
		-P  # show preceding lines
		-h  # dont show filenames
		-l  # print only filenames
		-c  # print only count of matched lines per file

================================================================================
git hook example ===============================================================

	# Hook that prepend ticket identifier to commit messages

	# ./.githooks/commit-msg
		#!/bin/sh
		# Get the current branch name
		BRANCH_NAME=$(git symbolic-ref --short HEAD)
		# Check it matches the pattern "AB-123_some-branch-name"
		if [ $(echo $BRANCH_NAME | grep -cEi "^(feature|bugfix)\/([a-z]+-[0-9]+)_.*") -eq 1 ]; then
			# Trim it to get the ticket identifier
			TICKET=$(
				echo $BRANCH_NAME \
				| sed -r \
					-e 's/^(feature|bugfix)\/([a-z]+-[0-9]+)_.*/\2/I' \
					-e 'y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/'
			)
		fi
		# Preprend the ticket identifier to the commit message
		if [ -n "$BRANCH_NAME" ] && [ -n "$TICKET" ] && [ $(grep -cF "$TICKET" $1) -eq 0 ]; then
			sed -i.bak -e "1s/^/$TICKET: /" $1
		fi

	# Enable:
		git config core.hooksPath .githooks
