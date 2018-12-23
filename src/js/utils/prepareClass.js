import { plugin_slug } from "./info-plugin";
import getValue from "./getValue";

const { isUndefined } = lodash;

const prepareClass = (name, settings, attributes, custom_value) => {
	const value = custom_value
		? custom_value
		: getValue(name, settings, attributes);

	return !isUndefined(value) ? `${plugin_slug}-${name}-${value}` : "";
};

export default prepareClass;
