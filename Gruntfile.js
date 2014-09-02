module.exports = function(grunt) {
  grunt.initConfig({
    uglify : {
        js: {
            files: {
                'widget.min.js' : [ 'widget.js' ],
                'iframe/js/min/modal.min.js' : [ 'iframe/js/modal.js' ],
                'iframe/js/min/banner.min.js' : [ 'iframe/js/banner.js' ],
                'iframe/js/min/common.min.js' : [ 'iframe/js/common.js' ]
            }
        }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "css/battleforthenet.css": "less/css/battleforthenet.less"
        }
      }
    },
    watch: {
      styles: {
        files: [
          'less/css/battleforthenet.less'
        ], // which files to watch
        tasks: [
          'less'
        ],
        options: {
          nospawn: true,
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);
};