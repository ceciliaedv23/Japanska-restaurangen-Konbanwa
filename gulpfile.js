/* JavaScript/Gulp-kod för lösning till projektuppgiften i kurs DT173G, gjort av Cecilia Edvardsson */

/* Skapar objekt som möjliggör Gulp-funktionalitet */
const { src, dest, watch, series, parallel } = require('gulp');

/* Skapa objekt för Gulp-metoder så att de går att använda */
const sassFunc = require('gulp-sass')(require('node-sass')); // Omvandling av SASS till CSS
const concat = require('gulp-concat'); // Ihopsättning av flera filer till en
const cssMinify = require('gulp-cssnano'); // Förkortande av CSS-kod, ta bort kommentarer m.m.
const jsMinify = require('gulp-terser'); // Förkortande av JavaScript-kod, ta bort kommentarer m.m.
const jsBabel = require("gulp-babel"); // Omvandling av ECMAScript till JavaScript

/* Skapar objekt med sökvägar till källkodsfiler */
const sourceFiles = {
    htmlPath: "src/**/*.html",
    scssPath: "src/**/*.scss",
    jsPath: "src/**/*.js",
    imagePath: "src/images/**/*.+(png|jpg|gif|ico|svg|webp)",
}

/* Gulp-task som kopierar HTML-filer och placerar dessa som publiceringsfiler */
function htmlTask() {
    return src(sourceFiles.htmlPath)
        .pipe(dest("pub"));
}

/* Gulp-task som behandlar SCSS-filer och placerar dessa i slutgiltigt CSS-format som publiceringsfiler */
function scssTask() {
    return src(sourceFiles.scssPath)
        .pipe(sassFunc().on("error", sassFunc.logError))
        .pipe(concat("styles.css"))
        .pipe(cssMinify())
        .pipe(dest("pub/css"));
}

/* Gulp-task som behandlar JS-filer och placerar dessa i slutgiltigt format som publiceringsfiler */
function jsTask() {
    return src(sourceFiles.jsPath)
        .pipe(concat("main.js"))
        .pipe(jsMinify())
        .pipe(jsBabel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(dest("pub/js"));
}

/* Gulp-task som kopierar bild-filer och placerar dessa som publiceringsfiler */
function imageTask() {
    return src(sourceFiles.imagePath)
        .pipe(dest("pub/images"));
}

/* Watch-task som uppdaterar filer när förändring skett */
function tracking() {
    watch([sourceFiles.htmlPath, sourceFiles.scssPath, sourceFiles.jsPath, sourceFiles.imagePath], parallel(htmlTask, jsTask, scssTask, imageTask));
}

/* Ger tillgång till privata funktioner i terminalen, och körs när Gulp-funktionalitet efterfrågas */
exports.default = series(parallel(htmlTask, jsTask, scssTask, imageTask), tracking);