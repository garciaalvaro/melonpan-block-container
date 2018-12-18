import l, { plugin_slug } from "../../utils";

const { isUndefined } = lodash;
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RangeControl, PanelBody } = wp.components;

class Padding extends Component {
	render() {
		const { setAttributes, attributes, settings } = this.props;
		const { padding_top, padding_bottom, padding_leftright } = settings;

		return (
			<PanelBody
				title={__("Padding")}
				className={`${plugin_slug}-panel_body`}
			>
				{!isUndefined(padding_top) && (
					<RangeControl
						label={__("Padding top")}
						className={[
							`${plugin_slug}-padding_top`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_top}
						step={padding_top.step}
						min={padding_top.min}
						max={padding_top.max}
						onChange={value =>
							setAttributes({ padding_top: value })
						}
					/>
				)}

				{!isUndefined(padding_bottom) && (
					<RangeControl
						label={__("Padding bottom")}
						className={[
							`${plugin_slug}-padding_bottom`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_bottom}
						step={padding_bottom.step}
						min={padding_bottom.min}
						max={padding_bottom.max}
						onChange={value =>
							setAttributes({ padding_bottom: value })
						}
					/>
				)}

				{!isUndefined(padding_leftright) && (
					<RangeControl
						label={__("Padding left & right")}
						className={[
							`${plugin_slug}-padding_leftright`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_leftright}
						step={padding_leftright.step}
						min={padding_leftright.min}
						max={padding_leftright.max}
						onChange={value =>
							setAttributes({
								padding_leftright: value
							})
						}
					/>
				)}
			</PanelBody>
		);
	}
}

export default Padding;
