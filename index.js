require('@babel/register')({
  presets: ['@babel/env'],
})
require('babel-polyfill')
require('./src/server')
