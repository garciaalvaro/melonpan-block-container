import l from "./log";
import tinycolor from "tinycolor2";

const { isUndefined } = lodash;

const prepareColor = (color, opacity) => {
	if (!isUndefined(color) && color !== "") {
		if (!isUndefined(opacity)) {
			return tinycolor(color)
				.setAlpha(opacity / 100)
				.toRgbString();
		}

		return tinycolor(color).toRgbString();
	}

	return null;
};

export default prepareColor;
