import l, {
	Div,
	Img,
	plugin_slug,
	prepareColor,
	prepareClass,
	getValue
} from "../../utils";

const { isUndefined, isObject, compact } = lodash;
const { Component } = wp.element;

class Background extends Component {
	getClasses = () => {
		const { extra_props, settings, attributes } = this.props;

		let classes;
		classes = [
			extra_props.background.className,
			`${plugin_slug}-background`,
			prepareClass("shadow_width", settings, attributes),
			prepareClass("border_width", settings, attributes)
		];
		classes = compact(classes);
		classes = classes.join(" ");

		return classes;
	};

	getStyles = () => {
		const { extra_props, settings, attributes } = this.props;
		const border_color = getValue("border_color", settings, attributes);
		const border_color_opacity = getValue(
			"border_color_opacity",
			settings,
			attributes
		);
		const shadow_color = getValue("shadow_color", settings, attributes);
		const shadow_color_opacity = getValue(
			"shadow_color_opacity",
			settings,
			attributes
		);
		const background_color = getValue(
			"background_color",
			settings,
			attributes
		);
		const background_color_opacity = getValue(
			"background_color_opacity",
			settings,
			attributes
		);

		let style = {
			"--border_color": prepareColor(border_color, border_color_opacity),
			"--shadow_color": prepareColor(shadow_color, shadow_color_opacity),
			"--background_color": prepareColor(
				background_color,
				background_color_opacity
			)
		};
		style = isObject(extra_props.background.style)
			? { ...style, ...extra_props.background.style }
			: style;

		return style;
	};

	render() {
		const { getClasses, getStyles, props } = this;
		const {
			background_image_url,
			background_image_srcset,
			background_image_alt,
			border_color,
			border_color_opacity,
			shadow_color,
			shadow_color_opacity,
			background_color,
			background_color_opacity
		} = props.attributes;

		if (
			isUndefined(background_image_url) &&
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
				{...props.extra_props.background}
				className={getClasses()}
				style={getStyles()}
			>
				{!isUndefined(background_image_url) && (
					<Img
						className={`${plugin_slug}-background-image`}
						sizes="100vw"
						src={background_image_url}
						srcset={background_image_srcset}
						alt={background_image_alt}
					/>
				)}
			</Div>
		);
	}
}

export default Background;
