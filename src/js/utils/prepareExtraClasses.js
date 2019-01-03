import { plugin_slug } from "./info-plugin";

const { isUndefined, isObject, isBoolean, toString, forOwn, deburr } = lodash;

const sanitizeId = value => {
	value = deburr(value);
	value = value.replace(/[^\w-_]/g, "");

	return value;
};

const prepareExtraClasses = (settings, attributes) => {
	let extra_classes = [];

	forOwn(settings.extra, (value, key) => {
		if (
			isUndefined(attributes.extra[key]) ||
			attributes.extra[key] === ""
		) {
			return;
		}

		value = attributes.extra[key];

		if (isBoolean(value)) {
			value = attributes.extra[key] ? "enabled" : "disabled";
		} else if (isObject(value) && !isUndefined(value.default)) {
			value = sanitizeId(value.default);
		} else {
			value = sanitizeId(toString(value));
		}

		extra_classes.push(`${plugin_slug}-${key}-${value}`);
	});

	extra_classes = extra_classes.join(" ");

	return extra_classes;
};

export default prepareExtraClasses;
