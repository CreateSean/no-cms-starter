// webpack.mix.js
// Grabs the package.json file to use our site’s environment/values
const pkg = require("./package.json");

let mix = require('laravel-mix');

const baseUrl = 'https://html-starter.ddev.site';

const moment = require("moment");

// Laravel Mix plugins for additional capabilities
// require("laravel-mix-purgecss");
require("laravel-mix-banner");

// html builder for includes
require('mix-html-builder');

// CSS Plugins
const tailwindJit = require("@tailwindcss/jit");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const presetenv = require("postcss-preset-env");
const hexrgba = require('postcss-hexrgba');


// Image plugins for compression from src folder
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const imageminMozjpeg = require("imagemin-mozjpeg");



mix

.setPublicPath('./public/assets/')

.html({
  htmlRoot: './src/html/*.html', // Your html root file(s)
  output: '../', // The html output folder
  partialRoot: './src/html/partials',    // default partial path
  layoutRoot: './src/html/layouts',    // default partial path
  minify: {
      removeComments: false
  }
})

.postCss("./src/css/app.css", "css")

.options({
  postCss: [
      tailwindJit,
  ],
  autoprefixer: {
    options: {
        browsers: [
            'last 4 versions',
        ]
    }
  },
  processCssUrls: false,
  hmrOptions: {
    host: baseUrl,
    port: 8080
  },
  devtool: 'eval-cheap-module-source-map'
})

  // Source maps disabled (temporarily?) to improve build time
  .sourceMaps()

  // combine all our js scripts here
  // when npm run production is run will minimize as well
  .js(
    [
      // './node_modules/flickity/dist/flickity.pkgd.min.js',
      // './node_modules/swiper/swiper-bundle.min.js',
      // this should go last
      './src/js/app.js'
    ],
    'public/assets/js/scripts.combined.js')

  // combine all our vendor css files here
  .combine(
    [
      // './node_modules/flickity/dist/flickity.min.css',
      // './node_modules/swiper/swiper-bundle.min.css'
    ],
    'public/assets/css/vendor.combined.css')

  .banner({
    banner: (function () {
        return [
            '/**!',
            ' * @project        Caffeine Creations Website',
            ' * @author         Sean Smith, Caffeine Creations <sean@caffeinecreations.ca>',
            ' * @Copyright      Copyright (c) ' + moment().format("YYYY") + ', Caffeine Creations',
            ' *',
            ' */',
            '',
        ].join('\n');
    })(),
    raw: true,
  })

  .browserSync({
    proxy: baseUrl,
    ghostMode: false,
    notify: {
      styles: {
        top: 'auto',
        bottom: '1rem'
      }
    },
    files: ["src/css/*.css","src/js/*.js", "src/html/**/*.html", "src/html/*.html", "src/*.js", "src/**/*.js"]
  });

mix.disableSuccessNotifications();



// production
if (mix.inProduction()) {
  // copy fonts
  mix.copyDirectory('./src/fonts/', './public/assets/fonts/')
  mix.version();
}

// end production