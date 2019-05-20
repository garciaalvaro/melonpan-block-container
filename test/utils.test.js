import l, {
	addPrefix,
	icons,
	prepareCustomAttributeClasses,
	getRgbaColor,
	getSrcset,
	plugin_namespace,
	pr,
	plugin_title,
	Div,
	Span,
	Img
} from "utils";

test("addPrefix", () => {
	expect(addPrefix("a")).toBe("mbc-a");
	expect(addPrefix(["a"])).toBe("mbc-a");
	expect(addPrefix("a", "-separator-")).toBe("mbc-separator-a");
	expect(addPrefix(["a"], "-separator-")).toBe("mbc-separator-a");
	expect(addPrefix("#a")).toBe("a");
	expect(addPrefix(["a", "b"])).toBe("mbc-a mbc-b");
	expect(addPrefix(["a", "b"], "-separator-")).toBe(
		"mbc-separator-a mbc-separator-b"
	);
	expect(addPrefix(["a", "#b"])).toBe("mbc-a b");
	expect(addPrefix({})).toBe(null);
	expect(addPrefix(123)).toBe(null);
	expect(addPrefix(false)).toBe(null);
	expect(addPrefix([123, "a"])).toBe("mbc-a");
	expect(addPrefix([123, 456])).toBe(null);
	expect(addPrefix("a", 123)).toBe("mbc-a");
	expect(addPrefix("a", false)).toBe("mbc-a");
});
