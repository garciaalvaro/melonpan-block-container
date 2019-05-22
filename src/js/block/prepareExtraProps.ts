import l from "utils";

const { isObject } = lodash;

// Normalize the extra_props object.
const prepareExtraProps = (extra_props: BlockExtraProps) => {
	const container = isObject(extra_props.container)
		? extra_props.container
		: {};
	const content = isObject(extra_props.content) ? extra_props.content : {};
	const background = isObject(extra_props.background)
		? extra_props.background
		: {};

	return { container, content, background };
};

export default prepareExtraProps;
