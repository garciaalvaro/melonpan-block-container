import tinycolor from "tinycolor2";

const getRgbaColor = (color, opacity = null) => {
	if (!color) {
		return null;
	}

	color = tinycolor(color);

	if (opacity === 0 || opacity) {
		color = color.setAlpha(opacity / 100);
	}

	return color.toRgbString();
};

export default getRgbaColor;
