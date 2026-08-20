import fs from "node:fs";
import svgSprite from "gulp-svg-sprite";
export const sprite = () => {
	if (!fs.existsSync(`${app.path.srcFolder}/svgicons`)) return Promise.resolve();
	return app.gulp.src(`${app.path.src.svgicons}`, { allowEmpty: true })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: `../icons/icons.svg`,
					// Создавать страницу с перечнем иконок
					example: false
				}
			},
		}
		))
		.pipe(app.gulp.dest(`${app.path.build.images}`));
}