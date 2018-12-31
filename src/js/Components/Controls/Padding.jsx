import l, { plugin_slug } from "../../utils";

const { isUndefined } = lodash;
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RangeControl, PanelBody } = wp.components;

class Padding extends Component {
	render() {
		const { setAttributes, attributes, settings } = this.props;
		const {
			padding_top,
			padding_bottom,
			padding_left,
			padding_right,
			padding_topbottom,
			padding_leftright,
			padding_top_small_screen,
			padding_bottom_small_screen,
			padding_left_small_screen,
			padding_right_small_screen,
			padding_topbottom_small_screen,
			padding_leftright_small_screen
		} = settings;

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

				{!isUndefined(padding_left) && (
					<RangeControl
						label={__("Padding left")}
						className={[
							`${plugin_slug}-padding_left`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_left}
						step={padding_left.step}
						min={padding_left.min}
						max={padding_left.max}
						onChange={value =>
							setAttributes({ padding_left: value })
						}
					/>
				)}

				{!isUndefined(padding_right) && (
					<RangeControl
						label={__("Padding right")}
						className={[
							`${plugin_slug}-padding_right`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_right}
						step={padding_right.step}
						min={padding_right.min}
						max={padding_right.max}
						onChange={value =>
							setAttributes({ padding_right: value })
						}
					/>
				)}

				{!isUndefined(padding_topbottom) && (
					<RangeControl
						label={__("Padding top & bottom")}
						className={[
							`${plugin_slug}-padding_topbottom`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_topbottom}
						step={padding_topbottom.step}
						min={padding_topbottom.min}
						max={padding_topbottom.max}
						onChange={value =>
							setAttributes({
								padding_topbottom: value
							})
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

				{!isUndefined(padding_top_small_screen) && (
					<RangeControl
						label={__("Padding top - Small screens")}
						className={[
							`${plugin_slug}-padding_top_small_screen`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_top_small_screen}
						step={padding_top_small_screen.step}
						min={padding_top_small_screen.min}
						max={padding_top_small_screen.max}
						onChange={value =>
							setAttributes({ padding_top_small_screen: value })
						}
					/>
				)}

				{!isUndefined(padding_bottom_small_screen) && (
					<RangeControl
						label={__("Padding bottom - Small screens")}
						className={[
							`${plugin_slug}-padding_bottom_small_screen`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_bottom_small_screen}
						step={padding_bottom_small_screen.step}
						min={padding_bottom_small_screen.min}
						max={padding_bottom_small_screen.max}
						onChange={value =>
							setAttributes({
								padding_bottom_small_screen: value
							})
						}
					/>
				)}

				{!isUndefined(padding_left_small_screen) && (
					<RangeControl
						label={__("Padding left - Small screens")}
						className={[
							`${plugin_slug}-padding_left_small_screen`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_left_small_screen}
						step={padding_left_small_screen.step}
						min={padding_left_small_screen.min}
						max={padding_left_small_screen.max}
						onChange={value =>
							setAttributes({ padding_left_small_screen: value })
						}
					/>
				)}

				{!isUndefined(padding_right_small_screen) && (
					<RangeControl
						label={__("Padding right - Small screens")}
						className={[
							`${plugin_slug}-padding_right_small_screen`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_right_small_screen}
						step={padding_right_small_screen.step}
						min={padding_right_small_screen.min}
						max={padding_right_small_screen.max}
						onChange={value =>
							setAttributes({ padding_right_small_screen: value })
						}
					/>
				)}

				{!isUndefined(padding_topbottom_small_screen) && (
					<RangeControl
						label={__("Padding top & bottom - Small screens")}
						className={[
							`${plugin_slug}-padding_topbottom_small_screen`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_topbottom_small_screen}
						step={padding_topbottom_small_screen.step}
						min={padding_topbottom_small_screen.min}
						max={padding_topbottom_small_screen.max}
						onChange={value =>
							setAttributes({
								padding_topbottom_small_screen: value
							})
						}
					/>
				)}

				{!isUndefined(padding_leftright_small_screen) && (
					<RangeControl
						label={__("Padding left & right - Small screens")}
						className={[
							`${plugin_slug}-padding_leftright_small_screen`,
							`${plugin_slug}-control`,
							`${plugin_slug}-control-range`
						].join(" ")}
						value={attributes.padding_leftright_small_screen}
						step={padding_leftright_small_screen.step}
						min={padding_leftright_small_screen.min}
						max={padding_leftright_small_screen.max}
						onChange={value =>
							setAttributes({
								padding_leftright_small_screen: value
							})
						}
					/>
				)}
			</PanelBody>
		);
	}
}

export default Padding;
