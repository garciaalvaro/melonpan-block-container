import l from "utils";
import { pr } from "./data-plugin";

const { isArray, isString, compact } = lodash;

const resolvePrefix = (el, separator) => {
	if (el.startsWith("#")) {
		return el.replace("#", "");
	}

	return pr + separator + el;
};

const addPrefix = (els, separator = "-") => {
	separator = isString(separator) ? separator : "-";

	if (isString(els)) {
		return resolvePrefix(els, separator);
	} else if (isArray(els)) {
		els = els.filter(el => isString(el));
		els = els.map(el => resolvePrefix(el, separator));
		els = els.join(" ");

		if (els.length) {
			return els;
		}
	}

	return null;
};

export default addPrefix;
