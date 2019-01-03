import l, { Div, plugin_slug, plugin_namespace, icons } from "../utils";

const { compact } = lodash;
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl, CheckboxControl } = wp.components;

// Example block registration using the hook.
addFilter(
	"melonpanBlockContainer.createBlock",
	`${plugin_namespace}/container`,
	blocks => {
		return blocks.concat({
			blocktype_props: {
				name: `${plugin_namespace}/qqq`,
				title: __("Melonpan Block - qqq"),
				icon: icons.block,
				category: "melonpan"
			},
			settings: {
				extra: {
					aaa: { default: "111" },
					bbb: { default: "222" },
					ccc: { default: true }
				},
				padding_top: {
					show_control: true,
					default: 20,
					min: 0,
					max: 200
				},
				padding_bottom: {
					show_control: true,
					default: 20,
					min: 0,
					max: 200
				}
			},
			deprecated: [
				{
					settings: {
						extra: {
							aaa: { default: "111" },
							bbb: { default: "222" },
							ccc: { default: false }
						},
						padding_top: {
							show_control: true,
							default: 20,
							min: 0,
							max: 200
						},
						padding_bottom: {
							show_control: true,
							default: 20,
							min: 0,
							max: 200
						}
					}
				}
			]
		});
	}
);

const withLayoutControl = createHigherOrderComponent(BlockEdit => {
	return props => {
		if (props.name !== `${plugin_namespace}/qqq`) {
			return <BlockEdit {...props} />;
		}

		const { setAttributes, attributes } = props;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__("Layout")}
						className={[
							`${plugin_slug}-panelbody`,
							`${plugin_slug}-panelbody-layout`,
							"mbc-panel_body"
						].join(" ")}
					>
						<TextControl
							label={"aaa"}
							value={attributes.extra.aaa}
							onChange={value =>
								setAttributes({
									extra: { ...attributes.extra, aaa: value }
								})
							}
						/>
						<TextControl
							label={"bbb"}
							value={attributes.extra.bbb}
							onChange={value =>
								setAttributes({
									extra: { ...attributes.extra, bbb: value }
								})
							}
						/>
						<CheckboxControl
							label={"ccc"}
							checked={attributes.extra.ccc}
							onChange={value =>
								setAttributes({
									extra: { ...attributes.extra, ccc: value }
								})
							}
						/>
					</PanelBody>
				</InspectorControls>
				<BlockEdit {...props} />
			</Fragment>
		);
	};
}, "withLayoutControl");

addFilter(
	"editor.BlockEdit",
	`${plugin_slug}/withLayoutControl`,
	withLayoutControl
);
