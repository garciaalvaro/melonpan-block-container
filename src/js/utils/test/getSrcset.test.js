import l, { getSrcset } from "utils";

describe("getSrcset", () => {
	const sizes = {
		thumbnail: {
			file: "core-multiple-2-150x150.jpg",
			width: 150,
			height: 150,
			mime_type: "image/jpeg",
			source_url:
				"http://localhost:4444/wp-content/uploads/2019/05/core-multiple-2-150x150.jpg"
		},
		medium: {
			file: "core-multiple-2-51x300.jpg",
			width: 51,
			height: 300,
			mime_type: "image/jpeg",
			source_url:
				"http://localhost:4444/wp-content/uploads/2019/05/core-multiple-2-51x300.jpg"
		},
		large: {
			file: "core-multiple-2-174x1024.jpg",
			width: 174,
			height: 1024,
			mime_type: "image/jpeg",
			source_url:
				"http://localhost:4444/wp-content/uploads/2019/05/core-multiple-2-174x1024.jpg"
		},
		full: {
			file: "core-multiple-2.jpg",
			width: 500,
			height: 2938,
			mime_type: "image/jpeg",
			source_url:
				"http://localhost:4444/wp-content/uploads/2019/05/core-multiple-2.jpg"
		}
	};

	// it("should return a string", () => {
	// 	expect(getSrcset(sizes)).toBe("");
	// });
});
