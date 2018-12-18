import l, {
	Div,
	Img,
	plugin_slug,
	prepareClass,
	prepareColor
} from "../../utils";

const { isUndefined, compact } = lodash;
const { Component } = wp.element;

class Background extends Component {
	getClasses = () => {
		const { shadow_width, border_width } = this.props.attributes;

		let classes;
		classes = [
			`${plugin_slug}-background`,
			prepareClass("shadowwidth", shadow_width),
			prepareClass("borderwidth", border_width)
		];
		classes = compact(classes);
		classes = classes.join(" ");

		return classes;
	};

	getStyles = () => {
		let {
			border_color,
			border_color_opacity,
			shadow_color,
			shadow_color_opacity,
			background_color,
			background_color_opacity
		} = this.props.attributes;

		const style = {
			"--border_color": prepareColor(border_color, border_color_opacity),
			"--shadow_color": prepareColor(shadow_color, shadow_color_opacity),
			"--background_color": prepareColor(
				background_color,
				background_color_opacity
			)
		};

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
			<Div className={getClasses()} style={getStyles()}>
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
