const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // connect plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/scripts/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: "/node_modules/"
        },
        // add the rule for processing files
        {
          // this regular expression will search for files with the following extensions
          test: /\.(png|svg|jpg|gif|woff2)$/,
          // file-loader should be used when processing those files
          loader: "file-loader"
        },
        // add the rule for working with HTML in a similar way
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        {
            test: /\.css$/,
            // we replaced the "css-loader" string with an object
            // these are equal for Webpack
            loader: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                // add an options object
                options: { importLoaders: 1 }
              },
              "postcss-loader"
            ]
          }
      ]
    }
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html" // path to our index.html file
    })
  ]
};