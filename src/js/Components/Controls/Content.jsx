import l, { plugin_slug, showControl } from "../../utils";

const { compact } = lodash;
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RangeControl, BaseControl, Toolbar, PanelBody } = wp.components;

class Content extends Component {
	getAlignControls = () => {
		const { setAttributes, attributes, settings } = this.props;
		const { content_align } = settings;

		let controls;
		controls = content_align.options.map(control => {
			switch (control) {
				case "left":
					return {
						name: "left",
						title: "Left",
						icon: "align-left",
						isActive: attributes.content_align === "left",
						onClick: value =>
							setAttributes({ content_align: "left" })
					};
					break;

				case "center":
					return {
						name: "center",
						title: "center",
						icon: "align-center",
						isActive: attributes.content_align === "center",
						onClick: value =>
							setAttributes({ content_align: "center" })
					};
					break;

				case "right":
					return {
						name: "right",
						title: "right",
						icon: "align-right",
						isActive: attributes.content_align === "right",
						onClick: value =>
							setAttributes({ content_align: "right" })
					};
					break;

				case "full":
					return {
						name: "full",
						title: "full",
						icon: "align-full-width",
						isActive: attributes.content_align === "full",
						onClick: value =>
							setAttributes({ content_align: "full" })
					};
					break;

				default:
					return null;
					break;
			}
		});
		controls = compact(controls);

		return controls;
	};

	render() {
		const { setAttributes, attributes, settings: sett } = this.props;
		const { content_maxwidth } = sett;

		return (
			<PanelBody
				title={__("Content")}
				className={`${plugin_slug}-panel_body`}
			>
				{showControl("content_align", sett) && (
					<BaseControl
						className={[
							`${plugin_slug}-content_align`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-toolbar`,
							`${plugin_slug}-selected-${
								attributes.content_align
							}`
						].join(" ")}
						label={__("Align")}
						help={__(
							"Choose an option to align the content inside the container."
						)}
					>
						<Toolbar controls={this.getAlignControls()} />
					</BaseControl>
				)}

				{showControl("content_maxwidth", sett) && (
					<RangeControl
						label={__("Max width")}
						className={[
							`${plugin_slug}-content_maxwidth`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.content_maxwidth}
						step={content_maxwidth.step}
						min={content_maxwidth.min}
						max={content_maxwidth.max}
						onChange={value =>
							setAttributes({ content_maxwidth: value })
						}
					/>
				)}
			</PanelBody>
		);
	}
}

export default Content;
