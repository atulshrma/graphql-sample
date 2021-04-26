const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const production = process.env.NODE_ENV === 'production';

const pages = ['jobs'];

const generateEntryPoints = (entry) => {
    return entry.reduce((obj, item) => {
        return Object.assign({}, obj, {
            [item]: [path.resolve('src', 'entrypoints', `${item}.js`)],
        });
    }, {});
};

const generateHtml = (entry) => {
    return entry.map((i) => {
        return new HtmlWebpackPlugin({
            chunks: [i],
            filename: `../views/${i}.ejs`,
            template: path.join('src', 'views', 'index.ejs'),
        });
    });
};

const plugins = [
    new CleanWebpackPlugin(),
    // create blog,
    new MiniCssExtractPlugin({
        filename: production ? 'css/[contentHash].css' : 'css/[id].css',
        chunkFilename: production ? 'css/[contentHash].css' : 'css/[id].css',
    }),
    // Ejs pages
    ...generateHtml(pages),
];

if (process.env.NODE_ENV !== 'production') {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
    plugins.push(new webpack.DefinePlugin(envKeys));
} else {
    const envKeys = Object.keys(process.env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
        return prev;
    }, {});
    plugins.push(new webpack.DefinePlugin(envKeys));
}

const config = [
    {
        entry: Object.assign({}, generateEntryPoints(pages)),

        output: {
            path: production
                ? path.resolve(__dirname, 'dist', 'static', 'public')
                : path.resolve(__dirname, 'src', 'static', 'public'),
            filename: production ? 'js/[chunkhash].js' : 'js/[name].js',
            publicPath: '/public',
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                        },
                    },
                    exclude: [/node_modules/, /static/],
                },
                {
                    test: /\.ejs$/,
                    loader: 'raw-loader',
                },
                {
                    test: /\.(css)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '/public/css',
                            },
                        },
                        'css-loader',
                    ],
                },
                {
                    test: /\.(jpg|jpeg|png|svg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[md5:hash:hex].[ext]',
                                publicPath: '/public/img',
                                outputPath: 'img',
                            },
                        },
                    ],
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*'],
        },

        optimization: {
            splitChunks: {
                automaticNameDelimiter: '.',
                cacheGroups: {
                    react: {
                        chunks: 'initial',
                    },
                },
            },
        },

        plugins,
    },
];

module.exports = config;
