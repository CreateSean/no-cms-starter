# NO CMS Starter Project

create static html files using includes and tailwind css. Modified from my [Craft CMS Starter](https://github.com/CreateSean/craft-starter).

Clone this locally and and follow instructions below to get started

---

## Local Development

Set up your local development, if you are using DDev for local development then everything should just work for you. If you are **NOT** using DDEV for local development skip this part and set up local development however you normally do (Valet, Mamp, etc), be sure to import the seed database `db.sql.gz`

1. open .ddev/config.yaml and update line 15 to use the port you want. Must be unique to all ddev sites on your local computer
2. update dotenv variables, especially SITE_NAME, PRIMARY_SITE_URL, SITE_PATH, ASSET_BASE_URL and fill in the missing details
3. Run `ddev start` and the site should start up.
4. run `ddev launch`

## To Do

* add more default templating i.e. main-nav with mobile hamburger

## Build Process

Tailwind is compiled using [Tailwind-jit](https://github.com/tailwindlabs/tailwindcss-jit) which is much faster than previously. it also ensures a small file size during `watch` builds. However I still recommend running the [production](#production) task before deployment.

Images and svg files should be copied to src/img and src/img/svg. When running `npm run production` these will then be optimized and copied to /public/assets/images and /public/assets/images/svg respectively (if you don't want to run production, copy files to both locations)

You will need [NodeJS](https://nodejs.org/en/) version 14+. YOu can either update to 14+ or if you need multiple versions of node install the Node Version Manager [Windows](https://github.com/nvm-sh/nvm) / [Mac](https://github.com/coreybutle/nvm-windows).

1. run `npm install` or `npm i`

Add any scripts or css you need by running `npm install <package-name> --save-dev`
You can then have the required javascript or css files combined and minimized by adding paths to the correct files in `webpack.mix.js` on line 64-70(js) or line 74-78(css). when you run `npx mix watch` everything will be combined and output to `/public/assets/js` or `public/assets/css`

2. update the banner text that gets prepended to css on lines 75-85 of `webpack.mix.js` with your project info
3. in `webpack.mix.js` update line 12  `const baseUrl = 'https://craft-starter.ddev.site'` with your local domain

```javascript
  .banner({
    banner: (function () {
        return [
            '/**!',
            ' * @project        Craft Starter Website',
            ' * @author         Sean Smith, Caffeine Creations',
            ' * @Copyright      Copyright (c) ' + moment().format("YYYY") + ', Caffeine Creations',
            ' *',
            ' */',
            '',
        ].join('\n');
    })(),
    raw: true,
  })
```

4. run `npx mix watch` to have laravel mix compile tailwind, set up browser sync. and combine scripts.

---

## Tailwind

There is an empty tailwind.config.js file at the root of the repository. Add config settings as necessary but I do have some conventions that I use on all projects

For colors use `colornameBrand` where colorname is `red`, `blue`, or whatever the color is. and for font family use the name of the font. Below you can seen an example taken from another project in the extend key.


```javascript
colors: {
  redBrand: {
    light: '#fce9e8',
    default: '#de242b',
    dark: '#990e3d',
  },
  grayBrand: {
    light: '#f2f2f2',
    default: '#637a84',
  },
  textBrand: {
    light:'#334960',
    default: '#3a4250',
  },
  blackBrand: '#041e26',
},
fontFamily: {
  karla: ['Karla', 'sans-serif'],
  montserrat: ['Montserrat', 'serif'],
},
```


## Templates

Create the static templates in src/html/ there is a folder for layouts and partials - the [HTML builder package](https://laravel-mix.com/extensions/html-builder) will compile layouts & partials into complete html files. Yeah Includes with basic html!