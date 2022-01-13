const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESlintPlugin = require("eslint-webpack-plugin");

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 3000,
          historyApiFallback: true,
        },
      };

const eslintPlugin = (isDev) =>
  isDev ? [] : [new ESlintPlugin({ extensions: ["ts", "js", "tsx", "jsx"] })];

module.exports = ({ development }) => ({
  mode: development ? "development" : "production",
  devtool: development ? "inline-source-map" : false,
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[hash][ext]",
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpe?g|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    ...eslintPlugin(development),
    new HtmlWebpackPlugin({
      title: "Platform",
      template: "src/index.html",
      favicon: "public/favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [{ from: "./public" }],
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", ".sass", ".scss"],
    alias: {
      pages: path.resolve(__dirname, "src/pages/"),
      components: path.resolve(__dirname, "src/components/"),
      assets: path.resolve(__dirname, "src/assets/"),
      styles: path.resolve(__dirname, "src/styles/"),
      constants: path.resolve(__dirname, "src/constants/"),
      interfaces: path.resolve(__dirname, "src/interfaces/"),
      router: path.resolve(__dirname, "src/router/"),
      reducers: path.resolve(__dirname, "src/reducers/"),
      store: path.resolve(__dirname, "src/store/"),
      modules: path.resolve(__dirname, "src/modules/"),
      helpers: path.resolve(__dirname, "src/helpers/"),
      services: path.resolve(__dirname, "src/services/"),
    },
  },
  ...devServer(development),
});
