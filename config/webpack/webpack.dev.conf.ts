import * as merge from 'webpack-merge'
import baseConfig from './webpack.base.conf'
import commons from '../commons'

const devConfig = merge(baseConfig, {
  devtool: 'inline-source-map',
  output: {
    path: commons.resolve('src/main'),
    filename: 'bundle.js'
  }
})

export default devConfig
