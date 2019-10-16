
// Grunt - task runner.
// Uses declarative config.
// Config with tasks must be defined in Gruntfile.js (or Gruntfile.coffee).
// Plugins: http://gruntjs.com/plugins/

================================================================================
Install & run ================================================================={
	
    $ npm i -g grunt-cli
	$ npm i --save-dev grunt \
			grunt-contrib-concat grunt-contrib-uglify grunt-contrib-jshint ...
	
	// Run:
		$ grunt <task_name>
		// or:
		$ grunt <task_name>:<argument>...
		// or:
		$ grunt  // "default" task
		
			-h  // display tasks list
			-b path  // set base path (default - dir where gruntfile placed)
			--stack  // print stack trace if error occurs
}
================================================================================
Config ========================================================================{
    
	// /Gruntfile.js:
	module.exports = function(grunt) {
		grunt.initConfig({
			
			pkg: grunt.file.readJSON('package.json'),
			...,  // any arbitrary properties
			
			concat: {
				// config for "concat" task (from grunt-contrib-concat plugin)
				
				options: {
					// plugin|task-specific options
					separator: ';'
				},
				...,  // any arbitrary properties,
				
				// src-dest definition, compact format:
				someTarget: {
					src: ['src/a.js', 'src/b.js'],
						// glob or array of globs
					dest: 'build/dist.js'
					
					// also available properties:
						filter: (path)=> bool
						matchBase: bool  // match pattern without slashes
							// as basename
						dot: bool  // allow matching with implicit "."
						nonull: bool  // if true will include
							// non-matching patterns
				},
				// files object format:
				someTarget: {
					files: {
						'build/dist.js': ['src/a.js', 'src/b.js'],
						...
					}
				},
				// files array format:
				someTarget: {
					files: [
						{
							src: ['src/a.js', 'src/b.js'],
							dest: 'build/dist.js'
						},
						...
					]
				},
				// files object and files array allows multiple
				// src-dest per target
				...
			},
			...  // any other tasks
			
			// Any string in gruntfile can contain templates
			// like "<%= some_expr %>".
			// Template resolved in context of config object,
			// and also grunt object available.
		});
		
		grunt.loadNpmTasks('grunt-contrib-concat');
		...  // load any other plugins
		
		grunt.registerTask('default', ['concat:someTarget', 'my-task']);
			// define alias for sequence of tasks
			// subtasks performing order - from left to right
		
		grunt.registerTask('my-task', 'Description', function(arg1) {
			// define custom task
			console.log(this.name);
		});
	};
}
================================================================================
Plugins ======================================================================={
    
	// Plugins from NPM must be loaded by grunt.loadNpmTasks(pluginName).
	
	// Concat
		$ npm i --save-dev grunt-contrib-concat
		
		options: {
			separator: '\n',
			banner: '',
			footer: '',
			process: false  // preprocess sources as grunt templates
		}
	
	// Uglify
		$ npm i --save-dev grunt-contrib-uglify
		
		options: {
			banner: '',
			footer: '',
			sourceMap: false,  // default - <file>.map
			sourceMapName: undefined  // customize name or location
		}
	
	// Lint
		$ npm i --save-dev grunt-contrib-jshint
		
		options: {
			globals: null, // object like {varName: bool, ...}
				// if value is true - determine assignment
			jshintrc: null,  // true - search for .jshintrc file,
				// string - explicitly specify path to rc file
			extensions: null,  // list of non-dot-js extensions to check
			ignores: null  // list of files|dirs to skip
		}
	
	// Watch
		$ npm i --save-dev grunt-contrib-watch
		
		files: [],
		tasks: [],
		options: {
			debounceDelay: 500,  // ms
			livereload: false
		}
	
	// Jasmine
		$ npm i --save-dev grunt-contrib-jasmine
		
		src: [],  // source files
		options: {
			specs: [],  // specs files
			helpers: [],  // helper files (loaded before srcs, specs, helpers)
			vendor: []  // libraries (loaded before helpers)
		}
	
	// Clean
		$ npm i --save-dev grunt-contrib-clean
		
		src: []
}
================================================================================
Define custom task ============================================================{
    
	// Basic task
		
		grunt.registerTask(name, descr, func([arg, ...]) : bool)
			// func - task body, this contains properties:
				name : string  // name of the task
			// args can be passed as arguments in
			// `gulp` cmd (`gulp task:arg1:arg2`)
			// returns false on failure
	
	// Multi task
		// Can have configuration and multiple targets.
		// Configuration placed in property of the same name in the config
		// object.
		
		grunt.registerMultiTask(name, descr, func())
			// func - task body, this contains properties:
				target : string  // name of the current target
				data : object  // value of the current target object
			// certain target can be launched by specifying target as
			// argument in `gulp` cmd (`gulp task:target`)
			
			// Ex:
				grunt.initConfig({
					some: {
						foo: [1, 2, 3],
						bar: 'hello some',
					}
				});
				
				grunt.registerMultiTask('some', 'Blah blah', function() {
					grunt.log.writeln(this.target + ': ' + this.data);
				});
				
				$ gulp some:foo  // "foo: 1,2,3"
				$ gulp some  // "foo: 1,2,3\nbar: hello some"
	
	// Async task
		// Async action in task body must invoke this.async() to
		// get done([isSuccess]) callback and call it when done.
		
		// Ex:
			grunt.registerTask('some', 'Blah blah', function() {
				grunt.log.writeln(this.name, "start");
				var done = this.async();
				setTimeout(function() {
					grunt.log.writeln(this.name, "done");
					done();
				}, 10);
			});
	
	// Load
		// Task can be defined in a separate file and must be
		// loaded in gruntfile.
		
		grunt.loadTasks(path)
	
	// Run sequence
		// Tasks sequence can be launched from another task.
		// Actually sequence will be performed after finishing of this task.
		
		grunt.task.run(taskName[])
			// enqueue specified tasks
	
	// Dependence
		// Task can depend on another tasks.
		
		grunt.task.requires(taskName)
			// fail this task if specified task failed or never run
}
================================================================================
Example ======================================================================={
    
	module.exports = function(grunt) {
		
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			concat: {
				options: {
					separator: ';'
				},
				dist: {
					src: ['src/**/*.js'],
					dest: 'dist/<%= pkg.name %>.js'
				}
			},
			uglify: {
				options: {
					banner: '/*! <%= pkg.name %><%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				dist: {
					src: '<%= concat.dist.dest %>',
					dest: 'dist/<%= pkg.name %>.min.js'
				}
			},
			jshint: {
				files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
				options: {
					globals: {
						jQuery: true,
						console: true,
						module: true,
						document: true
					}
				}
			},
			jasmine: {
				src: 'src/**/*.js',
				options: {
					specs: 'test/**/*.js'
				}
			},
			watch: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'jasmine']
			},
			clean: {
				dist: {
					src: ['dist']
				}
			}
		});
		
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-jasmine');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-clean');
		
		grunt.registerTask('test', ['jshint', 'jasmine']);
		
		grunt.registerTask('default', ['jshint', 'jasmine', 'concat', 'uglify']);
	};
}
