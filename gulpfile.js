var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var less = require('gulp-less');
var concat = require('gulp-concat');
var plumber = require("gulp-plumber");
var browser = require("browser-sync").create();
var minifyCss = require("gulp-csso");
var rename = require("gulp-rename");


gulp.task('less', function(){
	gulp.src("src/less/**/*.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(gulp.dest("src/css"))
		.pipe(browser.stream());

});

gulp.task("mincss", function(){
	return gulp.src(["src/css/**/*.css", "!src/css/fonts.css"])
		.pipe(minifyCss())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("src/css/min"));
});

gulp.task("concatjs", function(){
	
})

gulp.task("serve", ['less'] , function() {
	browser.init({
		server: 'src'
	});
	gulp.watch("src/less/**/*.less", ['less']);
	gulp.watch("src/*.html")
		.on("change", browser.reload);
});	
