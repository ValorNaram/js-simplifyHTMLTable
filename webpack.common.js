const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.m?js$/,
				resolve: {
					fullySpecified: false,
				},
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
		fullySpecified: false
	},
	devServer: {
		host: "0.0.0.0",
		port: 8080,
		allowedHosts:
			- "*"
	},
	output: {
		filename: "jssimplifyhtmltable-bundle.js",
		path: path.resolve(__dirname, "dist_browser"),
		globalObject: "this",
		publicPath: "/",
		library: {
			name: "SimplifyHTMLTable",
			type: "umd",
			//export: "default",
		},
		clean: true,
	},
	entry: "./src/index.ts",
	plugins: [
		new HtmlWebpackPlugin({
			title: "SimplifyTable Demo",
			template: "./demos/conceptual.html",
			scriptLoading: "blocking",
			inject: "head",
		}),
		new HtmlWebpackPlugin({
			title: "Fairy Safari Table Demo",
			template: "./demos/fairy-safari-table.html",
			scriptLoading: "blocking",
			inject: "head",
			filename: "fairy-safari-table"
		}),
	// new CopyPlugin({
	// 	patterns: ["src/index.css"]
	// })
	],
};
