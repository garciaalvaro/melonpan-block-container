import l, {
	Div,
	Span,
	plugin_slug,
	prepareSrcset,
	showControl,
	icons
} from "../../utils";

const { isUndefined } = lodash;
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { ColorPalette, MediaUpload } = wp.editor;
const {
	RangeControl,
	BaseControl,
	PanelBody,
	ToggleControl,
	ColorIndicator,
	Button,
	Icon
} = wp.components;

class Background extends Component {
	addImage = image => {
		const { setAttributes } = this.props;
		const { id, sizes, alt } = image;

		const size =
			sizes.medium_large ||
			sizes.large ||
			sizes.medium ||
			sizes.thumbnail;

		setAttributes({
			background_image_id: id,
			background_image_url: size.url,
			background_image_srcset: prepareSrcset(sizes),
			background_image_alt: alt
		});
	};

	removeImage = () => {
		const { setAttributes } = this.props;

		setAttributes({
			background_image_id: undefined,
			background_image_url: undefined,
			background_image_srcset: undefined,
			background_image_alt: undefined
		});
	};

	render() {
		const { setAttributes, attributes, settings: sett } = this.props;
		const {
			background_color,
			background_color_opacity,
			background_image
		} = sett;

		return (
			<PanelBody
				title={__("Background")}
				className={`${plugin_slug}-panel_body`}
				initialOpen={false}
			>
				{showControl("background_color", sett) && (
					<BaseControl
						label={
							<Fragment>
								<Span>{__("Background color")}</Span>
								<ColorIndicator
									colorValue={attributes.background_color}
								/>
							</Fragment>
						}
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

				{showControl("background_color_opacity", sett) && (
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

				{showControl("background_fixed", sett) && (
					<BaseControl
						label={__("Background image fixed")}
						className={[
							`${plugin_slug}-background_fixed`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-toogle`
						].join(" ")}
					>
						<ToggleControl
							label={
								attributes.background_fixed
									? __("Fixed")
									: __("Not fixed")
							}
							checked={attributes.background_fixed}
							onChange={value =>
								setAttributes({
									background_fixed: value
								})
							}
						/>
					</BaseControl>
				)}

				{!isUndefined(background_image) && (
					<BaseControl
						label={__("Background image")}
						className={[
							`${plugin_slug}-background_image`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-media`
						].join(" ")}
					>
						<Div
							className={`${plugin_slug}-background_image-buttons`}
						>
							{isUndefined(attributes.background_image_id) ? (
								<MediaUpload
									onSelect={this.addImage}
									allowedTypes={["image"]}
									value={attributes.background_image_id}
									multiple={false}
									render={({ open }) => (
										<Button onClick={open} isDefault>
											{__("Open Media Library")}
										</Button>
									)}
								/>
							) : (
								<Fragment>
									<MediaUpload
										onSelect={this.addImage}
										allowedTypes={["image"]}
										value={attributes.background_image_id}
										multiple={false}
										render={({ open }) => (
											<Button onClick={open} isDefault>
												<Icon icon={icons.edit} />
												{__("Change")}
											</Button>
										)}
									/>
									<Button
										onClick={this.removeImage}
										isDefault
									>
										<Icon icon={icons.remove} />
										{__("Remove")}
									</Button>
								</Fragment>
							)}
						</Div>
					</BaseControl>
				)}
			</PanelBody>
		);
	}
}

export default Background;
