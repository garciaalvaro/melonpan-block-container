import l, { Span, plugin_slug, showControl } from "../../utils";

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { ColorPalette } = wp.editor;
const { RangeControl, BaseControl, PanelBody, ColorIndicator } = wp.components;

class ShadowBorder extends Component {
	render() {
		const { setAttributes, attributes, settings: sett } = this.props;
		const {
			border_width,
			border_color,
			border_color_opacity,
			shadow_width,
			shadow_color,
			shadow_color_opacity
		} = sett;

		return (
			<PanelBody
				title={__("Shadow and Border")}
				className={`${plugin_slug}-panel_body`}
				initialOpen={false}
			>
				{showControl("border_width", sett) && (
					<RangeControl
						label={__("Border width")}
						className={[
							`${plugin_slug}-border_width`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.border_width}
						step={border_width.step}
						min={border_width.min}
						max={border_width.max}
						onChange={value => {
							setAttributes({
								border_width: value
							});
						}}
					/>
				)}

				{showControl("border_color", sett) && (
					<BaseControl
						label={
							<Fragment>
								<Span>{__("Border color")}</Span>
								<ColorIndicator
									colorValue={attributes.border_color}
								/>
							</Fragment>
						}
						className={[
							`${plugin_slug}-border_color`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-colorpalette`
						].join(" ")}
					>
						<ColorPalette
							colors={border_color.colors}
							value={attributes.border_color}
							onChange={value => {
								setAttributes({
									border_color: value
								});
							}}
						/>
					</BaseControl>
				)}

				{showControl("border_color_opacity", sett) && (
					<RangeControl
						label={__("Border color opacity")}
						className={[
							`${plugin_slug}-border_color_opacity`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.border_color_opacity}
						step={border_color_opacity.step}
						min={border_color_opacity.min}
						max={border_color_opacity.max}
						onChange={value => {
							setAttributes({
								border_color_opacity: value
							});
						}}
					/>
				)}

				{showControl("shadow_width", sett) && (
					<RangeControl
						label={__("Shadow width")}
						className={[
							`${plugin_slug}-shadow_width`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.shadow_width}
						step={shadow_width.step}
						min={shadow_width.min}
						max={shadow_width.max}
						onChange={value => {
							setAttributes({
								shadow_width: value
							});
						}}
					/>
				)}

				{showControl("shadow_color", sett) && (
					<BaseControl
						label={
							<Fragment>
								<Span>{__("Shadow color")}</Span>
								<ColorIndicator
									colorValue={attributes.shadow_color}
								/>
							</Fragment>
						}
						className={[
							`${plugin_slug}-shadow_color`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-colorpalette`
						].join(" ")}
					>
						<ColorPalette
							colors={shadow_color.colors}
							value={attributes.shadow_color}
							onChange={value => {
								setAttributes({
									shadow_color: value
								});
							}}
						/>
					</BaseControl>
				)}

				{showControl("shadow_color_opacity", sett) && (
					<RangeControl
						label={__("Shadow color opacity")}
						className={[
							`${plugin_slug}-shadow_color_opacity`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.shadow_color_opacity}
						step={shadow_color_opacity.step}
						min={shadow_color_opacity.min}
						max={shadow_color_opacity.max}
						onChange={value => {
							setAttributes({
								shadow_color_opacity: value
							});
						}}
					/>
				)}
			</PanelBody>
		);
	}
}

export default ShadowBorder;
