import React from "react";
import { isUndefined } from "lodash";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import {
	RangeControl,
	BaseControl,
	PanelBody,
	ColorIndicator
} from "@wordpress/components";
import * as blockEditor from "@wordpress/block-editor";
import * as editor from "@wordpress/editor";

import { Span } from "utils/Components";
import { addPrefix } from "utils/tools";

const { ColorPalette } = blockEditor || editor;

export const ShadowBorder: React.ComponentType<EditProps> = props => {
	const { setAttributes, values, settings } = props;
	const {
		border_width,
		border_color,
		border_color_opacity,
		shadow_width,
		shadow_color,
		shadow_color_opacity
	} = settings;

	return (
		<PanelBody
			title={__("Shadow and Border")}
			className={addPrefix("panel_body")}
			initialOpen={false}
		>
			{border_width &&
				!isUndefined(values.border_width) &&
				border_width.show_control && (
					<RangeControl
						label={__("Border width")}
						className={addPrefix(["border_width", "control", "control-range"])}
						value={values.border_width}
						step={border_width.step}
						min={border_width.min}
						max={border_width.max}
						onChange={(value: number) =>
							setAttributes({
								border_width: value
							})
						}
					/>
				)}
			{border_color && "border_color" in values && border_color.show_control && (
				<BaseControl
					id={addPrefix("border_color")}
					label={
						<Fragment>
							<Span>{__("Border color")}</Span>
							<ColorIndicator
								colorValue={values["border_color" as keyof typeof values]}
							/>
						</Fragment>
					}
					className={addPrefix([
						"border_color",
						"control",
						"control-colorpalette"
					])}
				>
					<ColorPalette
						colors={border_color.colors}
						// @ts-ignore. Value should accept string.
						value={values["border_color" as keyof typeof values]}
						// @ts-ignore. Value should be string.
						onChange={(value: string) =>
							setAttributes({
								border_color:
									isUndefined(value) &&
									settings.border_color &&
									settings.border_color.default !== ""
										? ""
										: value
							})
						}
					/>
				</BaseControl>
			)}

			{border_color_opacity &&
				!isUndefined(values.border_color_opacity) &&
				border_color_opacity.show_control && (
					<RangeControl
						label={__("Border color opacity")}
						className={addPrefix([
							"border_color_opacity",
							"control",
							"control-range"
						])}
						value={values.border_color_opacity}
						step={border_color_opacity.step}
						min={border_color_opacity.min}
						max={border_color_opacity.max}
						onChange={(value: number) =>
							setAttributes({
								border_color_opacity: value
							})
						}
					/>
				)}

			{shadow_width &&
				!isUndefined(values.shadow_width) &&
				shadow_width.show_control && (
					<RangeControl
						label={__("Shadow width")}
						className={addPrefix(["shadow_width", "control", "control-range"])}
						value={values.shadow_width}
						step={shadow_width.step}
						min={shadow_width.min}
						max={shadow_width.max}
						onChange={(value: number) =>
							setAttributes({
								shadow_width: value
							})
						}
					/>
				)}

			{shadow_color && "shadow_color" in values && shadow_color.show_control && (
				<BaseControl
					id={addPrefix("shadow_color")}
					label={
						<Fragment>
							<Span>{__("Shadow color")}</Span>
							<ColorIndicator
								colorValue={values["shadow_color" as keyof typeof values]}
							/>
						</Fragment>
					}
					className={addPrefix([
						"shadow_color",
						"control",
						"control-colorpalette"
					])}
				>
					<ColorPalette
						colors={shadow_color.colors}
						// @ts-ignore. Value should accept string.
						value={values["shadow_color" as keyof typeof values]}
						// @ts-ignore. Value should be string.
						onChange={(value: string) =>
							setAttributes({
								shadow_color:
									isUndefined(value) &&
									settings.shadow_color &&
									settings.shadow_color.default !== ""
										? ""
										: value
							})
						}
					/>
				</BaseControl>
			)}

			{shadow_color_opacity &&
				!isUndefined(values.shadow_color_opacity) &&
				shadow_color_opacity.show_control && (
					<RangeControl
						label={__("Shadow color opacity")}
						className={addPrefix([
							"shadow_color_opacity",
							"control",
							"control-range"
						])}
						value={values.shadow_color_opacity}
						step={shadow_color_opacity.step}
						min={shadow_color_opacity.min}
						max={shadow_color_opacity.max}
						onChange={(value: number) =>
							setAttributes({
								shadow_color_opacity: value
							})
						}
					/>
				)}
		</PanelBody>
	);
};
