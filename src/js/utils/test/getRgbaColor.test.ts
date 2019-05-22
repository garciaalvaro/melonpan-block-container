import l, { getRgbaColor } from "utils";

describe("getRgbaColor", () => {
	it("should return a RGB/RGBA string", () => {
		expect(getRgbaColor("#f00")).toBe("rgb(255, 0, 0)");
		expect(getRgbaColor("#ff0000")).toBe("rgb(255, 0, 0)");
		expect(getRgbaColor("rgb(255, 0, 0)")).toBe("rgb(255, 0, 0)");
		expect(getRgbaColor("rgba(255, 0, 0, 0.99)")).toBe("rgba(255, 0, 0, 0.99)");
		expect(getRgbaColor("#f00", 100)).toBe("rgb(255, 0, 0)");
		expect(getRgbaColor("#f00", 99)).toBe("rgba(255, 0, 0, 0.99)");
	});

	it("should return an alpha inside the range 0-100", () => {
		expect(getRgbaColor("#f00", 222)).toBe("rgb(255, 0, 0)");
		expect(getRgbaColor("#f00", -1)).toBe("rgba(255, 0, 0, 0)");
	});

	it("should return null", () => {
		expect(getRgbaColor("a")).toBe(null);
		expect(getRgbaColor("a", 99)).toBe(null);
	});
});
