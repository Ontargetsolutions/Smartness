const path = require ('path');
const fs = require ('fs');

const HtmlWebPackPlugin = require ('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require ('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const UglifyJsPlugin = require ('uglifyjs-webpack-plugin');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync (process.cwd ());
const resolveApp = relativePath => path.resolve (appDirectory, relativePath);

// the path(s) that should be cleaned
let pathsToClean = ['dist', 'build'];

// the clean options to use
let cleanOptions = {
  root: __dirname,
  verbose: false, // Write logs to console.
  dry: false,
};

module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    path: resolveApp ('dist'),
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: publicPath,
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  // resolve alias (Absolute paths)
  resolve: {
    alias: {
      Actions: path.resolve (__dirname, 'src/actions/'),
      Components: path.resolve (__dirname, 'src/components/'),
      Assets: path.resolve (__dirname, 'src/assets/'),
      Util: path.resolve (__dirname, 'src/util/'),
      Routes: path.resolve (__dirname, 'src/routes/'),
      Constants: path.resolve (__dirname, 'src/constants/'),
      Helpers: path.resolve (__dirname, 'src/helpers/'),
      Api: path.resolve (__dirname, 'src/api/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'},
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true},
          },
        ],
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              outputPath: './resources/imgs',
              limit: 10000,
              //   name: '[name].[ext]',
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      // Scss compiler
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin ({
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
        sourceMap: true,
      }),
    ],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebPackPlugin ({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "static/css/[name].[hash:8].css"
    })
  ],
  devServer: {
    contentBase: './src/index.js',
    compress: true,
    port: 3000, // port number
    historyApiFallback: true,
    quiet: true,
    proxy: [
      {
        context: ['/'],
        target: 'http://localhost:5000',
      },
    ],
  },
};
