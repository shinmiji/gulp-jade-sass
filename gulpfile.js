var gulp = require('gulp');
var jade = require('gulp-jade'); // jade 파일을 html 파일로 변경해 주는 일을 해준다.
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
reload = browserSync.reload;
// html 대신에 jade를, css대신에 sass를 사용하는 개념.

var config = {
	'jade': {'pretty':true},
	'sass': {
		'outputStyle': 'compact' // compact, compressed, nested, expanded
	}
};

gulp.task('default', ['jade', 'sass'], function(){
	browserSync({'server':'./dist'})
	gulp.start('watch');
});

gulp.task('watch', function(){
	gulp.watch(['src/**/*.jade'], ['watch:jade']); // src/index.jade파일이 변경이 될 경우 gulp.task('jade', function(){ 부분을 실행하는것임
	gulp.watch(['src/sass/**/*.scss'], ['sass']);
})

gulp.task('watch:jade', ['jade'], reload);

gulp.task('jade', function(){
	gulp.src('src/index.jade')
		.pipe(jade(config.jade)) // 제작용일땐 pretty 옵션을 true로해서 압축x, 배포할 경우 pretty 옵션을 false로 해서 압축o
		.on('error', errorLog)
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function(){
	gulp.src('src/sass/**/*.scss')
		.pipe(sass(config.sass) // 제작용일땐 pretty 옵션을 true로해서 압축x, 배포할 경우 pretty 옵션을 false로 해서 압축o
		.on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		.pipe( reload({stream: true}) );
});

/**
 * --------------------------------
 * 유틸리티
 * --------------------------------
 */
// 오류 출력을 위한 errorLog 함수
// 오류 발생 시에도 watch 업무 중단하지 않음.
function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}