const path = require("path");
const autoprefixer = require("autoprefixer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const pkg = require("./package.json");
module.exports = {
  entry: path.join(__dirname, "src/index.js"), //入口文件
  output: {
    path: path.join(__dirname, "dist"), //入口文件
    filename: "index.js", //输出文件名
    libraryExport: "default",
    library: pkg.name,
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  mode: "production",
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }, //不打包这些资源
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
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: { importLoaders: 1, minimize: true }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                //自动添加css前缀
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9"
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
            outputPath: "/images/" // 输出路径
            //publicPath: "" // 可访问到图片的引用路径(相对/绝对)
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
              outputPath: "/fonts/"
              //publicPath: ""
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new MiniCssExtractPlugin({
      filename: "index.css"
    })
  ]
};
