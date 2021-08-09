module.exports = {
  purge: [
    './src/html/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        'default':['HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'],
      },
      fontSize: {
      },
      colors: {
        grayBrand: {
          light: '#DADADA',
          DEFAULT: '#373F41',
        },
        blueBrand: {
          light: '#33A1DE',
          DEFAULT: '#0D4F8B	',
        }
      },
    },
  },
  variants: {
    extend: {
      textColor: ['visited'],
    }
  },
}
