const BaseConfig = require("./webpack.config");

module.exports = {
  entry: BaseConfig.entry,
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [
          "style-loader",
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        },
        generator: {
          filename: 'images/[name][ext]'
        }
      },
    ],
  },
  plugins: BaseConfig.plugins,
  devServer: {
    static: './src',
    watchFiles: ['./src/**/*'],
    proxy: {
      context: "/api",
      changeOrigin: true,
    },
  },
  devtool: 'inline-source-map',
  mode: "development",
  output: {
    clean: true,
  },
  stats: {
    children: true,
    errorDetails: true
  }
}

