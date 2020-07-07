var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync');

// Scripts concat & minify

// gulp.task('js', function() {
// 	return gulp.src([
// 		'assets/libs/jquery/dist/jquery.min.js',
// 		'assets/libs/jquery_endless_div_scroll/endless_scroll_min.js',
// 		'assets/libs/fancybox-master/dist/jquery.fancybox.min.js',
// 		'assets/libs/slick-master/slick/slick.min.js',
// 		'assets/libs/Chart.min.js',
// 		'assets/js/common.js', // Always at the end
// 		]) 
// 	.pipe(concat('scripts.min.js'))
// 	// .pipe(uglify()) // Mifify js (opt.)
// 	.pipe(gulp.dest('assets/js'))
// 	.pipe(browsersync.reload({ stream: true }))
// });

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'assets'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	})
});

gulp.task('sass', function() {
	return gulp.src('assets/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	// .pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('assets/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('watch', ['sass', 'browser-sync'], function() {
	gulp.watch('assets/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'assets/js/common.js']);
	gulp.watch('assets/*.html', browsersync.reload)
});

gulp.task('rsync', function() {
	return gulp.src('assets/**')
	.pipe(rsync({
		root: 'assets/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('default', ['watch']);
