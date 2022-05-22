module.exports = {
  plugins:{
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      // selectorBlackList: ['van-'],
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    }
  }
}
