'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// ─── Clean dist folder ───
		clean: ['dist', '.tmp'],

		// ─── Copy assets to dist ───
		copy: {
			main: {
				expand: true,
				cwd: 'App/',
				src: [
					'**',
					'!less/**',
					'!js/**', 'js/build/**',
					'!css/**', 'css/build/**',
					'!bower_components/**'
				],
				dest: 'dist/'
			}
		},

		// ─── LESS → CSS ───
		less: {
			development: {
				options: {
					compress: false,
					sourceMap: true,
					sourceMapFilename: 'App/css/main.css.map',
					sourceMapURL: 'main.css.map'
				},
				files: {
					'App/css/main.css': 'App/less/main.less'
				}
			},
			production: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'App/css/main.css': 'App/less/main.less'
				}
			}
		},

		// ─── Autoprefixer ───
		autoprefixer: {
			options: {
				browsers: ['last 3 versions', '> 1%']
			},
			dist: {
				files: {
					'App/css/main.css': 'App/css/main.css'
				}
			}
		},

		// ─── Uglify JS ───
		uglify: {
			options: {
				report: 'min',
				mangle: false
			}
		},

		// ─── Usemin (reads build blocks from HTML) ───
		useminPrepare: {
			html: ['App/index.html', 'App/pages/*.html'],
			options: {
				dest: 'dist',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglify'],
							css: ['concat', 'cssmin']
						},
						post: {}
					}
				}
			}
		},

		usemin: {
			html: ['dist/index.html', 'dist/pages/*.html']
		},

		// ─── Cache busting ───
		rev: {
			files: {
				src: ['dist/**/portfolio.min.{js,css}']
			}
		},

		// ─── Dev server ───
		connect: {
			dev: {
				options: {
					base: './App/',
					hostname: 'localhost',
					livereload: true,
					port: 9001,
					keepalive: false,
					open: true
				}
			},
			dist: {
				options: {
					base: './dist/',
					hostname: 'localhost',
					livereload: true,
					port: 9002,
					keepalive: false,
					open: true
				}
			}
		},

		// ─── Watch for changes ───
		watch: {
			less: {
				files: ['App/less/**/*.less'],
				tasks: ['less:development', 'autoprefixer']
			},
			html: {
				files: ['App/**/*.html']
			},
			js: {
				files: ['App/js/**/*.js']
			},
			options: {
				livereload: true
			}
		}
	});

	// ─── Tasks ───

	// Development: compile LESS, start server, watch for changes
	grunt.registerTask('default', ['less:development', 'autoprefixer', 'connect:dev', 'watch']);
	grunt.registerTask('serve', ['less:development', 'autoprefixer', 'connect:dev', 'watch']);

	// Production build: clean, compile, copy, concat, minify, revision
	grunt.registerTask('build', ['clean', 'less:production', 'autoprefixer', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin']);

	// Preview production build
	grunt.registerTask('dist', ['build', 'connect:dist', 'watch']);
};
