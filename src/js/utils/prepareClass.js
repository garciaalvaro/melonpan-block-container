import { plugin_slug } from "./info-plugin";
import getValue from "./getValue";

const { isUndefined, isBoolean } = lodash;

const prepareClass = (name, settings, attributes, custom_value) => {
	let value;
	value = custom_value ? custom_value : getValue(name, settings, attributes);

	if (isBoolean(value)) {
		value = value ? "enabled" : "disabled";
	}

	return !isUndefined(value) ? `${plugin_slug}-${name}-${value}` : "";
};

export default prepareClass;
