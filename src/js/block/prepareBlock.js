import l from "utils";
import prepareAttributes from "./prepareAttributes";
import prepareSettings from "./prepareSettings";
import prepareDeprecated from "./prepareDeprecated";
import prepareExtraProps from "./prepareExtraProps";

const { isObject } = lodash;

// Normalize the block props.
const prepareBlock = block => {
	if (!isObject(block)) {
		return null;
	}

	// Prepare each property.
	const settings = prepareSettings(block);
	const attributes = prepareAttributes(settings);
	const innerblocks_props = !isObject(block.innerblocks_props)
		? {}
		: block.innerblocks_props;
	const supports = !isObject(block.blocktype_props.supports)
		? {}
		: block.blocktype_props.supports;
	const extra_props = prepareExtraProps(block.extra_props);
	const deprecated = prepareDeprecated(block.deprecated, settings, extra_props);

	block = {
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

	return block;
};

export default prepareBlock;
