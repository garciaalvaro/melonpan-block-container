import l, { plugin_slug } from "../../utils";

const { isUndefined } = lodash;
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RangeControl, RadioControl, PanelBody } = wp.components;

class Content extends Component {
	render() {
		const { setAttributes, attributes, settings } = this.props;
		const { content_maxwidth, content_align } = settings;

		return (
			<PanelBody
				title={__("Content")}
				className={`${plugin_slug}-panel_body`}
			>
				{!isUndefined(content_align) && (
					<RadioControl
						className={[
							`${plugin_slug}-content_align`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-radio`,
							`${plugin_slug}-selected-${
								attributes.content_align
							}`
						].join(" ")}
						label={__("Align")}
						help={__(
							"Choose an option to align the content inside the container."
						)}
						selected={attributes.content_align}
						options={[
							{ value: "left", label: "Left" },
							{ value: "right", label: "Right" },
							{ value: "center", label: "Center" },
							{ value: "full", label: "Full" }
						]}
						onChange={value =>
							setAttributes({ content_align: value })
						}
					/>
				)}
				{!isUndefined(content_maxwidth) && (
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
