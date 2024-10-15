// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

// Create a Webpack-friendly environment object by stringifying all values
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.tsx", // Entry point for your React app
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory for bundled files
    filename: "bundle.js", // Name of the bundled JavaScript file
    publicPath: "/", // Ensure this is set to handle routing correctly
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Allow importing files without specifying extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Transpile JS/TS/JSX/TSX files using Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Template for generating `index.html`
    }),
    new webpack.DefinePlugin(envKeys), // Inject environment variables
  ],
  devServer: {
    port: 3000,
    historyApiFallback: {
      disableDotRule: true, // Allow dots in the URL
    },
  },
  mode: "development", // Set the mode (development or production)
};
