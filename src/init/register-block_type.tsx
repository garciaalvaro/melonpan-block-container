import * as blockEditor from "@wordpress/block-editor";
import * as editor from "@wordpress/editor";
import { addFilter } from "@wordpress/hooks";

import { Icon } from "utils/Components";
import {
	plugin_namespace,
	block_title,
	block_category,
	block_name,
	block_description
} from "utils/data";

interface MelonpanBlockRaw extends BlockRaw {
	settings: Partial<Settings>;
}

const { InnerBlocks } = blockEditor || editor;

export const melonpan_block_container: MelonpanBlockRaw = {
	// InnerBlock will have ButtonBlockAppender in a future WP version.
	// @ts-ignore
	innerblocks_props: InnerBlocks.ButtonBlockAppender
		? {
				// InnerBlock will have ButtonBlockAppender in a future WP version.
				// @ts-ignore
				renderAppender: () => <InnerBlocks.ButtonBlockAppender />
		  }
		: {},
	blocktype_props: {
		name: block_name,
		title: block_title,
		icon: () => <Icon icon="logo" />,
		description: block_description,
		category: block_category
	},
	settings: {
		align: {
			default: "",
			options: ["left", "center", "right", "wide", "full"]
		},
		content_align: {
			show_control: true,
			default: "center"
		},
		content_maxwidth: {
			show_control: true,
			default: 800,
			min: 300,
			max: 1300
		},
		content_color: {
			show_control: true,
			default: "",
			colors: [
				{ name: "black", color: "#000000" },
				{ name: "white", color: "#ffffff" }
			]
		},
		background_color: {
			show_control: true,
			default: "",
			colors: [
				{ name: "banana", color: "#fce198" },
				{ name: "sandia", color: "#f68c78" },
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
		background_fixed: {
			show_control: true,
			default: false
		},
		background_color_opacity: {
			show_control: true,
			default: 50,
			min: 0,
			max: 100
		},
		border_color: {
			show_control: true,
			default: "",
			colors: [
				{ name: "black", color: "#000000" },
				{ name: "white", color: "#ffffff" }
			]
		},
		border_color_opacity: {
			show_control: true,
			default: 15,
			min: 0,
			max: 100
		},
		border_width: {
			show_control: true,
			default: 0
		},
		shadow_color: {
			show_control: true,
			default: "",
			colors: [
				{ name: "black", color: "#000000" },
				{ name: "white", color: "#ffffff" }
			]
		},
		shadow_color_opacity: {
			show_control: true,
			default: 15,
			min: 0,
			max: 100
		},
		shadow_width: {
			show_control: true,
			default: 0
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
		},
		padding_left: {
			show_control: true,
			default: 20,
			min: 0,
			max: 100
		},
		padding_right: {
			show_control: true,
			default: 20,
			min: 0,
			max: 100
		},
		padding_top_small_screen: {
			show_control: true,
			default: 20,
			min: 0,
			max: 200
		},
		padding_bottom_small_screen: {
			show_control: true,
			default: 20,
			min: 0,
			max: 200
		},
		padding_left_small_screen: {
			show_control: true,
			default: 20,
			min: 0,
			max: 100
		},
		padding_right_small_screen: {
			show_control: true,
			default: 20,
			min: 0,
			max: 100
		}
	}
};

// Block type registration.
addFilter(
	"melonpanBlockContainer.createBlock",
	`${plugin_namespace}/container`,
	(blocks: BlockRaw[]) => [...blocks, melonpan_block_container]
);
