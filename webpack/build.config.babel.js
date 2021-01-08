import { name, version, description, homepage } from "../package.json";
import TerserJSPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BannerPlugin, DefinePlugin } from "webpack";
import nib from "nib";
import path from "path";

export default {
	entry: {
		front: path.join(__dirname, "../src/index-front.ts"),
		editor: path.join(__dirname, "../src/index-editor.ts")
	},
	output: {
		path: path.join(__dirname, "../build"),
		filename: `${name}-[name].js`
	},
	resolve: {
		alias: {
			Components: path.join(__dirname, "../src/Components"),
			block: path.join(__dirname, "../src/block"),
			init: path.join(__dirname, "../src/init"),
			utils: path.join(__dirname, "../src/utils")
		}
	},
	externals: {
		lodash: "lodash",
		react: "React",
		"react-dom": "ReactDOM",
		"@wordpress/block-editor": "wp.blockEditor",
		"@wordpress/block-serialization-default-parser":
			"wp.blockSerializationDefaultParser",
		"@wordpress/blocks": "wp.blocks",
		"@wordpress/components": "wp.components",
		"@wordpress/data": "wp.data",
		"@wordpress/editor": "wp.editor",
		"@wordpress/element": "wp.element",
		"@wordpress/hooks": "wp.hooks",
		"@wordpress/i18n": "wp.i18n"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				resolve: {
					extensions: [".tsx", ".ts", ".js", ".jsx"]
				}
			},
			{
				test: /\.(css|styl)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "stylus-loader",
						options: {
							stylusOptions: {
								use: [nib()],
								import: ["~nib/index.styl"]
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new DefinePlugin({
			l: (...args) => console.log(...args)
		}),
		new MiniCssExtractPlugin({
			filename: `${name}-[name].css`
		}),
		new BannerPlugin({
			banner: [
				`/*! ${description} | ${version} | ${homepage} */`,
				"/*! TinyColor | https://github.com/bgrins/TinyColor | Brian Grinstead | MIT License */"
			].join(""),
			raw: true,
			include: new RegExp(/.*?\.js/)
		}),
		new BannerPlugin({
			banner: `${description} | ${version} | ${homepage}`,
			include: new RegExp(/.*?\.css/)
		})
	],
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
	}
};
