import l, { plugin_slug, plugin_namespace, cleanClassName } from "../utils";

const { isUndefined } = lodash;
const { addFilter } = wp.hooks;

const removeDeprecatedClasses = (attributes, block_type) => {
	if (
		block_type.name !== `${plugin_namespace}/container` ||
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
