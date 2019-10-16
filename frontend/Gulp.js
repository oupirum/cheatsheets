
// Gulp - task runner and build system.
// Uses imperative config.
// Performs tasks asynchronously.
// All tasks must be defined in gulpfile.js file in project root.
// Plugins: http://gulpjs.com/plugins/

================================
// Install
{
	$ npm install --save-dev gulp
	
	// then create gulpfile.js file in project root
	
	// Run:
		$ gulp task_name  // will run specified task
	
}
================================
// Defining tasks
{
	// Tasks must be defined in gulpfile.js
	
	var gulp = require('gulp');
	
	gulp.task(name [, dependsOn[]] [, func([done([err])])])  // create task
		// name - task name (to run by `gulp task_name`)
			// use 'default' name to run it without name (simply `gulp`)
		// dependsOn[] - list of task names that will be done before this task
			// dependsOn tasks must return stream or invoke done()
		// callback - task code
		// done([err]) - callback to tell when it's done or failure
	
	gulp.src(fileGlob[] [, options]) : Readable  // read source
		// fileGlob - extended glob to match input files
		// options - object:
		{
			base: path,  // specify basedir for dest, default - everything
				// before a glob starts
			cwd: process.cwd(),
			read: true,
			buffer: true
		}
	gulp.dest(path [, options]) : Writable  // write results
		// path - destination dir
		// options - object:
		{
			cwd: process.cwd(),
			mode: 0777
		}
	
	gulp.watch(fileGlob[] [, options], task[])  // setup watcher for changes
		// of matched files
		// options - object:
		{
			interval: 100,
			debounceDelay: 500,
			mode: 'auto',
			cwd: process.cwd()
		}
		// task[] - task names to run
	gulp.watch(fileGlob[] [, options, func(event)])
		// event - object:
		{
			path: file,
			type: eventType
		}
		// Emits events:
			added
			changed
			renamed
			deleted
}
================================
// Plugins
{
	// Run sequence
		$ npm install --save-dev run-sequence
		
		var run = require('run-sequence');
		run(task1, ... [, func([err])])
		
		// Ex:
			gulp.task('build', function(done) {
				runSequence('build-clean',
						['build-scripts', 'build-styles'],
						'build-html',
						done);
			});
	
	// Preprocess
		$ npm install --save-dev gulp-preprocess
		
		var preprocess = require('gulp-preprocess');
		preprocess(options) : Writable
			// options:
			{
				context: scopeObj,
				includeBase: path
			}
		
		// Directives
			// Adds as comments, e.g.:
				// html:
				<!--@ifdef SOME_VAR-->
					some content
				<!--@endif-->
				// js:
				// @ifdef SOME_VAR
					some content
				// @endif
			
			@if VAR='value' ... @endif
			@ifdef VAR ... @endif
			@ifndef VAR ... @endif
			@include some_file
			@exclude ... @endexclude
			@echo VAR
			@foreach $VAR in ARR ... @endfor
			@exec FUNCTION(arg1, arg2, ...)
	
	// Inject
		$ npm install --save-dev gulp-inject
		
		var inject = require('gulp-inject');
		inject(sources) : Writable
		
		// Directive
			<!-- inject:css -->
			<!-- endinject  -->
			
			<!-- inject:js -->
			<!-- endinject -->
		
		// Ex:
			gulp.task('inject', function() {
				var sources = gulp.src(['app/**/*.js'], {read: false});
				var target = gulp.src('build/index.html');
				return target.
						pipe(inject(sources)).
						pipe(gulp.dest('build'));
			});
	
	// Filter for changed files
		$ npm install --save-dev gulp-changed
		
		var changed = require('gulp-changed');
		changed(path) : Writable
			// path - destination dir
		
		// Ex:
			gulp.task('build', function() {
				gulp.src(['app/**/*.js']).
						pipe(changed('build')).
						pipe(minify()).
						pipe(gulp.dest('build'));
			});
	
	// Delete files|dirs
		$ npm install --save-dev del
		
		var del = require('del');
		del(glob[]) : Readable
	
	// Rename
		$ npm install --save-dev gulp-rename
		
		var rename = require('gulp-rename');
		rename(newFilename) : Writable
		rename(options) : Writable
			// options:
			{
				dirname: './',
				basename: 'filename',
				prefix: 'prefix-',
				suffix: "-suffix",
				extname: ".ext"
			}
	
	// Concat files
		$ npm install --save-dev gulp-concat
		
		var concat = require('gulp-concat');
		concat(targetFilename) : Writable
	
	// Compress images
		$ npm install --save-dev gulp-imagemin
		
		var imagemin = require('gulp-imagemin');
		imagemin() : Writable
	
	// Minify js
		$ npm install --save-dev gulp-uglify
		
		var minify = require('gulp-uglify');
		minify() : Writable
	
	// JSHint
		$ npm install --save-dev jshint gulp-jshint
		
		var jshint = require('gulp-jshint');
		jshint() : Writable
		jshint.reporter() : Writable
		
		// Ex:
			gulp.task('lint', function() {
				return gulp.src(['app/**/*.js']).
						pipe(jshint()).
						pipe(jshint.reporter());
			});
	
	// Polyfill
		$ npm install --save-dev gulp-autopolyfiller
		
		var polyfiller = require('gulp-autopolyfiller');
		polyfiller(targetFilename [, options]) : Writable
			// options:
			{
				browsers: string[],  // e.g. 'last 2 versions', '> 5%',
					// 'ie 7', 'ie 8', 'ios 6', 'android 4'
					// Default: ['1%', 'last 2 versions', 'Firefox ESR']
			}
		
		// Ex:
			gulp.task('polyfill', function() {
				return gulp.src(['app/**/*.js'], {base: '.'}).
						pipe(concat('all.js')).
						pipe(polyfiller('polyfill.js')).
						pipe(gulp.dest('polyfill'));
			});
	
	// TypeScript
		$ npm install --save-dev gulp-typescript
		
		var ts = require('gulp-typescript');
		ts(options) : tsRes
			// options:
			{
				declaration: false,
				out: path,
				noImplicitAny: false,
				strictNullChecks: false,
				noImplicitThis: false,
				// & etc
			}
		tsRes.js.pipe(dest)  // emits .js
		tsRes.dts.pipe(dest)  // emits .d.ts
		
		// Ex:
			gulp.task('compile', function() {
				return gulp.src('src/*.ts').
						pipe(ts({
							noImplicitAny: true,
							out: 'app.js'
						})).
						pipe(gulp.dest('build'));
			});
	
	// Minify CSS
		$ npm install --save-dev gulp-csso
		
		var csso = require('gulp-csso');
		csso([options]) : Writable
			// options:
			{
				restructure: true
			}
	
	// Remove unused CSS
		$ npm install --save-dev gulp-uncss
		
		var uncss = require('gulp-uncss');
		uncss(options) : Writable
			// options:
			{
				html: path[],  // html files (paths or globs)
				ignore: selector[]
			}
	
	// Add CSS vendor-prefixes
		$ npm install --save-dev gulp-autoprefixer
		
		var prefixer = require('gulp-autoprefixer');
		prefixer(options) : Writable
			// options:
			{
				browsers: string[],  // e.g. 'last 2 versions', '> 5%',
					// 'ie 7', 'ios 6', 'android 4'
				cascade: true,
				add: true,
				remove: true
			}
	
	// Sourcemaps
		$ npm install --save-dev gulp-sourcemaps
		
		var sourcemaps = require('gulp-sourcemaps');
		sourcemaps.init() : Writable
		sourcemaps.write(path) : Writable  // write sourcemap files to
			// specified dir,
			// '.' - put sourcemap to same dir as source file
	
	// Server
		$ npm install --save-dev browser-sync
		
		var server = require('browser-sync').create();
		server.init(options)
			// options:
			{
				server: {
					baseDir: path,
					directory: false
				},
				host: 'localhost',
				port: 3000,
				reloadDelay: 0
			}
		server.reload()
}
================================
// Example
{
	$ npm install --save-dev \
		del gulp-uglify gulp-csso gulp-sourcemaps browser-sync
	
	// /gulpfile.js:
	var gulp = require('gulp');
	var del = require('del');
	var minify = require('gulp-uglify');
	var csso = require('gulp-csso');
	var sourcemaps = require('gulp-sourcemaps');
	var server = require('browser-sync').create();
	
	var Path = {src:{}, build: {}};
	Path.src.all = ['www/**/*'];
	Path.build.dir = 'build';
	Path.build.all = ['build/**/*'];
	Path.src.js = ['www/js/**/*.js', '!www/js/**/*.min.js'];
	Path.build.js = 'build/js';
	Path.src.css = ['build/**/*.css'];
	Path.build.css = 'build/css';
	
	gulp.task('build', ['build:copy'], function() {
		gulp.src(Path.src.js).
				pipe(sourcemaps.init()).
				pipe(minify()).
				pipe(rename({suffix: ".min"})).
				pipe(sourcemaps.write(Path.build.js)).
				pipe(gulp.dest(Path.build.js));
		
		gulp.src(Path.src.css).
				pipe(sourcemaps.init()).
				pipe(csso({
					restructure: false
				})).
				pipe(rename({suffix: ".min"})).
				pipe(sourcemaps.write(Path.build.css)).
				pipe(gulp.dest(Path.build.css));
	});
	
	gulp.task('build:copy', function() {
		return gulp.src(Path.src.all).
				pipe(gulp.dest(Path.build.dir));
	});
	
	gulp.task('build:clear', function() {
		return del(Path.build.all);
	});
	
	
	gulp.task('serve', ['build'], function() {
		server.init({
			server: {
				baseDir: Path.build,
			},
			port: 8081
		});
		
		gulp.watch(Path.src.all, ['build']);
		gulp.watch(Path.build.all).on('change', server.reload);
	});
	
	// Run:
		$ gulp build
}
