import l, { plugin_namespace, plugin_title, icons } from "utils";
import isValid from "./registerBlock-utils";

describe("block: my-plugin/my-block", () => {
	const block_props = {
		blocktype_props: {
			name: `${plugin_namespace}/container`,
			title: plugin_title,
			icon: icons.block,
			category: "melonpan"
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

	// it("should return true, plain without modifying any attribute", () => {
	// 	const block_instance = `<!-- wp:melonpan-block/container -->
	// 		<div class="wp-block-melonpan-block-container"><div class="mbc-container mbc-padding_top-20 mbc-padding_bottom-20 mbc-padding_left-20 mbc-padding_right-20 mbc-padding_top_small_screen-20 mbc-padding_bottom_small_screen-20 mbc-padding_left_small_screen-20 mbc-padding_right_small_screen-20"><div class="mbc-background mbc-background_fixed-disabled mbc-shadow_width-0 mbc-border_width-0"></div><div class="mbc-content mbc-content_maxwidth-800 mbc-content_align-center"><!-- wp:paragraph -->
	// 		<p></p>
	// 		<!-- /wp:paragraph --></div></div></div>
	// 		<!-- /wp:melonpan-block/container -->`;
	// 	const is_valid = isValid(block_props, block_instance);

	// 	expect(is_valid).toBe(true);
	// });

	// it("should return true, modified all attributes (except image)", () => {
	// 	const block_instance = `<!-- wp:melonpan-block/container {"content_align":"left","content_maxwidth":1080,"content_color":"#cb3939","background_color":"#708090","background_color_opacity":23,"background_fixed":true,"padding_top":95,"padding_bottom":5,"padding_left":60,"padding_right":5,"padding_top_small_screen":100,"padding_bottom_small_screen":40,"padding_left_small_screen":55,"padding_right_small_screen":10,"border_color":"#a73434","border_color_opacity":65,"border_width":4,"shadow_color":"#000000","shadow_color_opacity":51,"shadow_width":3} -->
	// 		<div class="wp-block-melonpan-block-container"><div class="mbc-container mbc-padding_top-95 mbc-padding_bottom-5 mbc-padding_left-60 mbc-padding_right-5 mbc-padding_top_small_screen-100 mbc-padding_bottom_small_screen-40 mbc-padding_left_small_screen-55 mbc-padding_right_small_screen-10"><div class="mbc-background mbc-background_fixed-enabled mbc-shadow_width-3 mbc-border_width-4" style="color:rgba(0, 0, 0, 0.51);border-color:rgba(167, 52, 52, 0.65);background-color:rgba(112, 128, 144, 0.23)"></div><div class="mbc-content mbc-has-color mbc-content_maxwidth-1080 mbc-content_align-left" style="color:rgb(203, 57, 57)"><!-- wp:paragraph -->
	// 		<p></p>
	// 		<!-- /wp:paragraph --></div></div></div>
	// 		<!-- /wp:melonpan-block/container -->`;
	// 	const is_valid = isValid(block_props, block_instance);

	// 	expect(is_valid).toBe(true);
	// });

	it("should return true, modified some attributes, added columns", () => {
		const block_instance = `<!-- wp:melonpan-block/container {"content_align":"full","content_color":"#81b375","padding_bottom":145,"padding_top_small_screen":105,"shadow_color":"#cf4242","shadow_color_opacity":80,"shadow_width":5} -->
			<div class="wp-block-melonpan-block-container"><div class="mbc-container mbc-padding_top-20 mbc-padding_bottom-145 mbc-padding_left-20 mbc-padding_right-20 mbc-padding_top_small_screen-105 mbc-padding_bottom_small_screen-20 mbc-padding_left_small_screen-20 mbc-padding_right_small_screen-20"><div class="mbc-background mbc-background_fixed-disabled mbc-shadow_width-5 mbc-border_width-0" style="color:rgba(207, 66, 66, 0.8)"></div><div class="mbc-content mbc-has-color mbc-content_maxwidth-800 mbc-content_align-full" style="color:rgb(129, 179, 117)"><!-- wp:columns -->
			<div class="wp-block-columns has-2-columns"><!-- wp:column -->
			<div class="wp-block-column"><!-- wp:paragraph -->
			<p>col1</p>
			<!-- /wp:paragraph --></div>
			<!-- /wp:column -->

			<!-- wp:column -->
			<div class="wp-block-column"><!-- wp:heading -->
			<h2>col2</h2>
			<!-- /wp:heading --></div>
			<!-- /wp:column --></div>
			<!-- /wp:columns --></div></div></div>
			<!-- /wp:melonpan-block/container -->`;
		const is_valid = isValid(block_props, block_instance);

		expect(is_valid).toBe(true);
	});
});
