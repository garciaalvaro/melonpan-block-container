import l from "../utils";
import prepareAttributes from "./prepareAttributes";
import prepareSettings from "./prepareSettings";
import prepareDeprecated from "./prepareDeprecated";

const { isObject } = lodash;

const prepareBlock = block => {
	if (!isObject(block)) {
		return false;
	}

	const settings = prepareSettings(block.settings);
	const attributes = prepareAttributes(settings);
	const innerblocks_props = !isObject(block.innerblocks_props)
		? {}
		: block.innerblocks_props;
	const deprecated = prepareDeprecated(attributes, block.deprecated_settings);
	const supports = !isObject(block.blocktype_props.supports)
		? {}
		: block.blocktype_props.supports;

	block = {
		blocktype_props: {
			...block.blocktype_props,
			attributes,
			deprecated,
			supports
		},
		settings,
		innerblocks_props
	};

	return block;
};

export default prepareBlock;
