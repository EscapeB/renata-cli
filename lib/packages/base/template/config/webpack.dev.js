// webpack plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require("webpack");
// mudule
const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.config");
const config = require("./config");
const devServer = require("./webpackDevServer");
module.exports = (function() {
  process.env.NODE_ENV = "development";
  const { AppRoot, publicUrl, isProduction } = config;
  const devConfig = merge(baseConfig, {
    mode: "development",
    plugins: [
      new ManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: publicUrl
      }),
      !isProduction && new webpack.HotModuleReplacementPlugin()
    ].filter(Boolean),
    devServer: devServer({})
  });
  // console.log(devConfig);
  return devConfig;
})();
