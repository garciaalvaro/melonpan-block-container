import l from "utils";

const { find, isUndefined } = lodash;
const { select, dispatch } = wp.data;
let categories;

categories = select("core/blocks").getCategories();

if (isUndefined(find(categories, { slug: "melonpan" }))) {
	categories.push({
		slug: "melonpan",
		title: "Melonpan Blocks",
		icon: null
	});

	// Set the new category.
	dispatch("core/blocks").setCategories(categories);
}
