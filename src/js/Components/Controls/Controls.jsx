import l, { addPrefix } from "utils";
import Background from "./Background";
import Content from "./Content";
import Padding from "./Padding";
import ShadowBorder from "./ShadowBorder";

const { isUndefined } = lodash;
const { Component } = wp.element;
const { withState } = wp.compose;
const { InspectorControls } = wp.editor;

class Controls extends Component {
	componentDidMount() {
		const { settings, setState } = this.props;
		const controls_to_show = [];

		if (
			["content_maxwidth", "content_align", "content_color"].filter(prop => {
				return settings[prop] && settings[prop].show_control;
			}).length
		) {
			controls_to_show.push("content");
		}

		if (
			["background_color", "background_color_opacity"].filter(prop => {
				return settings[prop] && settings[prop].show_control;
			}).length ||
			!isUndefined(settings.background_image)
		) {
			controls_to_show.push("background");
		}

		if (
			[
				"padding",
				"padding_top",
				"padding_bottom",
				"padding_left",
				"padding_right",
				"padding_topbottom",
				"padding_leftright",
				"padding_small_screen",
				"padding_top_small_screen",
				"padding_bottom_small_screen",
				"padding_left_small_screen",
				"padding_right_small_screen",
				"padding_topbottom_small_screen",
				"padding_leftright_small_screen"
			].filter(prop => {
				return settings[prop] && settings[prop].show_control;
			}).length
		) {
			controls_to_show.push("padding");
		}

		if (
			[
				"border_color",
				"border_color_opacity",
				"border_width",
				"shadow_color",
				"shadow_color_opacity",
				"shadow_width"
			].filter(prop => {
				return settings[prop] && settings[prop].show_control;
			}).length
		) {
			controls_to_show.push("shadow_border");
		}

		setState({ controls_to_show });
	}

	render() {
		const { props } = this;
		const { controls_to_show } = props;

		return (
			<InspectorControls className={addPrefix("inspector_controls")}>
				{controls_to_show.includes("content") && <Content {...props} />}
				{controls_to_show.includes("background") && <Background {...props} />}
				{controls_to_show.includes("padding") && <Padding {...props} />}
				{controls_to_show.includes("shadow_border") && (
					<ShadowBorder {...props} />
				)}
			</InspectorControls>
		);
	}
}

export default withState({ controls_to_show: [] })(Controls);
