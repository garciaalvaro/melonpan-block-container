import l, { plugin_slug, icons } from "../utils";
import registerBlock from "./registerBlock";
import prepareBlock from "./prepareBlock";

const { __ } = wp.i18n;
const { isObject, forEach, castArray } = lodash;
const { applyFilters, addFilter } = wp.hooks;

// Example block registration using the hook.
addFilter(`${plugin_slug}_create_block`, "zzz", blocks => {
	return blocks.concat({
		blocktype_props: {
			name: "zzz/zzz",
			title: "zzz",
			icon: "carrot",
			category: "common",
			styles: [
				// Mark style as default.
				{
					name: "default",
					label: __("Rounded"),
					isDefault: true
				},
				{
					name: "outline",
					label: __("Outline")
				},
				{
					name: "squared",
					label: __("Squared")
				}
			]
		},
		settings: {
			align: {},
			content_align: {},
			background_color: {},
			background_color_opacity: {},
			padding_bottom: {},
			border_color: {},
			border_color_opacity: {},
			border_width: {},
			shadow_color: {},
			shadow_color_opacity: {},
			shadow_width: {},
			background_image: {},
			padding_top: {},
			padding_leftright: {}
		}
		// settings_old: [
		// 	{
		// 		border_color_opacity: {},
		// 		border_width: {},
		// 		shadow_color: {},
		// 		shadow_color_opacity: {},
		// 		shadow_width: {},
		// 		background_image: {},
		// 		padding_top: {},
		// 		padding_leftright: {}
		// 	}
		// ]
	});
});

let blocks;

blocks = applyFilters(`${plugin_slug}_create_block`, []);
blocks = castArray(blocks);

forEach(blocks, block => {
	if (!isObject(block)) {
		return;
	}

	block = prepareBlock(block);

	if (block !== false) {
		registerBlock(block);
	}
});

// align: {},
// content_align: {},
// background_color: {},
// background_color_opacity: {},
// padding_top: {},
// padding_bottom: {},
// padding_leftright: {},
// border_color: {},
// border_color_opacity: {},
// border_width: {},
// shadow_color: {},
// shadow_color_opacity: {},
// shadow_width: {}
