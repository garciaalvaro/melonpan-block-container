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

test("should add the plugin prefix", () => {
	const with_pr_1 = addPrefix("example");

	expect(with_pr_1).toBe("mbc-example");
});
