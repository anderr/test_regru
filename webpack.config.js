const { join, resolve } = require('path');
const { createReadStream } = require('fs');

const webpack = require('webpack');

const HtmlPlugin = require('html-webpack-plugin');
const HtmlTemplatePlugin = require('html-webpack-template');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname,
    entry: {
        main: [join( __dirname, 'src/scss/style.scss'), join( __dirname, 'src/js/index.js' )]
    },

    output: join( __dirname, 'public/bundle.js' ),

    resolve: {
        modules: [
            resolve('./src/'),
            resolve('./node_modules'),
        ],
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 10', 'last 2 version', '> 1%', 'safari >= 7']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ],

            },
        ],
    },

    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: HtmlTemplatePlugin,
            inject: false,
            mobile: true,
            appMountId: 'app',
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`,
            },
        }),

        new MiniCssExtractPlugin({
            path: join( __dirname, 'public/' ),
            filename: "main.css"
        }),
    ],

    devServer: {
        contentBase: './public/',
        hot: true,
        port: 9000,
        setup(app) {
            app.get('/api/tiles', function(req, res)  {
                res.writeHead(200, { 'Content-Type' : 'application/json' });
                createReadStream(join(process.cwd(), 'api/tiles.json'), { encoding: 'utf-8' })
                    .pipe(res);
            });
        },
    },
};
