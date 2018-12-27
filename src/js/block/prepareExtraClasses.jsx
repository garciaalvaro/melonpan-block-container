import l from "../utils";

const { isString, isObject } = lodash;

const prepareExtraClasses = extra_classes => {
	if (!isObject(extra_classes)) {
		return { container: "", content: "", background: "" };
	}

	const container = isString(extra_classes.container)
		? extra_classes.container
		: "";
	const content = isString(extra_classes.content)
		? extra_classes.content
		: "";
	const background = isString(extra_classes.background)
		? extra_classes.background
		: "";

	return { container, content, background };
};

export default prepareExtraClasses;
