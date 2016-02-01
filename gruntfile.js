var path = require('path');

module.exports = function(grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-bumpup');
	grunt.loadNpmTasks('grunt-jslint');

	grunt.loadNpmTasks('grunt-gh-pages');

   
	// Do grunt-related things in here
	grunt.initConfig(
	{
	
		pkg: grunt.file.readJSON('package.json'),
		less: {
			dev: {
				options: {
					paths: ['css'],
					compress: false,
					ieCompat: true
				},
				files: {
					'assets/css/styles.css': 'assets/less/colors.less'
				}
			},
			prod: {
				options: {
					paths: ['css'],
					compress: true,
					ieCompat: true
				},
				files: {
					'assets/css/styles.min.css': 'assets/less/styles.less'
				}
			}
		},
		
copy: {
  main: {
    files: [
      {expand: true, src: ['assets/**'], dest: 'dist/'},
	  {expand: true, src: ['index.html'], dest: 'dist/'},
	  {expand: true, src: ['favicon.png'], dest: 'dist/'},
      {expand: true, src: ['.gitignore'], dest: 'dist/'},
      {expand: true, src: ['googlecab0a4275fc793cb.html'], dest: 'dist/'}
    ]
  }
},
    'gh-pages': {
      options: {
        base: 'dist',
        repo: 'https://github.com/rasmusson/split-a-bill-landing.git'
      },
      src: ['**']
    },
		jslint: { // configure the task
	      // lint your project's server code
	      server: {
	        src: [ // some example files
	          'dist/assets/js/scripts.js'
	        ],
	        options: {
		        edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
		        errorsOnly: true, // only display errors
		        failOnError: false // defaults to true
		    }
	      }
	    },
	    watch: {
	    	options: { livereload: true },
	      	less: {
	        	files: ['dist/assets/**/*.less'],
	        	tasks: ['newer:less:dev']
	      	},
	      	scripts: {
	      		files: ['dist/**/*.js', 'dist/*.html'],
	      		tasks: ['jslint']
	      	}
	    },
	    bumpup: {
	        file: 'package.json'
	    },
		connect: {
			server: {
				options: {
					port: 9005,
					base: 'dist',
					hostname: '*',
					livereload:true,
					keepalive: true,
                    spawn: false
				}
			}
		}
	});

	grunt.task.registerTask('default', 'jslint');
	grunt.task.registerTask('default', ['connect','watch']);

};