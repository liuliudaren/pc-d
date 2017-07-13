
	var gulp=require("gulp");
	var concat=require("gulp-concat");//合并
	var sass=require("gulp-sass");//翻译CSS文件
	var cleanCSS=require("gulp-clean-css");//压缩
	var rename=require("gulp-rename");//重命名
	var uglify=require("gulp-uglify");//Js压缩混淆
	var inject=require("gulp-inject");//注入
	var connect=require("gulp-connect");//跟踪跟新
	var imagemin=require("gulp-imagemin")//压缩图片
	var watch=require("gulp-watch")//跟踪

	gulp.task("default",["sass","javasctript","html","img","server","watch"])//入口



	gulp.task("sass",function(){//scss压缩导入dest成css
		gulp.src("resourse/**/*.scss")
		.pipe(concat("all.scss"))
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename("all.min.css"))
		.pipe(gulp.dest("dest/css/"))
		.pipe(connect.reload());
	});

	gulp.task("javasctript",function(){//js合并混淆导入dest
		gulp.src("resourse/**/*.js")
		.pipe(concat("all.js"))
		.pipe(uglify())
		.pipe(rename("all.min.js"))
		.pipe(gulp.dest("dest/js/"))
		.pipe(connect.reload());

	});
	gulp.task("html",function(){//讲js css导入html
		gulp.src("resourse/index.html")
		.pipe(gulp.dest("dest/"))
		.pipe(inject(gulp.src(["dest/css/all.min.css","dest/js/all.min.js"]),{relative:true}))
		.pipe(gulp.dest("dest/"))
		.pipe(connect.reload());
	});

	gulp.task("img",function(){
		gulp.src("resourse/images/*.*")
		.pipe(imagemin())
		.pipe(gulp.dest("dest/images/"))
		.pipe(connect.reload())
	});

	gulp.task("server",function(){
		connect.server({
			port:8888,
			root:"dest",
			livereload:true
		})
	})
	gulp.task("watch",function(){
		gulp.watch(["resourse/**/*.html"],["html"])
		gulp.watch(["resourse/**/*.scss"],["sass"])
		gulp.watch(["resourse/**/*.js"],["javasctript"])
		watch("resourse/images/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dest/images/"));
	})



