import { Div, Span, Icon } from "utils/components";
import { addPrefix } from "utils/tools/addPrefix";
import { getSrcset } from "utils/tools/getSrcset";

const { isUndefined } = lodash;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const editor = wp.blockEditor ? wp.blockEditor : wp.editor;
const { ColorPalette, MediaUpload } = editor;
const {
	RangeControl,
	BaseControl,
	PanelBody,
	ToggleControl,
	ColorIndicator,
	Button
} = wp.components;

export const Background: React.ComponentType<BlockPropsEdit> = props => {
	const { setAttributes, values, settings } = props;
	const addImage = (image: ImageRaw) => {
		const { id, sizes, alt } = image;
		const size =
			sizes.medium_large ||
			sizes.large ||
			sizes.medium ||
			sizes.thumbnail ||
			sizes.full;

		setAttributes({
			background_image_id: id,
			background_image_url: size.url,
			background_image_srcset: getSrcset(sizes),
			background_image_alt: alt
		});
	};
	const removeImage = () =>
		setAttributes({
			background_image_id: undefined,
			background_image_url: undefined,
			background_image_srcset: undefined,
			background_image_alt: undefined
		});

	const {
		background_fixed,
		background_color,
		background_color_opacity,
		background_image
	} = settings;

	return (
		<PanelBody
			title={__("Background")}
			className={addPrefix("panel_body")}
			initialOpen={false}
		>
			{background_color &&
				"background_color" in values &&
				background_color.show_control && (
					<BaseControl
						id={addPrefix("background_color")}
						label={
							<Fragment>
								<Span>{__("Background color")}</Span>
								<ColorIndicator
									colorValue={values["background_color" as keyof typeof values]}
								/>
							</Fragment>
						}
						className={addPrefix([
							"background_color",
							"control",
							"control-colorpalette"
						])}
					>
						<ColorPalette
							colors={background_color.colors}
							// @ts-ignore. Value should accept string.
							value={values["background_color" as keyof typeof values]}
							// @ts-ignore. Value should be string.
							onChange={(value: string) =>
								setAttributes({
									background_color:
										isUndefined(value) &&
										settings.background_color &&
										settings.background_color.default !== ""
											? ""
											: value
								})
							}
						/>
					</BaseControl>
				)}

			{background_color_opacity &&
				!isUndefined(values.background_color_opacity) &&
				background_color_opacity.show_control && (
					<RangeControl
						label={__("Background color opacity")}
						className={addPrefix([
							"background_color_opacity",
							"control",
							"control-range"
						])}
						value={values.background_color_opacity}
						step={background_color_opacity.step}
						min={background_color_opacity.min}
						max={background_color_opacity.max}
						onChange={(value: number) =>
							setAttributes({
								background_color_opacity: value
							})
						}
					/>
				)}

			{background_fixed && background_fixed.show_control && (
				<BaseControl
					id={addPrefix("background_fixed")}
					label={__("Background image fixed")}
					className={addPrefix([
						"background_fixed",
						"control",
						"control-toogle"
					])}
				>
					<ToggleControl
						label={values.background_fixed ? __("Fixed") : __("Not fixed")}
						checked={values.background_fixed}
						onChange={(value: boolean) =>
							setAttributes({
								background_fixed: value
							})
						}
					/>
				</BaseControl>
			)}

			{!isUndefined(background_image) && (
				<BaseControl
					id={addPrefix("background_image")}
					label={__("Background image")}
					className={addPrefix([
						"background_image",
						"control",
						"control-media"
					])}
				>
					<Div classes="background_image-buttons">
						{values.background_image_id ? (
							<Fragment>
								<MediaUpload
									onSelect={addImage}
									allowedTypes={["image"]}
									value={values.background_image_id}
									multiple={false}
									render={(props: Object) => {
										const { open } = props;

										return (
											<Button onClick={open} isDefault>
												<Icon icon="edit" />
												{__("Change")}
											</Button>
										);
									}}
								/>
								<Button onClick={removeImage} isDefault>
									<Icon icon="remove" />
									{__("Remove")}
								</Button>
							</Fragment>
						) : (
							<MediaUpload
								onSelect={addImage}
								allowedTypes={["image"]}
								value={values.background_image_id}
								multiple={false}
								render={(props: Object) => {
									const { open } = props;

									return (
										<Button onClick={open} isDefault>
											{__("Open Media Library")}
										</Button>
									);
								}}
							/>
						)}
					</Div>
				</BaseControl>
			)}
		</PanelBody>
	);
};
