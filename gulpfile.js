var gulp = require('gulp');
var jade = require('gulp-jade'); // jade 파일을 html 파일로 변경해 주는 일을 해준다.
var sass = require('gulp-sass');
// html 대신에 jade를, css대신에 sass를 사용하는 개념.

var config = {
	'jade': {'pretty':true}
};

gulp.task('default', ['jade', 'sass', 'watch']);

gulp.task('watch', function(){
	gulp.watch(['src/index.jade'], ['jade']); // src/index.jade파일이 변경이 될 경우 gulp.task('jade', function(){ 부분을 실행하는것임
	gulp.watch(['src/sass/style.scss'], ['sass']);
})

gulp.task('jade', function(){
	gulp.src('src/index.jade')
		.pipe(jade(config.jade)) // 제작용일땐 pretty 옵션을 true로해서 압축x, 배포할 경우 pretty 옵션을 false로 해서 압축o
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function(){
	gulp.src('src/sass/style.scss')
		.pipe(sass()) // 제작용일땐 pretty 옵션을 true로해서 압축x, 배포할 경우 pretty 옵션을 false로 해서 압축o
		.pipe(gulp.dest('dist/css'));
});