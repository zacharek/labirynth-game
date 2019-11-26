const path = require("path");
const entryPath = "";
const entryFile = "render.js";

module.exports = {
    entry: `./js/${entryFile}`,
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, `/build`)
    },
    devServer: {
        contentBase: path.join(__dirname, `${entryPath}`),
        publicPath: "/build/",
        compress: true,
        port: 3007
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}