import l, { plugin_slug } from "../../utils";
import Background from "./Background";
import Content from "./Content";
import Padding from "./Padding";
import ShadowBorder from "./ShadowBorder";

const { isUndefined } = lodash;
const { Component, Fragment } = wp.element;
const { InspectorControls } = wp.editor;

class Controls extends Component {
	render() {
		const { props } = this;
		const {
			background_color,
			background_color_opacity,
			background_image_id,
			background_image_url,
			content_align,
			content_maxwidth,
			padding,
			padding_top,
			padding_bottom,
			padding_left,
			padding_right,
			padding_topbottom,
			padding_leftright,
			padding_small_screen,
			padding_top_small_screen,
			padding_bottom_small_screen,
			padding_left_small_screen,
			padding_right_small_screen,
			padding_topbottom_small_screen,
			padding_leftright_small_screen,
			border_width,
			border_color,
			border_color_opacity,
			shadow_width,
			shadow_color,
			shadow_color_opacity
		} = props.settings;

		return (
			<InspectorControls className={`${plugin_slug}-inspector_controls`}>
				{(!isUndefined(content_maxwidth) ||
					!isUndefined(content_align)) && <Content {...props} />}

				{(!isUndefined(background_color) ||
					!isUndefined(background_color_opacity) ||
					!isUndefined(background_image_id) ||
					!isUndefined(background_image_url)) && (
					<Background {...props} />
				)}

				{(!isUndefined(padding) ||
					!isUndefined(padding_top) ||
					!isUndefined(padding_bottom) ||
					!isUndefined(padding_left) ||
					!isUndefined(padding_right) ||
					!isUndefined(padding_topbottom) ||
					!isUndefined(padding_leftright) ||
					!isUndefined(padding_small_screen) ||
					!isUndefined(padding_top_small_screen) ||
					!isUndefined(padding_bottom_small_screen) ||
					!isUndefined(padding_left_small_screen) ||
					!isUndefined(padding_right_small_screen) ||
					!isUndefined(padding_topbottom_small_screen) ||
					!isUndefined(padding_leftright_small_screen)) && (
					<Padding {...props} />
				)}

				{(!isUndefined(border_color) ||
					!isUndefined(border_color_opacity) ||
					!isUndefined(border_width) ||
					!isUndefined(shadow_color) ||
					!isUndefined(shadow_color_opacity) ||
					!isUndefined(shadow_width)) && <ShadowBorder {...props} />}
			</InspectorControls>
		);
	}
}

export default Controls;
