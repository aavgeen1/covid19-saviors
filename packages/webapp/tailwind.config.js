module.exports = {
  important: true,
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif']
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px'
    },
    // extend: {
    //     colors: {
    //     },
    //     margin: {
    //     },
    // },
    opacity: {
      '0': '0',
      '20': '0.2',
      '40': '0.4',
      '60': '0.6',
      '80': '0.8',
      '100': '1'
    }
  },
  variants: {
    opacity: ['responsive', 'hover'],
    backgroundColor: ['responsive', 'hover'],
    appearance: ['responsive'],
    fill: []
  },
  corePlugins: {
    float: false,
    objectFit: false,
    objectPosition: false
  }
};
