const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {

    return {

        entry:{
            main: [
                'babel-polyfill',
                './src/main.js'
            ]
        },
        mode: 'production',
        output: {
            filename: '[name]-bundle.js',
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]                
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCSSExtractPlugin.loader },
                        { loader: 'css-loader', 
                            options: {
                                minimize: false // use OptimizeCssAssetsPlugin instead
                            } 
                        }
                    ]
                },  
                {
                    test: /\.scss$/,
                    use: [
                        { loader: MiniCSSExtractPlugin.loader },
                        { loader: 'css-loader', 
                            options: {
                                minimize: false // use OptimizeCssAssetsPlugin instead
                            } 
                        },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' }
                    ]
                },
                {
                    test:/\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: ["img:src"]
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|gif|png|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'images/[name][hash].[ext]',
                                limit: 10 * 1024
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 80
                                },
                                pngquant: {
                                    quality: '90-95',
                                    speed: 1
                                },
                                // gifsicle: {
                                //     interlaced: false,
                                //     optimizationLevel: 3
                                // },  
                            }    
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist'],{
                root: path.join(__dirname, '..')
            }),
            new OptimizeCssAssetsPlugin(),
            new MiniCSSExtractPlugin({
                filename: '[name]-[contenthash].css'
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new webpack.DefinePlugin({ // Good for react and others as it tells them to use production flag
                'process.env': {
                    NODE_ENV: JSON.stringify(env.NODE_ENV)
                }
            }),
            //new MinifyPlugin()
            new UglifyJSPlugin(),
        ]
    }
}