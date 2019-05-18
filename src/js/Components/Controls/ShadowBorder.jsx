import l, { Span, addPrefix } from "utils";

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { ColorPalette } = wp.editor;
const { RangeControl, BaseControl, PanelBody, ColorIndicator } = wp.components;

const ShadowBorder = props => {
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
			{border_width && border_width.show_control && (
				<RangeControl
					label={__("Border width")}
					className={addPrefix(["border_width", "control", "control-range"])}
					value={values.border_width}
					step={border_width.step}
					min={border_width.min}
					max={border_width.max}
					onChange={value =>
						setAttributes({
							border_width: value
						})
					}
				/>
			)}
			{border_color && border_color.show_control && (
				<BaseControl
					label={
						<Fragment>
							<Span>{__("Border color")}</Span>
							<ColorIndicator colorValue={values.border_color} />
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
						value={values.border_color}
						onChange={value =>
							setAttributes({
								border_color: value
							})
						}
					/>
				</BaseControl>
			)}

			{border_color_opacity && border_color_opacity.show_control && (
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
					onChange={value =>
						setAttributes({
							border_color_opacity: value
						})
					}
				/>
			)}

			{shadow_width && shadow_width.show_control && (
				<RangeControl
					label={__("Shadow width")}
					className={addPrefix(["shadow_width", "control", "control-range"])}
					value={values.shadow_width}
					step={shadow_width.step}
					min={shadow_width.min}
					max={shadow_width.max}
					onChange={value =>
						setAttributes({
							shadow_width: value
						})
					}
				/>
			)}

			{shadow_color && shadow_color.show_control && (
				<BaseControl
					label={
						<Fragment>
							<Span>{__("Shadow color")}</Span>
							<ColorIndicator colorValue={values.shadow_color} />
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
						value={values.shadow_color}
						onChange={value =>
							setAttributes({
								shadow_color: value
							})
						}
					/>
				</BaseControl>
			)}

			{shadow_color_opacity && shadow_color_opacity.show_control && (
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
					onChange={value =>
						setAttributes({
							shadow_color_opacity: value
						})
					}
				/>
			)}
		</PanelBody>
	);
};

export default ShadowBorder;
