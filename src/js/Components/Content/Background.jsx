import l, {
	Div,
	Img,
	plugin_slug,
	prepareColor,
	prepareClass,
	getValue
} from "../../utils";

const { isUndefined, isNil, isObject, compact } = lodash;
const { Component } = wp.element;

class Background extends Component {
	getClasses = () => {
		const { extra_props, settings, attributes } = this.props;

		let classes;
		classes = [
			`${plugin_slug}-background`,
			extra_props.background.className,

			!isUndefined(settings.background_image) &&
			!isUndefined(attributes.background_image_url)
				? `${plugin_slug}-has-image`
				: null,
			prepareClass("background_fixed", settings, attributes),
			prepareClass("shadow_width", settings, attributes),
			prepareClass("border_width", settings, attributes)
		];
		// Remove falsey values.
		classes = compact(classes);
		classes = classes.join(" ");

		return classes;
	};

	getStyle = () => {
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

		let style;
		style = {
			color: prepareColor(shadow_color, shadow_color_opacity),
			borderColor: prepareColor(border_color, border_color_opacity),
			backgroundColor: prepareColor(
				background_color,
				background_color_opacity
			),
			backgroundImage:
				!isUndefined(settings.background_image) &&
				!isNil(attributes.background_image_url)
					? `url(${attributes.background_image_url})`
					: null
		};
		style = isObject(extra_props.background.style)
			? { ...style, ...extra_props.background.style }
			: style;

		return style;
	};

	render() {
		const { getClasses, getStyle, props } = this;
		const { attributes, settings, extra_props } = props;
		const {
			background_image_url,
			background_image_srcset,
			background_image_alt
		} = attributes;
		const {
			background_image,
			border_color,
			border_color_opacity,
			shadow_color,
			shadow_color_opacity,
			background_color,
			background_color_opacity
		} = settings;

		if (
			isUndefined(background_image) &&
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
				{...extra_props.background}
				className={getClasses()}
				style={getStyle()}
			>
				{!isUndefined(background_image) &&
					!isUndefined(background_image_url) && (
						<Img
							className={`${plugin_slug}-background-image`}
							sizes="100vw"
							src={background_image_url}
							srcSet={background_image_srcset}
							alt={background_image_alt}
						/>
					)}
			</Div>
		);
	}
}

export default Background;
