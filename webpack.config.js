'use strict';

const path = require ('path');
const fs = require('fs');


const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const UglifyJsPlugin = require ('uglifyjs-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require ('friendly-errors-webpack-plugin');

const outputDirectory = 'dist';

const publicPath = '/';
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// the path(s) that should be cleaned
let pathsToClean = ['dist', 'build'];

// the clean options to use
let cleanOptions = {
  root: __dirname,
  verbose: false, // Write logs to console.
  dry: false,
};

module.exports = {
  entry: ['babel-polyfill', "react-hot-loader/patch",'./client/src/index.js'],
  output: {
    // path: path.join (__dirname, outputDirectory),
    path: resolveApp('dist'),
    // filename: 'bundle.js',

    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: publicPath,
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Actions: path.resolve (__dirname, 'client/src/actions/'),
      Components: path.resolve (__dirname, 'client/src/components/'),
      Assets: path.resolve (__dirname, 'client/src/assets/'),
      Util: path.resolve (__dirname, 'client/src/util/'),
      Routes: path.resolve (__dirname, 'client/src/routes/'),
      Constants: path.resolve (__dirname, 'client/src/constants/'),
      Helpers: path.resolve (__dirname, 'client/src/helpers/'),
      Api: path.resolve (__dirname, 'client/src/api/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-syntax-dynamic-import',
            ],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
            {
                loader: "html-loader",
                options: { minimize: true }
            }
        ]
    },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,  'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      // Scss compiler
      {
        test: /\.scss$/,
        // use: [MiniCssExtractPlugin.loader,  'sass-loader'],
        use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
      },
    ],
  },
  optimization: {
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                parse: {
                    // we want uglify-js to parse ecma 8 code. However we want it to output
                    // ecma 5 compliant code, to avoid issues with older browsers, this is
                    // whey we put `ecma: 5` to the compress and output section
                    // https://github.com/facebook/create-react-app/pull/4234
                    ecma: 8,
                },
                compress: {
                    ecma: 5,
                    warnings: false,
                    // Disabled because of an issue with Uglify breaking seemingly valid code:
                    // https://github.com/facebook/create-react-app/issues/2376
                    // Pending further investigation:
                    // https://github.com/mishoo/UglifyJS2/issues/2011
                    comparisons: false,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    ecma: 5,
                    comments: false,
                    // Turned on because emoji and regex is not minified properly using default
                    // https://github.com/facebook/create-react-app/issues/2488
                    ascii_only: true,
                },
            },
            // Use multi-process parallel running to improve the build speed
            // Default number of concurrent runs: os.cpus().length - 1
            parallel: true,
            // Enable file caching
            cache: true,
            sourceMap: true
        })
    ]
},
performance: {
  hints: process.env.NODE_ENV === 'production' ? "warning" : false
},
  devServer: {
    port: 3000,
    open: true,
    compress: true,
    contentBase: '.client/src/index.js',
    historyApiFallback: true,
    quiet: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  plugins: [
    // new FriendlyErrorsWebpackPlugin (),
    new CleanWebpackPlugin (pathsToClean, cleanOptions),
    // new CleanWebpackPlugin ([outputDirectory]),
    new HtmlWebpackPlugin ({
      template: './client/public/index.html',
      filename: "./index.html",
      favicon: './client/public/favicon.ico',
    }),
    new MiniCssExtractPlugin ({
      filename: '[name].css',
      chunkFilename: 'static/css/[name].[hash:8].css',
    }),
  ],
};
