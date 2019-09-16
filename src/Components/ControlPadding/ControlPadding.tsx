import { __ } from "@wordpress/i18n";
import { RangeControl, PanelBody } from "@wordpress/components";

import { addPrefix } from "utils/tools";

const paddings: { name: keyof Paddings; label: string }[] = [
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

export const Padding: React.ComponentType<EditProps> = props => {
	const { setAttributes, values, settings } = props;

	return (
		<PanelBody
			title={__("Padding")}
			className={addPrefix("panel_body")}
			initialOpen={false}
		>
			{paddings.map(({ name, label }) => {
				const setting = settings[name];

				if (!setting || !setting.show_control) {
					return null;
				}

				return (
					<RangeControl
						key={name}
						label={label}
						className={addPrefix([name, "control", "control-range"])}
						value={values[name as keyof typeof values]}
						step={setting.step}
						min={setting.min}
						max={setting.max}
						onChange={(value: number) => setAttributes({ [name]: value })}
					/>
				);
			})}
		</PanelBody>
	);
};
