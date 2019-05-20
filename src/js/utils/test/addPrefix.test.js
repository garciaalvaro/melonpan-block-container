import l, { addPrefix } from "utils";

describe("addPrefix", () => {
	it('should return a string with CSS classes with a Prefix', () => {
		expect(addPrefix("a")).toBe("mbc-a");
		expect(addPrefix(["a"])).toBe("mbc-a");
		expect(addPrefix(["a", "b"])).toBe("mbc-a mbc-b");
	});

	it('should return a string with CSS classes without a Prefix or mixed', () => {
		expect(addPrefix("#a")).toBe("a");
		expect(addPrefix(["a", "#b"])).toBe("mbc-a b");
	});

	it('should return a string with CSS classes without a Prefix or mixed', () => {
		expect(addPrefix("a", "-separator-")).toBe("mbc-separator-a");
		expect(addPrefix(["a"], "-separator-")).toBe("mbc-separator-a");
		expect(addPrefix(["a", "b"], "-separator-")).toBe(
			"mbc-separator-a mbc-separator-b"
			);
	});

	it('should return null or a string with only the valid CSS classes', () => {
		expect(addPrefix({})).toBe(null);
		expect(addPrefix(123)).toBe(null);
		expect(addPrefix(false)).toBe(null);
		expect(addPrefix([123, "a"])).toBe("mbc-a");
		expect(addPrefix([123, 456])).toBe(null);
		expect(addPrefix("a", 123)).toBe("mbc-a");
		expect(addPrefix("a", false)).toBe("mbc-a");
	});
});
