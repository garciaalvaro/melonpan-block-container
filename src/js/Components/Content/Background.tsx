import l, { Div, Img, getRgbaColor } from "utils";

interface Props extends Object {
	values: Object;
	extra_props: BlockExtraProps;
}

const { isUndefined, isObject } = lodash;

const Background: React.FunctionComponent<Props> = props => {
	const { extra_props, values, settings } = props;
	const {
		className: extra_props_className,
		...rest_extra_props
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
	const classes = [
		"background",
		...extra_props_className,
		background_image_url ? "has-image" : null
	];
	const classes_from_value = [
		"background_fixed",
		"shadow_width",
		"border_width"
	];
	let style;
	style = {
		color: getRgbaColor(shadow_color, shadow_color_opacity),
		borderColor: getRgbaColor(border_color, border_color_opacity),
		backgroundColor: getRgbaColor(background_color, background_color_opacity),
		backgroundImage:
			settings.background_image && background_image_url
				? `url(${background_image_url})`
				: null
	};
	style = isObject(extra_props.background.style)
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
			{...rest_extra_props}
			classes={classes}
			style={style}
			classes_from_value={{ classes: classes_from_value, values }}
		>
			{background_image_url && (
				<Img
					classes="background-image"
					sizes="100vw"
					src={background_image_url}
					srcSet={background_image_srcset}
					alt={background_image_alt}
				/>
			)}
		</Div>
	);
};

export default Background;
