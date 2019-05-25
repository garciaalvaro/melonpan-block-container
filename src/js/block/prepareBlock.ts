import l from "utils";
import prepareAttributes from "./prepareAttributes";
import prepareSettings from "./prepareSettings";
import prepareDeprecated from "./prepareDeprecated";
import prepareExtraProps from "./prepareExtraProps";

const { defaults } = lodash;

// Normalize the block props.
const prepareBlock = (block: Block): Object => {
	// Set defaults
	block.settings = block.settings ? block.settings : {};
	block.supports = block.supports ? block.supports : {};
	block.deprecated = block.deprecated ? block.deprecated : [];
	block.extra_props = block.extra_props
		? prepareExtraProps(block.extra_props)
		: prepareExtraProps({});
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
