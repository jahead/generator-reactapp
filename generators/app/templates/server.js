const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const debug = require('debug');

const error = debug('server:error');
const info = debug('server:info');

const config = require('./webpack.config');

const IP = '0.0.0.0';
const PORT = process.env.PORT;

config.entry.app = config.entry.app.concat([
  `webpack-dev-server/client?http://${IP}:${PORT}`,
  'webpack/hot/only-dev-server',
]);

config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.module.loaders.unshift({
  test: /\.js?$/,
  loader: 'react-hot',
  exclude: /(node_modules|bower_components)/,
});

new WebpackDevServer(webpack(config), {
  contentBase: 'src',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    [process.env.MOCK_API]: {
      secure: false,
      bypass: (req) => {
        /*  eslint no-param-reassign: ["error", { "props": false }] */
        req.method = 'GET';
        return `${req.path}.json`;
      },
    },
  },
}).listen(PORT, IP, (err) => {
  if (err) {
    error(err);
    process.exit(1);
  }
  info(`Listening at ${IP}:${PORT}`);
});
