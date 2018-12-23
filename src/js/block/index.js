import l, { plugin_slug, icons } from "../utils";
import registerBlock from "./registerBlock";
import prepareBlock from "./prepareBlock";

const { isObject, forEach, castArray } = lodash;
const { applyFilters, addFilter } = wp.hooks;

// Example block registration using the hook.
addFilter(`${plugin_slug}_create_block`, "zzz", blocks => {
	return blocks.concat({
		name: "zzz/zzz",
		title: "zzz",
		icon: "carrot",
		category: "common",
		settings: {
			padding_top: {},
			// padding_bottom: {},
			padding_leftright: {}
			// background_color: {}
		},
		settings_old: [
			{
				padding_top: {},
				padding_bottom: {},
				padding_leftright: {}
				// background_color: {}
			},
			{
				padding_top: {},
				padding_bottom: {},
				padding_leftright: {},
				background_color: {}
			}
		]
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

	registerBlock(block);
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
