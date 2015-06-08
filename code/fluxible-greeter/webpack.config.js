module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: './client.js',
    output: {
        path: './build/js',
        publicPath: '/public/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            //{ test: /\.js$/, exclude: /node_modules/, loader: require.resolve('babel-loader') },
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel',
                query: {
                    stage: 0
                }
            },
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    watch: true,
    keepalive: true
};
