import l from "../utils";
import prepareAttributes from "./prepareAttributes";
import prepareSettings from "./prepareSettings";
import prepareDeprecated from "./prepareDeprecated";
import prepareExtraProps from "./prepareExtraProps";

const { isObject } = lodash;

const prepareBlock = props => {
	if (!isObject(props)) {
		return false;
	}

	const settings = prepareSettings(props.settings);
	const attributes = prepareAttributes(settings);
	const innerblocks_props = !isObject(props.innerblocks_props)
		? {}
		: props.innerblocks_props;
	const deprecated = prepareDeprecated(attributes, props.deprecated);
	const supports = !isObject(props.blocktype_props.supports)
		? {}
		: props.blocktype_props.supports;
	const extra_props = prepareExtraProps(props.extra_props);

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
