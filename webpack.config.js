const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const showcaseIds = {
  development: '8i9ZrNAaO7tUsdKHfdIElJCSsfDrnr7GuZMWWbhgF3M',
  staging: '8i9ZrNAaO7tUsdKHfdIElJCSsfDrnr7GuZMWWbhgF3M',
  production: '7nTFipph2_g8jYH9eh6TPHRbGGkm-ARuCS_mGGx6Z80'
};
const publicPaths = {
  development: `http://localhost:3300/showcase/${showcaseIds.development}/`,
  staging: `https://staging.sportrecs.com/showcase/${showcaseIds.staging}/`,
  production: `https://sportrecs.com/showcase/${showcaseIds.production}/`
};
const publicPath = path.join(__dirname, './public');

module.exports = {
  entry: {
    player: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: publicPath,
    filename: '[name].js',
    library: 'SRP',
    libraryExport: 'default',
    libraryTarget: 'var',
    publicPath: publicPaths[process.env.NODE_ENV]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Player Demo',
      template: 'src/index.html',
      filename: path.join(publicPath, 'index.html')
    })
  ]
};
