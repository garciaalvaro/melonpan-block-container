import React from "react";
import { isUndefined } from "lodash";
import { Component } from "@wordpress/element";
import { withState } from "@wordpress/compose";
import * as blockEditor from "@wordpress/block-editor";
import * as editor from "@wordpress/editor";

import "./Controls.styl";
import { Background } from "../ControlBackground/ControlBackground";
import { Content } from "../ControlContent/ControlContent";
import { Padding } from "../ControlPadding/ControlPadding";
import { ShadowBorder } from "../ControlShadowBorder/ControlShadowBorder";

interface WithStateProps {
	controls_to_show: string[];
}

interface Props extends EditProps, WithStateProps {
	setState: Function;
}

const { InspectorControls } = blockEditor || editor;

export const Controls: React.ComponentType<EditProps> = withState<
	WithStateProps
>({
	controls_to_show: []
})(
	class extends Component<Props> {
		componentDidMount() {
			const { settings, setState } = this.props;
			const controls_to_show = [];

			if (
				([
					"content_maxwidth",
					"content_align",
					"content_color"
				] as (keyof Settings)[]).filter(
					prop => settings[prop] && settings[prop].show_control
				).length
			) {
				controls_to_show.push("content");
			}

			if (
				([
					"background_color",
					"background_color_opacity"
				] as (keyof Settings)[]).filter(
					prop => settings[prop] && settings[prop].show_control
				).length ||
				!isUndefined(settings.background_image)
			) {
				controls_to_show.push("background");
			}

			if (
				([
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
				] as (keyof Settings)[]).filter(
					prop => settings[prop] && settings[prop].show_control
				).length
			) {
				controls_to_show.push("padding");
			}

			if (
				([
					"border_color",
					"border_color_opacity",
					"border_width",
					"shadow_color",
					"shadow_color_opacity",
					"shadow_width"
				] as (keyof Settings)[]).filter(
					prop => settings[prop] && settings[prop].show_control
				).length
			) {
				controls_to_show.push("shadow_border");
			}

			setState({ controls_to_show });
		}

		render() {
			const { props } = this;
			const { controls_to_show } = props;

			return (
				<InspectorControls>
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
);
