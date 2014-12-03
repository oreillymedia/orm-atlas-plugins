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
var sass = require('gulp-sass');
var connect = require("gulp-connect");
var _ = require('underscore');
var s3 = require("gulp-s3");

var srcPath = './plugins/';
var buildPath = './build/';
var examplesPath = './examples/';


// Function to list all folders in a directory.
// Returns array of strings with foldernames.
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

// Concatenate all .coffee and .scss files in /plugins into /build
// with version numbers in the generated files.
gulp.task('build', function() {    
   
  var folders = getFolders(srcPath);

  _.each(folders, function(folder) {

    // read version from package.json
    var p = require("./" + srcPath + "/" + folder + '/package.json');
    
    // compile sass into a .css file in /build
    gulp.src(path.join(srcPath, folder, '/stylesheets/*.scss'))
      .pipe(sass())
      .pipe(concat(folder + '.css'))
      .pipe(gulp.dest(examplesPath))
      .pipe(rename(folder + '-' + p.version + '.css'))
      .pipe(gulp.dest(buildPath));

    // compile coffee into a .js file in /build
    gulp.src(path.join(srcPath, folder, '/javascripts/*.coffee'))
      .pipe(coffee())
      .pipe(concat(folder + '.js'))
      .pipe(gulp.dest(examplesPath))
      .pipe(uglify())
      .pipe(rename(folder + '-' + p.version + '.min.js'))
      .pipe(gulp.dest(buildPath));
  });
});

//
gulp.task('build_specs', function() {
  return gulp.src('./plugins/**/spec/*_spec.coffee')
    .pipe(concat('combined.coffee'))  // concat into foldername.js
    .pipe(coffee())  // coffeescript 
    .pipe(rename("combined.js")) // rename to folder.min.js
    .pipe(gulp.dest("./spec/"));  // write to output again
});

gulp.task('test', ['build', 'build_specs'], function() {
  connect.server({port: 8002})
  gulp.watch(['./**/*.coffee', './**/*.scss'], ['build', 'build_specs']);
});

gulp.task('examples', ['build'], function() {
  connect.server({
    port: 8002,
    root: 'examples'
  })
  gulp.watch(['./**/*.coffee', './**/*.scss'], ['build']);
});


gulp.task('publish', ['build'], function() {
  aws = JSON.parse(fs.readFileSync('./aws.json'));
  
  // publish examples
  aws.bucket = "orm-atlas-plugins-examples"
  gulp.src('./examples/**').pipe(s3(aws));

  // publish build
  aws.bucket = "orm-atlas-plugins"
  gulp.src('./build/**').pipe(s3(aws));
});