const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const uglify = require('gulp-uglify');//js压缩
const clean = require('gulp-clean');//js压缩
const stripDebug = require("gulp-strip-debug");//关闭console打印
const gnirts = require('gulp-gnirts');
// 合并、压缩js文件
gulp.task('js', function () {
    return gulp.src('./build/**/*.js')
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            //preserveComments: all //保留所有注释
        }))
        .pipe(stripDebug())
        .pipe(gnirts())
        .pipe(gulp.dest('./build'));
});

// clean
gulp.task('clean', function () {
    return gulp.src('./build').pipe(clean());
});

gulp.task('build', () => {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"))
});

gulp.task("default", gulp.series('clean', 'build', 'js'), () => {

});
