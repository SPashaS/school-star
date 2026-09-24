import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
	// Gulp 5 reads files as UTF-8 by default. Binary images must be read
	// without decoding, otherwise invalid bytes become U+FFFD and the files
	// written to dist are corrupted.
	return app.gulp.src(app.path.src.images, { encoding: false })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			}))
		)
		// .pipe(app.plugins.newer(app.path.build.images))
		// .pipe(
		// 	app.plugins.if(
		// 		app.isWebP,
		// 		webp()
		// 	)
		// )
		// .pipe(
		// 	app.plugins.if(
		// 		app.isWebP,
		// 		app.gulp.dest(app.path.build.images)
		// 	)
		// )
		// .pipe(
		// 	app.plugins.if(
		// 		app.isWebP,
		// 		app.gulp.src(app.path.src.images)
		// 	)
		// )
		// .pipe(
		// 	app.plugins.if(
		// 		app.isWebP,
		// 		app.plugins.newer(app.path.build.images)
		// 	)
		// )
		.pipe(imagemin())
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.images));
}