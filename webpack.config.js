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
        Utils: path.resolve(__dirname, `src/utils`),
        Consts: path.resolve(__dirname, `src`),
        Consts2$: path.resolve(__dirname, `src/consts.js`),
        Components: path.resolve(__dirname, `src/components/`),
      }
    },
    plugins: [
      new MomentLocalesPlugin()
    ]
  }
};
