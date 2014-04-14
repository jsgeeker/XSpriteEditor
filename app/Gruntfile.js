module.exports = function(grunt) {
    grunt.initConfig({
        nodewebkit: {
            options: {
                build_dir: './build',
                credits: './files/credits.html',
                mac: true,
                win: true,
                linux32: true,
                linux64: true,
            },
            src: './files/**/*'
        }
    });
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.registerTask('default', ['nodewebkit']);
};
