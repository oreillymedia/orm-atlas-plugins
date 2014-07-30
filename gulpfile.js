var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var coffee = require('gulp-coffee');
var open = require("gulp-open");

var srcPath = './plugins/';
var outPath = './build/';

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('build', function() {    
   
   var folders = getFolders(srcPath);

   var tasks = folders.map(function(folder) {

      var p = require("./" + srcPath + "/" + folder + '/package.json');
      var filename = folder + '-' + p.version + '.min.js'
      
      return gulp.src(path.join(srcPath, folder, '/*.coffee'))
        .pipe(concat(folder + '.coffee'))  // concat into foldername.js
        .pipe(gulp.dest(outPath))  // write to output
        .pipe(coffee())  // coffeescript 
        .pipe(uglify())  // minify
        .pipe(rename(filename)) // rename to folder.min.js
        .pipe(gulp.dest(outPath));  // write to output again
   });

   return merge(tasks);
});

gulp.task('build_specs', function() {
  return gulp.src('./plugins/**/spec/*_spec.coffee')
    .pipe(concat('combined.coffee'))  // concat into foldername.js
    //.pipe(gulp.dest("./spec/"))  // write to output
    .pipe(coffee())  // coffeescript 
    .pipe(rename("combined.js")) // rename to folder.min.js
    .pipe(gulp.dest("./spec/"));  // write to output again
});

gulp.task('test', ['build', 'build_specs'], function() {
  gulp.src("./spec/index.html").pipe(open("<%file.path%>")); 
  gulp.watch('./**/*.coffee', ['build', 'build_specs']);
});