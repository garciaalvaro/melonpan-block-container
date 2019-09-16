const { name, version, description, homepage } = require("../package.json");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BannerPlugin, DefinePlugin } = require("webpack");
const nib = require("nib");

export default {
	entry: {
		front: "./src/index-front.ts",
		editor: "./src/index-editor.ts"
	},
	output: {
		path: __dirname + "/../build",
		filename: `${name}-[name].js`
	},
	resolve: {
		alias: {
			Components: __dirname + "/../src/Components",
			block: __dirname + "/../src/block",
			init: __dirname + "/../src/init",
			utils: __dirname + "/../src/utils"
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
							use: [nib()],
							import: ["~nib/index.styl"]
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
