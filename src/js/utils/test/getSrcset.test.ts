import l, { getSrcset } from "utils";

describe("getSrcset", () => {
	const sizes = {
		thumbnail: {
			width: 150,
			url: "http://example/image-150x150.jpg",
			extra: 123
		},
		medium: {
			width: 51,
			url: "http://example/image-51x300.jpg",
			extra: false
		},
		large: {
			width: 174,
			url: "http://example/image-174x1024.jpg",
			extra: true
		},
		full: {
			width: 500,
			url: "http://example/image.jpg",
			extra: null
		}
	};

	// TODO: add tests
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
