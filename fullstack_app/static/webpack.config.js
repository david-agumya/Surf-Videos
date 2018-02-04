const webpack = require('webpack');
const config = {
    entry: __dirname + '/js/index.jsx',

    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                "test": /\.jsx$/,
                "exclude": /node_modules/,
                "use": 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            // This matches the babel plugin's setting
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                        },
                    },
                ],
            },

        ]
    },


};

module.exports = config;

