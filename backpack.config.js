const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    webpack: (config, options, webpack) => {
        config.entry.main = [
            './src/index.ts'
        ];
        config.devtool = false;
        config.mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
        config.resolve = {
            extensions: [".ts", ".js", ".json"]
        };

        config.module.rules.push({
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            options: {
                sourceMap: false,
                productionSourceMap: false,
            }
        });
        if (process.env.NODE_ENV === 'production') {
            //config.productionSourceMap = false;
        }
        return config
    }
};