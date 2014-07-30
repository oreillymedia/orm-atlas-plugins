var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var coffee = require('gulp-coffee');
var del = require('del');

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