const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('serve', function(done) {
    
  browserSync.init({
      server: {
        baseDir: "./",
        index: "page.html"
      }
  });

  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch("*.css").on('change', browserSync.reload);
  gulp.watch("*.js").on('change', browserSync.reload);
  
  done();
});

gulp.task('default', gulp.series('serve'));