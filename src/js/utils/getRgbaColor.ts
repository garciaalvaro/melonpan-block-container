import tinycolor from "tinycolor2";

const getRgbaColor = (
	color_string: string,
	opacity?: number
): string | null => {
	let color = tinycolor(color_string);

	if (!color.isValid()) {
		return null;
	}

	if (typeof opacity === "number") {
		opacity = Math.max(opacity, 0);
		opacity = Math.min(opacity, 100);

		color = color.setAlpha(opacity / 100);
	}

	return color.toRgbString();
};

export default getRgbaColor;
