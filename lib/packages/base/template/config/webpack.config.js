const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./config");
module.exports = (function() {
  const {
    isProduction,
    env,
    src,
    outputDir,
    publicUrl,
    hasESlint,
    AppRoot,
    isTsProject
  } = config;
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      !isProduction && require.resolve("style-loader"),
      isProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: { publicPath: publicUrl }
      },
      {
        loader: require.resolve("css-loader"),
        options: cssOptions
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve("postcss-loader"),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: "postcss",
          sourceMap: isProduction
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve("resolve-url-loader"),
          options: {
            sourceMap: isProduction
          }
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true
          }
        }
      );
    }
    return loaders;
  };
  return {
    mode: env,
    bail: isProduction,
    devtool: isProduction ? false : "source-map",
    entry: [src],
    output: {
      path: isProduction ? outputDir : undefined,
      filename: isProduction
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/bundle.js",
      publicPath: publicUrl
    },
    resolve: {
      extensions: [
        isTsProject && ".tsx",
        isTsProject && ".ts",
        ".jsx",
        ".js",
        ".json"
      ].filter(Boolean)
    },
    module: {
      rules: [
        // If has eslint, run the linter.
        // It's important to do this before Babel processes the JS.
        // So set enforce option to be pre
        hasESlint && {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: "pre",
          exclude: /node_modules/,
          use: [
            {
              options: {
                cache: true,
                // emitWarning: true,
                failOnError: isProduction,
                eslintPath: require.resolve("eslint")
              },
              loader: "eslint-loader"
            }
          ]
        },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: 10000, // you can edit this value if you need (limit means max image size)
                name: "media/[name].[hash:8].[ext]"
              }
            },
            // Process application JS with Babel.
            // The preset includes JSX, Flow, TypeScript, and some ESnext features.
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              loader: require.resolve("babel-loader"),
              exclude: /node_modules/,
              options: {
                // plugins: [[require.resolve("babel-plugin-named-asset-import")]],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: isProduction
              }
            },
            // // Process any JS outside of the app with Babel.
            // // Unlike the application JS, we only compile the standard ES features.
            // {
            //   test: /\.(js|mjs)$/,
            //   exclude: /@babel(?:\/|\\{1,2})runtime/,
            //   loader: require.resolve("babel-loader"),
            //   options: {
            //     babelrc: false,
            //     configFile: false,
            //     compact: false,
            //     presets: [
            //       [
            //         require.resolve("babel-preset-react-app/dependencies"),
            //         { helpers: true }
            //       ]
            //     ],
            //     cacheDirectory: true,
            //     // See #6846 for context on why cacheCompression is disabled
            //     cacheCompression: false,

            //     // If an error happens in a package, it's possible to be
            //     // because it was compiled. Thus, we don't want the browser
            //     // debugger to show the original code. Instead, the code
            //     // being evaluated would be much more helpful.
            //     sourceMaps: false
            //   }
            // }

            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isProduction
              }),
              sideEffects: true
            },
            {
              test: /\.(scss|sass)$/,
              exclude: /\.module\.(scss|sass)$/,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isProduction
                },
                "sass-loader"
              )
            },
            /**
             * ** You custome loader here **
             * make sure to add new loader before the file-loader
             */
            {
              loader: require.resolve("file-loader"),
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "media/[name].[hash:8].[ext]"
              }
            }
          ]
        }
      ].filter(Boolean)
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: path.resolve(AppRoot, "public/index.html")
          },
          isProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
            : undefined
        )
      ),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
      })
    ].filter(Boolean)
  };
})();
