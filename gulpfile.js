var gulp        = require('gulp'),
    shell       = require('gulp-shell'),
    browserSync = require('browser-sync').create();


//* Run Jekyll build and serve commands
// gulp.task('build', shell.task(['jekyll build --config "_config.yml,_config-dev.yml" --incremental --watch']));
gulp.task('build', shell.task(['jekyll build --config "_config.yml,_config-dev.yml" --watch']));


//* BrowserSync
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: '_site/'
    },
    // browser: 'firefox',
    reloadDelay: 300
  });
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});


//* Default task (build and serve)
gulp.task('default', ['build', 'browser-sync']);
