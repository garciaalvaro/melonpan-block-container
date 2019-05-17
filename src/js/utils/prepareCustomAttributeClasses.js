import { plugin_slug } from "./data-plugin";

const { isUndefined, isObject, isBoolean, toString, forOwn, deburr } = lodash;

const sanitizeId = value => {
	value = deburr(value);
	value = value.replace(/[^\w-_]/g, "");

	return value;
};

const prepareCustomAttributeClasses = (settings, attributes, is_edit) => {
	let custom_classes = [];
	const attributes_custom = attributes.custom;

	forOwn(settings.custom, (value, key) => {
		if (isUndefined(attributes_custom[key]) && is_edit) {
			attributes_custom[key] = settings.custom[key].default;
		}

		if (isUndefined(attributes_custom[key]) || attributes_custom[key] === "") {
			return;
		}

		value = attributes_custom[key];

		if (isBoolean(value)) {
			value = attributes_custom[key] ? "enabled" : "disabled";
		} else if (isObject(value) && !isUndefined(value.default)) {
			value = sanitizeId(value.default);
		} else {
			value = sanitizeId(toString(value));
		}

		custom_classes.push(`${plugin_slug}-${key}-${value}`);
	});

	custom_classes = custom_classes.join(" ");

	return custom_classes;
};

export default prepareCustomAttributeClasses;
