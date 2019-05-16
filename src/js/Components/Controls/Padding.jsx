import l, { plugin_slug, showControl } from "utils";

const { __ } = wp.i18n;
const { Component } = wp.element;
const { RangeControl, PanelBody } = wp.components;

class Padding extends Component {
	render() {
		const { setAttributes, attributes, settings } = this.props;
		const paddings = [
			{
				name: "padding",
				label: __("Padding")
			},
			{
				name: "padding_top",
				label: __("Padding top")
			},
			{
				name: "padding_bottom",
				label: __("Padding bottom")
			},
			{
				name: "padding_left",
				label: __("Padding left")
			},
			{
				name: "padding_right",
				label: __("Padding right")
			},
			{
				name: "padding_topbottom",
				label: __("Padding top & bottom")
			},
			{
				name: "padding_leftright",
				label: __("Padding left & right")
			},
			{
				name: "padding_small_screen",
				label: __("Padding - Small screen")
			},
			{
				name: "padding_top_small_screen",
				label: __("Padding top - Small screen")
			},
			{
				name: "padding_bottom_small_screen",
				label: __("Padding bottom - Small screen")
			},
			{
				name: "padding_left_small_screen",
				label: __("Padding left - Small screen")
			},
			{
				name: "padding_right_small_screen",
				label: __("Padding right - Small screen")
			},
			{
				name: "padding_topbottom_small_screen",
				label: __("Padding top & bottom - Small screen")
			},
			{
				name: "padding_leftright_small_screen",
				label: __("Padding left & right - Small screen")
			}
		];

		return (
			<PanelBody
				title={__("Padding")}
				className={`${plugin_slug}-panel_body`}
				initialOpen={false}
			>
				{paddings.map(({ name, label }) => {
					const setting = settings[name];

					if (showControl(name, settings)) {
						return (
							<RangeControl
								key={name}
								label={label}
								className={[
									`${plugin_slug}-${name}`,
									`${plugin_slug}-control`,
									`${plugin_slug}-control-range`
								].join(" ")}
								value={attributes[name]}
								step={setting.step}
								min={setting.min}
								max={setting.max}
								onChange={value => setAttributes({ [name]: value })}
							/>
						);
					}

					return null;
				})}
			</PanelBody>
		);
	}
}

export default Padding;
