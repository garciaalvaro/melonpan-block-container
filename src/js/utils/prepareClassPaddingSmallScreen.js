import { plugin_slug } from "./info-plugin";
import getValue from "./getValue";

const { isUndefined } = lodash;

const prepareClassPaddingSmallScreen = (padding_name, settings, attributes) => {
	const padding_value = getValue(padding_name, settings, attributes);
	const max_padding_value = getValue(
		"max_padding_small_screen",
		settings,
		attributes
	);

	return !isUndefined(padding_value) &&
		!isUndefined(max_padding_value) &&
		padding_value > max_padding_value
		? `${plugin_slug}-${padding_name}-gt-max_padding-${max_padding_value}`
		: "";
};

export default prepareClassPaddingSmallScreen;
