import { plugin_slug } from "./info-plugin";

const { isUndefined, isObject, isBoolean, toString, forOwn, deburr } = lodash;

const sanitizeId = value => {
	value = deburr(value);
	value = value.replace(/[^\w-_]/g, "");

	return value;
};

const prepareCustomAttributeClasses = (settings, attributes) => {
	let custom_classes = [];

	forOwn(settings.custom, (value, key) => {
		if (
			isUndefined(attributes.custom[key]) ||
			attributes.custom[key] === ""
		) {
			return;
		}

		value = attributes.custom[key];

		if (isBoolean(value)) {
			value = attributes.custom[key] ? "enabled" : "disabled";
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
