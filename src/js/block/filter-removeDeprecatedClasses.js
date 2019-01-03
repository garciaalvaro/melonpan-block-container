import l, { plugin_slug, cleanClassName } from "../utils";

const { isUndefined } = lodash;
const { addFilter } = wp.hooks;

const removeDeprecatedClasses = (attributes, block_type) => {
	if (
		isUndefined(block_type.is_melonpan_block_container) ||
		isUndefined(attributes.className)
	) {
		return attributes;
	}

	attributes.className = cleanClassName(attributes.className);

	return attributes;
};

addFilter(
	"blocks.getBlockAttributes",
	`${plugin_slug}/removeDeprecatedClasses`,
	removeDeprecatedClasses
);
