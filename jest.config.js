module.exports = {
	moduleNameMapper: {
		"^utils/(.+)": "<rootDir>/src/utils/$1",
		"^block/(.+)": "<rootDir>/src/block/$1",
		"^init/(.+)": "<rootDir>/src/init/$1",
		"^Components/(.+)": "<rootDir>/src/Components/$1",
		"\\.(css|styl)$": "identity-obj-proxy"
	},
	setupFilesAfterEnv: ["jest-enzyme"],
	testEnvironment: "enzyme",
	setupFiles: ["<rootDir>/jest.globals.js"]
};
