const BaseConfig = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MelonCosPlugin = require("melon-cos-plugin");
const MelonMinFontPlugin = require("melon-min-font-plugin");

module.exports = (env, argv) => {
  try {
    let projectName = argv.name || 'temp';
    let dirName = new Date().toLocaleDateString().replace(/\//g, "");
    return {
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
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[name][ext]'
            }
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
      plugins: [
        ...BaseConfig.plugins,
        new MiniCssExtractPlugin(),
        new ImageMinimizerPlugin({
          test: /\.(jpe?g)$/i,
          minimizerOptions: {
            plugins: [["mozjpeg", { quality: 75 }]],
          },
        }),
        new ImageMinimizerPlugin({
          test: /\.(png)$/i,
          minimizerOptions: {
            plugins: ["pngquant"],
          },
        }),
        new ImageMinimizerPlugin({
          test: /\.(png)$/i,
          filename: "images/[name].webp",
          filter: source => {
            return source.byteLength > 20480
          },
          minimizerOptions: {
            plugins: ["imagemin-webp"],
          },
        }),
        new MelonMinFontPlugin({
          exclude: ['iconfont.ttf']
        }),
        new MelonCosPlugin({
          projectName,
          dirName,
          SecretId: '{{secretId}}',
          SecretKey: '{{secretKey}}',
          Bucket: '{{bucket}}',
          Region: '{{region}}'
        })
      ],
      mode: "production",
      output: {
        clean: true,
        publicPath: `{{domain}}/${projectName}/${dirName}/`
      }
    }
  } catch (error) {
    console.log("全局try捕获");
    console.log(error);
  }
}

