module.exports = {
	setupFilesAfterEnv: ["<rootDir>/enzyme.config.js"],
	moduleNameMapper: {
		"^utils/(.+)": "<rootDir>/src/js/utils/$1",
		"^block/(.+)": "<rootDir>/src/js/block/$1",
		"^init/(.+)": "<rootDir>/src/js/init/$1",
		"^Components/(.+)": "<rootDir>/src/js/Components/$1"
	},
	setupFiles: ["<rootDir>/jest.globals.js"]
};
