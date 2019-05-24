import l from "utils";
import prepareAttributes from "./prepareAttributes";
import prepareSettings from "./prepareSettings";
import prepareDeprecated from "./prepareDeprecated";
import prepareExtraProps from "./prepareExtraProps";

const { isObject, defaults } = lodash;

// Normalize the block props.
const prepareBlock = (block: Block) => {
	if (
		!isObject(block) ||
		!block.blocktype_props ||
		!block.blocktype_props.name ||
		!block.blocktype_props.title ||
		!block.blocktype_props.icon ||
		!block.blocktype_props.category
	) {
		return null;
	}

	// Set defaults
	block.settings = block.settings ? block.settings : {};
	block.supports = block.supports ? block.supports : {};
	block.deprecated = block.deprecated ? block.deprecated : [];
	block.extra_props = prepareExtraProps(
		defaults(block.extra_props, {
			container: {},
			content: {},
			background: {}
		})
	);
	block.innerblocks_props = block.innerblocks_props
		? block.innerblocks_props
		: {};

	// Prepare each property.
	block.settings = prepareSettings(block.settings);
	block.attributes = prepareAttributes(block.settings);
	block.deprecated = prepareDeprecated(
		block.deprecated,
		block.settings,
		block.extra_props
	);

	const {
		attributes,
		deprecated,
		supports,
		extra_props,
		settings,
		innerblocks_props
	} = block;

	return {
		blocktype_props: {
			...block.blocktype_props,
			attributes,
			deprecated,
			supports
		},
		extra_props,
		settings,
		innerblocks_props
	};
};

export default prepareBlock;
