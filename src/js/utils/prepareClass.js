import { plugin_slug } from "./info-plugin";
const { isUndefined } = lodash;

const prepareClass = (name, value, with_slug = true) => {
	if (with_slug) {
		return !isUndefined(value) ? `${plugin_slug}-${name}-${value}` : "";
	}

	return !isUndefined(value) ? `${name}${value}` : "";
};

export default prepareClass;
