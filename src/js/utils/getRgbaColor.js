import tinycolor from "tinycolor2";

const { isString, isFinite } = lodash;

const getRgbaColor = (color, opacity = null) => {
	if (!isString(color)) {
		return null;
	}

	color = tinycolor(color);

	if (!color.isValid()) {
		return null;
	}

	if (isFinite(opacity)) {
		opacity = Math.max(opacity, 0);
		opacity = Math.min(opacity, 100);

		color = color.setAlpha(opacity / 100);
	}

	return color.toRgbString();
};

export default getRgbaColor;
