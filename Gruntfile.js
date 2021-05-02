module.exports = function(grunt){
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    BASE_FOLDER: "www",
    DIST_ENVIRONMENT: "build",

    BANNER_TEXT: 'Project: <%= pkg.name %>. '+
      'Created by: <%= pkg.author %>. '+
      'Version: <%= pkg.version %>.\n' +
      'This project is valid for the duration: '+
      '<%= pkg.projectDetails.startDate %> - '+
      '<%= pkg.projectDetails.endDate %>.',

    clean: {
      dev: ["<%= BASE_FOLDER%>/js/*.js"],
      dist: ["<%= DIST_ENVIRONMENT%>"]
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= BANNER_TEXT %> */\n',
        // sourceMap: true,
        separator: ";"
      },
      devVendors: {
        src: [
          "<%= BASE_FOLDER %>/js/lib/jquery.min.js",
          "<%= BASE_FOLDER %>/js/lib/jquery.jcarousel.min.js",
          "<%= BASE_FOLDER %>/js/lib/bootstrap.min.js"
          ],
        dest: "<%= BASE_FOLDER %>/js/vendor.js"
      },
      devModules: {
        src: ["<%= BASE_FOLDER %>/js/modules/*"],
        dest: "<%= BASE_FOLDER %>/js/main.js"
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: '<%= BASE_FOLDER %>/sass',
          cssDir: '<%= BASE_FOLDER %>/css',
          outputStyle: 'expanded',
          noLineComments: true
        }
      },
      dist: {
        options: {
          sassDir: '<%= BASE_FOLDER %>/sass',
          cssDir: '<%= DIST_ENVIRONMENT %>/css',
          outputStyle: 'compressed',
          noLineComments: true
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "<%= DIST_ENVIRONMENT%>/index.html" : "<%= BASE_FOLDER%>/index.html",
          "<%= DIST_ENVIRONMENT%>/home.html" : "<%= BASE_FOLDER%>/home.html",
          "<%= DIST_ENVIRONMENT%>/floor-plan.html" : "<%= BASE_FOLDER%>/floor-plan.html",
          "<%= DIST_ENVIRONMENT%>/work-in-progress.html" : "<%= BASE_FOLDER%>/work-in-progress.html"
        }
      }
    },

    uglify: {
      options:{
        banner: "/*! <%= BANNER_TEXT %> */",
        compress: {
          drop_console: true
        },
        sourceMap: true,
        preserveComments: false
      },
      dist: {
        files: {
          "<%= DIST_ENVIRONMENT %>/js/main.js" : [
            "<%= BASE_FOLDER %>/js/main.js"
          ],
          "<%= DIST_ENVIRONMENT %>/js/vendor.js" : [
            "<%= BASE_FOLDER %>/js/vendor.js"
          ]
        }
      }
    },

    copy: {
      imagesNFonts: {
        files: [
          {
            expand: true,
            cwd: "<%= BASE_FOLDER %>/",
            filter: "isFile",
            src: "img/**",
            dest: "<%= DIST_ENVIRONMENT %>/"
          },
          {
            expand: true,
            cwd: "<%= BASE_FOLDER %>/",
            filter: "isFile",
            src: "fonts/**",
            dest: "<%= DIST_ENVIRONMENT %>/"
          }
        ]
      }
    },

    watch: {
      options: {
        debounceDelay: 1000,
        /* to set up a different port, so that we can keep two
          separate instances of sever running. */
        livereload: 1337
      },
      html: {
        // DO NOT watch files inside BUILD folder
        files: ['<%= BASE_FOLDER %>/**/*.html'],
        tasks: ["htmlmin:dist"]
      },
      css: {
        files: ['<%= BASE_FOLDER %>/sass/**'],
        tasks: ["compass:dev"]
      },
      js: {
        files: ['<%= BASE_FOLDER %>/js/modules/*.js'],
        tasks: ["concat:devVendors", "concat:devModules"]
      }
    },

    connect: {
      dev: {
        options: {
          hostname: "localhost",
          port: 1985,
          base: "<%= BASE_FOLDER %>",
          middleware: function(connect, options){
            // console.log(options);
            return [
              require('connect-livereload')(),
              connect.static(options.base[0], options),
              connect.directory(options.base[0])
            ];
          }
        }
      },
      dist: {
        options: {
          hostname: "localhost",
          port: 1986,
          base: ["<%= DIST_ENVIRONMENT%>", "build/css", "build/js"],
          // directory: "<%= BASE_FOLDER %>/build",
          middleware: function(connect,options){
            // console.log(options);
            return [
              require('connect-livereload')(),
              connect.static(options.base[0]),
              connect.directory(options.base[0])
            ];
          }
        }
      }
    },

    open: {
      dev: { path: "http://localhost:1985/home.html" },
      dist: { path: "http://localhost:1986/home.html" }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  // Generate DEVELOPMENT CONTENT
  grunt.registerTask("dev", "Run Build Process Tasks", function(){
    var tasks = [
      "clean:dev",
      "compass:dev",
      "concat",
      "open:dev",
      "connect:dev",
      "watch"
    ];

    // always use force when watching
    // grunt.option('force', true);
    grunt.task.run(tasks);
  });

  // Generate PRODUCTION CONTENT
  grunt.registerTask("build", "Run Build Process Tasks", function(){
    var tasks = [
      "clean:dist",
      "htmlmin:dist",
      "compass:dist",
      "uglify:dist",
      "copy:imagesNFonts",
      "open:dist",
      "connect:dist",
      "watch"
    ];

    // always use force when watching
    // grunt.option('force', true);
    grunt.task.run(tasks);
  });
};
