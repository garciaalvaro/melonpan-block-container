import l, { plugin_slug } from "../utils";
import registerBlock from "./registerBlock";
import prepareBlock from "./prepareBlock";

const { __ } = wp.i18n;
const { isObject, forEach, castArray } = lodash;
const { applyFilters, addFilter } = wp.hooks;

// Example block registration using the hook.
addFilter("mbc_create_block", "my-plugin/my-block", blocks => {
	return blocks.concat({
		// These are the default block registration properties. For more available properties:
		// https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
		blocktype_props: {
			name: "my-plugin/my-block",
			title: "My Block",
			icon: "carrot",
			category: "common"
		},
		// These properties will be passed to the InnerBlocks component. For more info:
		// https://github.com/WordPress/gutenberg/blob/master/packages/editor/src/components/inner-blocks/README.md
		innerblocks_props: {
			template: [["core/quote"], ["core/image"]],
			templateLock: false,
			allowedBlocks: ["core/quote", "core/image"]
		},
		// Use this property to add extra props to the container, content or background divs.
		extra_props: {
			container: {
				id: "my_id",
				className: "my_container_class another_class"
			},
			content: {},
			background: { className: "my_bg_class", style: { opacity: 0.5 } }
		},
		// This is the list of all the available properties and their default values.
		// Settings are opt-in so only the ones that are passed will be used.
		// If an empty object is passed (for example, background_color:{}) the default values will apply.
		settings: {
			align: {
				default: "",
				options: ["left", "center", "right", "wide", "full"]
			},
			content_align: {
				default: "center"
			},
			background_color: {
				default: "",
				colors: [
					{ name: "banana", color: "#FFDEAD" },
					{ name: "melon", color: "#aae6bd" },
					{ name: "melocoton", color: "#ffc5b4" },
					{ name: "pistacho", color: "#bdb76b" },
					{ name: "ciruela", color: "#bd8f8f" },
					{ name: "naranja", color: "#ff7f50" },
					{ name: "endrina", color: "#708090" },
					{ name: "black", color: "#000000" },
					{ name: "white", color: "#ffffff" }
				]
			},
			background_image: {},
			background_color_opacity: {
				default: 50,
				min: 0,
				max: 100
			},
			content_maxwidth: {
				default: 800,
				min: 300,
				max: 1300
			},
			border_color: {
				default: "",
				colors: [
					{ name: "black", color: "#000000" },
					{ name: "white", color: "#ffffff" }
				]
			},
			border_color_opacity: {
				default: 15,
				min: 0,
				max: 100
			},
			border_width: {
				default: 0
			},
			shadow_color: {
				default: "",
				colors: [
					{ name: "black", color: "#000000" },
					{ name: "white", color: "#ffffff" }
				]
			},
			shadow_color_opacity: {
				default: 15,
				min: 0,
				max: 100
			},
			shadow_width: {
				default: 0
			},
			// There are several sets of padding settings which can be combined.
			// For example padding_top, padding_bottom and padding_leftright.
			padding_top: {
				default: 20,
				min: 0,
				max: 200
			},
			padding_bottom: {
				default: 20,
				min: 0,
				max: 200
			},
			padding_left: {
				default: 20,
				min: 0,
				max: 100
			},
			padding_right: {
				default: 20,
				min: 0,
				max: 100
			},
			padding_topbottom: {
				default: 20,
				min: 0,
				max: 200
			},
			padding_leftright: {
				default: 20,
				min: 0,
				max: 100
			},
			// These paddings will apply to screens smaller than 600px in width.
			// They are meant to override the previous paddings (over this comment).
			padding_top_small_screen: {
				default: 20,
				min: 0,
				max: 200
			},
			padding_bottom_small_screen: {
				default: 20,
				min: 0,
				max: 200
			},
			padding_left_small_screen: {
				default: 20,
				min: 0,
				max: 100
			},
			padding_right_small_screen: {
				default: 20,
				min: 0,
				max: 100
			},
			padding_topbottom_small_screen: {
				default: 20,
				min: 0,
				max: 200
			},
			padding_leftright_small_screen: {
				default: 20,
				min: 0,
				max: 100
			}
		},
		// This property is experimental. If you need to migrate the block to a new version
		// because either the settings or the extra_props objects changed,
		// you need to pass the changed one/s inside an object.
		// Then wrap all the different versions inside an array.
		deprecated: [
			{
				// Old version of the block. Both extra_props and settings changed.
				extra_props: {
					// ...
				},
				settings: {
					// ...
				}
			},
			{
				// Another old version of the block. Only settings changed.
				settings: {
					// ...
				}
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

	if (block !== false) {
		registerBlock(block);
	}
});
