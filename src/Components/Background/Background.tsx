import { isUndefined, isObject } from "lodash";

import "./Background.styl";
import { Div, Img } from "utils/Components";
import { getRgbaColor } from "utils/tools";

export const Background: React.ComponentType<EditProps | SaveProps> = props => {
	const { extra_props, values, settings } = props;
	const {
		className: extra_props_className,
		...extra_props_rest
	} = extra_props.background;
	const {
		border_color,
		border_color_opacity,
		shadow_color,
		shadow_color_opacity,
		background_color,
		background_color_opacity,
		background_image_url,
		background_image_srcset,
		background_image_alt
	} = values;
	const className = [
		"background",
		...extra_props_className,
		background_image_url ? "has-image" : null
	];
	const className_from_value = [
		"background_fixed",
		"shadow_width",
		"border_width"
	];
	let style;
	style = {
		color: shadow_color
			? getRgbaColor(shadow_color, shadow_color_opacity)
			: null,
		borderColor: border_color
			? getRgbaColor(border_color, border_color_opacity)
			: null,
		backgroundColor: background_color
			? getRgbaColor(background_color, background_color_opacity)
			: null,
		backgroundImage:
			settings.background_image && background_image_url
				? `url(${background_image_url})`
				: null
	};
	style =
		extra_props.background.style && isObject(extra_props.background.style)
			? { ...style, ...extra_props.background.style }
			: style;

	if (
		isUndefined(settings.background_image) &&
		isUndefined(border_color) &&
		isUndefined(border_color_opacity) &&
		isUndefined(shadow_color) &&
		isUndefined(shadow_color_opacity) &&
		isUndefined(background_color) &&
		isUndefined(background_color_opacity)
	) {
		return null;
	}

	return (
		<Div
			{...extra_props_rest}
			className={className}
			style={style}
			className_from_value={{ className: className_from_value, values }}
		>
			{background_image_url && (
				<Img
					className="background-image"
					sizes="100vw"
					src={background_image_url}
					srcSet={background_image_srcset}
					alt={background_image_alt}
				/>
			)}
		</Div>
	);
};
