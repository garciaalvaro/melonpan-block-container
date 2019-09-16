module.exports = {
	setupFilesAfterEnv: ["<rootDir>/enzyme.config.js"],
	moduleNameMapper: {
		"^utils/(.+)": "<rootDir>/src/utils/$1",
		"^block/(.+)": "<rootDir>/src/block/$1",
		"^init/(.+)": "<rootDir>/src/init/$1",
		"^Components/(.+)": "<rootDir>/src/Components/$1",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		"\\.(css|less|scss|sass|styl)$": "identity-obj-proxy"
	},
	setupFiles: ["<rootDir>/jest.globals.js"]
};
