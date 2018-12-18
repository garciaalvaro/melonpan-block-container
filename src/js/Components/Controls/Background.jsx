import l, { plugin_slug, prepareSrcset } from "../../utils";

const { isUndefined } = lodash;
const { __ } = wp.i18n;
const { Component } = wp.element;
const { ColorPalette, MediaPlaceholder, MediaUpload } = wp.editor;
const { RangeControl, BaseControl, PanelBody } = wp.components;

class Background extends Component {
	onSelectHandler = image => {
		const { setAttributes } = this.props;
		const { id, sizes, alt } = image;
		const size =
			sizes.medium_large ||
			sizes.medium ||
			sizes.large ||
			sizes.thumbnail;

		setAttributes({
			background_image_id: id,
			background_image_url: size.url,
			background_image_srcset: prepareSrcset(sizes),
			background_image_alt: alt
		});
	};

	render() {
		const { setAttributes, attributes, settings } = this.props;
		const {
			background_color,
			background_color_opacity,
			background_image_id
		} = settings;

		return (
			<PanelBody
				title={__("Background")}
				className={`${plugin_slug}-panel_body`}
			>
				{!isUndefined(background_color) && (
					<BaseControl
						label={__("Background color")}
						className={[
							`${plugin_slug}-background_color`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-colorpalette`
						].join(" ")}
					>
						<ColorPalette
							colors={background_color.colors}
							value={attributes.background_color}
							onChange={value => {
								setAttributes({
									background_color: value
								});
							}}
						/>
					</BaseControl>
				)}

				{!isUndefined(background_color_opacity) && (
					<RangeControl
						label={__("Background color opacity")}
						className={[
							`${plugin_slug}-background_color_opacity`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.background_color_opacity}
						step={background_color_opacity.step}
						min={background_color_opacity.min}
						max={background_color_opacity.max}
						onChange={value => {
							setAttributes({
								background_color_opacity: value
							});
						}}
					/>
				)}

				{!isUndefined(background_image_id) && (
					<BaseControl
						label={__("Background image")}
						className={[
							`${plugin_slug}-background_image`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-media`
						].join(" ")}
					>
						{isUndefined(attributes.background_image_id) ? (
							<MediaPlaceholder
								icon="format-image"
								labels={{
									title: __("Media area")
								}}
								onSelect={this.onSelectHandler}
								allowedTypes={["image"]}
								value={attributes.background_image_id}
								multiple={false}
							/>
						) : (
							<MediaUpload
								onSelect={this.onSelectHandler}
								allowedTypes={["image"]}
								value={attributes.background_image_id}
								multiple={false}
								render={({ open }) => (
									<img
										onClick={open}
										className={`${plugin_slug}-control-image`}
										src={attributes.background_image_url}
										srcset={
											attributes.background_image_srcset
										}
										alt={attributes.background_image_alt}
									/>
								)}
							/>
						)}
					</BaseControl>
				)}
			</PanelBody>
		);
	}
}

export default Background;
