module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  var sourcePath = 'app/',
    destPath = 'public/',
    javascripts = sourcePath + 'javascripts/**/*.js',
    stylesheets = sourcePath + 'stylesheets/**/*.scss',
    icons = sourcePath + 'svg/**/*.svg',
    images = sourcePath + 'images/**/*.{jpg,gif,png}',
    templates = sourcePath + 'templates/**/*.hbs';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    destPath: destPath,
    sourcePath: sourcePath,

    // Javascript Tasks
    // ---------------------------------------------

    jshint: {
      dev: [
      javascripts,
      '!' + sourcePath + 'javascripts/vendor/**/*.js',
      '!' + sourcePath + 'javascripts/templates.js'
      ]
    },

    concat: {
      app: {
        src: [
        javascripts,
        '!' + sourcePath + 'javascripts/vendor/**/*.js'
        ],
        dest: destPath + 'assets/js/app.js',
        separator: ';'
      },
      vendor: {
        src: [sourcePath + 'javascripts/vendor/**/*.js'],
        dest: destPath + 'assets/js/vendor.js',
        separator: ';'
      }
    },

    // handlebars: {
    emberTemplates: {
      compile: {
        options: {
          namespace: 'Ember.TEMPLATES',
          templateBasePath: /app\/templates\//
        },
        files: {
          'app/javascripts/templates.js': [templates]
        }
      }
    },

    uglify: {
      app: {
        src: [
        javascripts,
        '!' + sourcePath + 'javascripts/vendor/**/*.js'
        ],
        dest: destPath + 'assets/js/app.min.js'
      },
      vendor: {
        src: [sourcePath + 'javascripts/vendor/**/*.js'],
        dest: destPath + 'assets/js/vendor.min.js'
      }
    },

    // CSS Tasks
    // ---------------------------------------------

    sass: {
      dev: {
        options: {
          lineNumbers: true,
          style: 'expanded'
        },
        files: {
          "<%= destPath + 'assets/css/styles.dev.css' %>": "<%= sourcePath + 'stylesheets/styles.scss' %>"
        }
      },
      dist: {
        options: {
          style: 'nested',
          quiet: true
        },
        files: {
          "<%= destPath + 'assets/css/styles.css' %>": "<%= sourcePath + 'stylesheets/styles.scss' %>"
        }
      },
      min: {
        options: {
          style: 'compressed',
          quiet: true
        },
        files: {
          "<%= destPath + 'assets/css/styles.min.css' %>": "<%= sourcePath + 'stylesheets/styles.scss' %>"
        }
      }
    },

    // HTML Tasks
    // ---------------------------------------------

    jekyll: {
      dev: {
        options: {
          src: sourcePath + 'jekyll',
          dest: sourcePath + 'jekyll/_site'
        }
      }
    },

    htmllint: {
      all: [destPath + '**/*.html']
    },

    // Image Tasks
    // ---------------------------------------------

    sprite: {
      all: {
        algorithm: 'binary-tree',
        src: sourcePath + 'images/sprite/*.{jpg,gif,png}',
        destImg: destPath + 'assets/images/layout/sprite.png',
        destCSS: sourcePath + 'stylesheets/generated/_sprite.scss',
        imgPath: '../images/layout/sprite.png'
      }
    },

    responsive_images: {
      responsive: {
        options: {
          separator: '_',
          sizes: [{
            name: 'mobile',
            width: 480
          },{
            name: 'tablet',
            width: 780
          }]
        },
        files: [{
          expand: true,
          src: ['*.{jpg,gif,png}'],
          cwd: sourcePath + 'images/responsive',
          dest: destPath + 'assets/images/content/'
        }]
      }
    },

    favicons: {
      options: {
        tileBlackWhite: false,
        windowsTile: false
      },
      icons: {
        src: sourcePath + 'images/icons/favicon.png',
        dest: destPath + 'assets/images/icons/'
      }
    },

    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: destPath + 'assets/images/',
          src: ['**/*.{jpg,gif,png}'],
          dest: destPath + 'assets/images/'
        }]
      }
    },

    // Misc Tasks
    // ---------------------------------------------

    copy: {
      jekyll: {
        files: [{
          expand: true,
          cwd: sourcePath + 'jekyll/_site',
          src: ['**/*.html'],
          dest: destPath
        }]
      },
      responsive_images: {
        files: [{
          expand: true,
          cwd: sourcePath + 'images/responsive/',
          src: ['*.{jpg,gif,png}'],
          dest: destPath + 'assets/images/content/'
        }]
      }
    },

    'gh-pages': {
      options: {
        base: 'public'
      },
      src: ['**']
    },

    webfont: {
      icons: {
        src: icons,
        dest: destPath + 'assets/fonts/icons',
        destCss: sourcePath + 'stylesheets/generated',
        options: {
          font: 'icons',
          htmlDemo: false,
          relativeFontPath: '../fonts/icons',
          stylesheet: 'scss',
          syntax: 'bootstrap'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: javascripts,
        tasks: ['jshint', 'concat']
      },
      sass: {
        options: {
          livereload: false
        },
        files: stylesheets,
        tasks: ['sass']
      },
      css: {
        files: destPath + 'assets/**/*.css',
        tasks: []
      },
      // jekyll: {
      //   files: [
      //   sourcePath + 'jekyll/**/*.html',
      //   '!' + sourcePath + 'jekyll/_site/**/*.html'
      //   ],
      //   tasks: ['jekyll', 'copy:jekyll']
      // },
      html: {
        files: destPath + '**/*.html',
        tasks: []
      },
      icons: {
        files: icons,
        tasks: ['webfont']
      },
      images: {
        files: sourcePath + 'images/sprite/**/*.{jpg,gif,png}',
        tasks: ['sprite', 'imagemin:layout']
      },
      responsive_images: {
        files: sourcePath + 'images/responsive/**/*.{jpg,gif,png}',
        tasks: ['responsive_images', 'copy:responsive_images', 'imagemin:responsive_images']
      },
      templates: {
        files: templates,
        tasks: ['emberTemplates']
      }
    }
  });

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('js', [
    'jshint',
    'concat',
    'uglify'
  ]);
};
