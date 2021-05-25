const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = (env, args) => ({
	mode: args.mode,
	entry: {
		main: './src/bootstrap.tsx'
	},
	output: {
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js']
	},
	module: {
		rules: [
			{
				test: /.tsx?$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				]
			}
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: './src/index.html'}
			]
		})
	],
	devServer: {
		port: 3000,
		open: 'Chrome',
		hot: true,
	},
});
