import l, { plugin_namespace, icons } from "../utils";

const { __ } = wp.i18n;
const { addFilter } = wp.hooks;

// Example block registration using the hook.
addFilter(
	"melonpanBlockContainer.createBlock",
	`${plugin_namespace}/container`,
	blocks => {
		return blocks.concat({
			blocktype_props: {
				name: `${plugin_namespace}/container`,
				title: __("Melonpan Block - Container"),
				icon: icons.block,
				category: "common"
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
				background_color: {
					show_control: true,
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
					show_control: true,
					default: 50,
					min: 0,
					max: 100
				},
				content_maxwidth: {
					show_control: true,
					default: 800,
					min: 300,
					max: 1300
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
		});
	}
);
