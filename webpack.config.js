const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成HTML文件

module.exports = {
  entry: path.join(__dirname, "examples/src/index.js"), //入口文件
  output: {
    filename: "[name].bundle.js" //输出文件名
  },
  mode: "development",
  devtool: "cheap-module-source-map",
  resolve: {
    extensions: [".js", ".jsx", "tsx", "ts"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: /src/,
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss|css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9" // React 不支持 IE8
                  ],
                  flexbox: "no-2009"
                })
              ]
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024 * 8, // 8k以下的base64内联，不产生图片文件
            fallback: "file-loader", // 8k以上，用file-loader抽离（非必须，默认就是file-loader）
            name: "[name].[hash].[ext]", // 文件名规则，默认是[hash].[ext]
            outputPath: "/images/", // 输出路径
            publicPath: "dist/" // 可访问到图片的引用路径(相对/绝对)
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "/fonts/",
              publicPath: "dist/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "examples/index.html"),
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin() //配合 webpack-dev-server启用HMR
  ],
  devServer: {
    port: 3000,
    open: true,
    disableHostCheck: true,
    hot: true
  }
};
