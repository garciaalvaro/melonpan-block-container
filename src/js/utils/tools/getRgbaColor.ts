import tinycolor from "tinycolor2";

const { isUndefined } = lodash;

export const getRgbaColor = (
	color_string: string,
	opacity?: number
): string | null => {
	let color = tinycolor(color_string);

	if (!color.isValid()) {
		return null;
	}

	if (!isUndefined(opacity)) {
		opacity = Math.max(opacity, 0);
		opacity = Math.min(opacity, 100);

		color = color.setAlpha(opacity / 100);
	}

	return color.toRgbString();
};
