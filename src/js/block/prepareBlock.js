import l from "utils";
import prepareAttributes from "./prepareAttributes";
import prepareSettings from "./prepareSettings";
import prepareDeprecated from "./prepareDeprecated";
import prepareExtraProps from "./prepareExtraProps";

const { isObject } = lodash;

// Normalize the block props.
const prepareBlock = props => {
	if (!isObject(props)) {
		return false;
	}

	// Prepare each property.
	const settings = prepareSettings(props.settings);
	const attributes = prepareAttributes(settings);
	const innerblocks_props = !isObject(props.innerblocks_props)
		? {}
		: props.innerblocks_props;
	const supports = !isObject(props.blocktype_props.supports)
		? {}
		: props.blocktype_props.supports;
	const extra_props = prepareExtraProps(props.extra_props);
	const deprecated = prepareDeprecated(props.deprecated, settings, extra_props);

	props = {
		blocktype_props: {
			...props.blocktype_props,
			attributes,
			deprecated,
			supports
		},
		extra_props,
		settings,
		innerblocks_props
	};

	return props;
};

export default prepareBlock;
