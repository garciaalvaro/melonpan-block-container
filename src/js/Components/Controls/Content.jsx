import l, { Span, addPrefix } from "utils";

const { compact } = lodash;
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { withState } = wp.compose;
const {
	RangeControl,
	BaseControl,
	Toolbar,
	PanelBody,
	ColorIndicator
} = wp.components;
const { ColorPalette } = wp.editor;

class Content extends Component {
	componentDidMount() {
		const { setAttributes, values, setState, settings } = this.props;
		const { content_align } = settings;
		const align_controls = content_align.options.map(control => {
			switch (control) {
				case "left":
					return {
						name: "left",
						title: "Left",
						icon: "align-left",
						isActive: values.content_align === "left",
						onClick: () => setAttributes({ content_align: "left" })
					};
					break;

				case "center":
					return {
						name: "center",
						title: "center",
						icon: "align-center",
						isActive: values.content_align === "center",
						onClick: () => setAttributes({ content_align: "center" })
					};
					break;

				case "right":
					return {
						name: "right",
						title: "right",
						icon: "align-right",
						isActive: values.content_align === "right",
						onClick: () => setAttributes({ content_align: "right" })
					};
					break;

				case "full":
					return {
						name: "full",
						title: "full",
						icon: "align-full-width",
						isActive: values.content_align === "full",
						onClick: () => setAttributes({ content_align: "full" })
					};
					break;

				default:
					return null;
					break;
			}
		});

		setState({ align_controls: compact(align_controls) });
	}

	render() {
		const { setAttributes, values, settings } = this.props;
		const { content_maxwidth, content_color, content_align } = settings;
		const align_controls = this.props.align_controls.map(control => ({
			...control,
			isActive: values.content_align === control.name
		}));

		return (
			<PanelBody
				title={__("Content")}
				className={addPrefix("panel_body")}
				initialOpen={false}
			>
				{content_align && content_align.show_control && (
					<BaseControl
						className={addPrefix([
							"content_align",
							"control",
							"control-toolbar",
							`selected-${values.content_align}`
						])}
						label={__("Align")}
						help={__(
							"Choose an option to align the content inside the container."
						)}
					>
						<Toolbar controls={align_controls} />
					</BaseControl>
				)}

				{content_maxwidth && content_maxwidth.show_control && (
					<RangeControl
						label={__("Max width")}
						className={addPrefix([
							"content_maxwidth",
							"control",
							"control-range"
						])}
						value={values.content_maxwidth}
						step={content_maxwidth.step}
						min={content_maxwidth.min}
						max={content_maxwidth.max}
						onChange={value => setAttributes({ content_maxwidth: value })}
					/>
				)}

				{content_color && content_color.show_control && (
					<BaseControl
						label={
							<Fragment>
								<Span>{__("Text color")}</Span>
								<ColorIndicator colorValue={values.content_color} />
							</Fragment>
						}
						className={addPrefix([
							"content_color",
							"control",
							"control-colorpalette"
						])}
					>
						<ColorPalette
							colors={content_color.colors}
							value={values.content_color}
							onChange={value =>
								setAttributes({
									content_color: value
								})
							}
						/>
					</BaseControl>
				)}
			</PanelBody>
		);
	}
}

export default withState({ align_controls: [] })(Content);
