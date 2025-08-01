import * as path from "path";
import { fileURLToPath } from "url";

import HtmlWebpackPlugin from "html-webpack-plugin";

HtmlWebpackPlugin.length;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __dirname = path.dirname("path/to/directory/file.txt");

export default {
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
		new HtmlWebpackPlugin({
			title: "Fairy City Ranking Table Demo",
			template: "./demos/fairy-city-ranking.html",
			scriptLoading: "blocking",
			inject: "head",
			filename: "fairy-city-ranking"
		}),
		new HtmlWebpackPlugin({
			title: "Fairy City Ranking Table Demo",
			template: "./demos/fairy-city-ranking-semantic.html",
			scriptLoading: "blocking",
			inject: "head",
			filename: "fairy-city-ranking-semantic"
		}),
		new HtmlWebpackPlugin({
			title: "Freestyle Demo",
			template: "./demos/freestyle.html",
			scriptLoading: "blocking",
			inject: "head",
			filename: "freestyle"
		}),
	// new CopyPlugin({
	// 	patterns: ["src/index.css"]
	// })
	],
};
