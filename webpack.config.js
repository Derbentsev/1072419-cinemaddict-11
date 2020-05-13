const path = require (`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = (env) => {
  return {
    mode: env === `dev` ? `development` : `production`,
    entry: `./src/main.js`,
    output: {
      filename: `bundle.js`,
      path: path.join(__dirname, `public`)
    },
    devtool: `source-map`,
    devServer: {
      contentBase: path.join(__dirname, `public`),
      watchContentBase: true
    },
    resolve: {
      alias: {
        '@utils': path.resolve(__dirname, `./src/utils`),
        '@consts': path.resolve(__dirname, `./src/consts.js`),
        '@components': path.resolve(__dirname, `./src/components/`),
        '@controllers': path.resolve(__dirname, `./src/controllers/`),
        '@models': path.resolve(__dirname, `./src/models`),
      }
    },
    plugins: [
      new MomentLocalesPlugin()
    ]
  }
};
