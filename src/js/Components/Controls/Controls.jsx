import l, { plugin_slug, showControl } from "../../utils";
import Background from "./Background";
import Content from "./Content";
import Padding from "./Padding";
import ShadowBorder from "./ShadowBorder";

const { isUndefined } = lodash;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;

class Controls extends Component {
	render() {
		const { props } = this;
		const sett = props.settings;

		return (
			<InspectorControls className={`${plugin_slug}-inspector_controls`}>
				{(showControl("content_maxwidth", sett) ||
					showControl("content_align", sett)) && (
					<Content {...props} />
				)}

				{(showControl("background_color", sett) ||
					showControl("background_color_opacity", sett) ||
					!isUndefined(sett.background_image)) && (
					<Background {...props} />
				)}

				{(showControl("padding", sett, sett) ||
					showControl("padding_top", sett) ||
					showControl("padding_bottom", sett) ||
					showControl("padding_left", sett) ||
					showControl("padding_right", sett) ||
					showControl("padding_topbottom", sett) ||
					showControl("padding_leftright", sett) ||
					showControl("padding_small_screen", sett) ||
					showControl("padding_top_small_screen", sett) ||
					showControl("padding_bottom_small_screen", sett) ||
					showControl("padding_left_small_screen", sett) ||
					showControl("padding_right_small_screen", sett) ||
					showControl("padding_topbottom_small_screen", sett) ||
					showControl("padding_leftright_small_screen", sett)) && (
					<Padding {...props} />
				)}

				{(showControl("border_color", sett) ||
					showControl("border_color_opacity", sett) ||
					showControl("border_width", sett) ||
					showControl("shadow_color", sett) ||
					showControl("shadow_color_opacity", sett) ||
					showControl("shadow_width", sett)) && (
					<ShadowBorder {...props} />
				)}
			</InspectorControls>
		);
	}
}

export default Controls;
