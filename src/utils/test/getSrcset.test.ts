import { getSrcset } from "utils/tools/getSrcset";

describe("getSrcset", () => {
	const sizes = {
		thumbnail: {
			height: 111,
			width: 150,
			url: "http://example/image-150x150.jpg",
			extra: 123
		},
		medium: {
			height: 111,
			width: 51,
			url: "http://example/image-51x300.jpg",
			extra: false
		},
		large: {
			height: 111,
			width: 174,
			url: "http://example/image-174x1024.jpg",
			extra: true
		},
		full: {
			height: 111,
			width: 500,
			url: "http://example/image.jpg",
			extra: null
		}
	};

	// TODO: Add tests
	it("should return an ordered string", () => {
		expect(getSrcset(sizes)).toBe(
			[
				"http://example/image-51x300.jpg 51w",
				"http://example/image-150x150.jpg 150w",
				"http://example/image-174x1024.jpg 174w",
				"http://example/image.jpg 500w"
			].join(", ")
		);
	});
});
