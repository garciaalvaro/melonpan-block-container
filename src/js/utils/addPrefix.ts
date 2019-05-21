import l from "utils";
import { pr } from "./data-plugin";

const { compact } = lodash;

const resolvePrefix = (el: string, separator: string): string => {
	if (el.startsWith("#")) {
		return el.replace("#", "");
	}

	return pr + separator + el;
};

const addPrefix = (
	els: string | (string | null)[],
	separator: string = "-"
): string => {
	if (typeof els === "string") {
		return resolvePrefix(els, separator);
	}

	els = compact(els).map(el => resolvePrefix(el, separator));
	els = els.join(" ");

	return els;
};

export default addPrefix;
