import l from "../utils";

const { isObject } = lodash;

const prepareExtraProps = extra_props => {
	if (!isObject(extra_props)) {
		return { container: {}, content: {}, background: {} };
	}

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
