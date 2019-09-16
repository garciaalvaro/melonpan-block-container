import { isValid } from "./block-utils";

describe("block: my-plugin/my-block", () => {
	const block_instance = `<!-- wp:my-plugin/my-block {"content_maxwidth":1130,"content_color":"#d23f3f","background_color":"#ff7f50","background_color_opacity":24,"padding":5,"padding_top":5,"padding_bottom":10,"padding_left":10,"padding_right":15,"padding_leftright":10,"padding_small_screen":15,"padding_top_small_screen":15,"padding_bottom_small_screen":10,"padding_left_small_screen":15,"padding_right_small_screen":5,"padding_topbottom_small_screen":5,"padding_leftright_small_screen":10,"border_color":"#000000","border_color_opacity":57,"border_width":1,"shadow_color":"#000000","shadow_color_opacity":52,"shadow_width":7} -->
	<div class="wp-block-my-plugin-my-block"><div id="my_id" class="mbc-container my_container_class another_class mbc-prop_a-value_A mbc-prop_b-2 mbc-prop_c-enabled mbc-padding-5 mbc-padding_top-5 mbc-padding_bottom-10 mbc-padding_left-10 mbc-padding_right-15 mbc-padding_topbottom-20 mbc-padding_leftright-10 mbc-padding_small_screen-15 mbc-padding_top_small_screen-15 mbc-padding_bottom_small_screen-10 mbc-padding_left_small_screen-15 mbc-padding_right_small_screen-5 mbc-padding_topbottom_small_screen-5 mbc-padding_leftright_small_screen-10"><div class="mbc-background my_bg_class mbc-background_fixed-disabled mbc-shadow_width-7 mbc-border_width-1" style="color:rgba(0, 0, 0, 0.52);border-color:rgba(0, 0, 0, 0.57);background-color:rgba(255, 127, 80, 0.24);opacity:0.5"></div><div class="mbc-content mbc-has-color mbc-content_maxwidth-1130 mbc-content_align-center" style="color:rgb(210, 63, 63)"><!-- wp:quote -->
	<blockquote class="wp-block-quote"><p>quote</p><cite>citation</cite></blockquote>
	<!-- /wp:quote --></div></div></div>
	<!-- /wp:my-plugin/my-block -->`;

	const block_raw: BlockRaw = {
		blocktype_props: {
			name: "my-plugin/my-block",
			title: "title",
			icon: "carrot",
			category: "common",
			description: "description"
		},
		extra_props: {
			container: {
				id: "my_id",
				className: "my_container_class another_class"
			},
			content: {},
			background: { className: "my_bg_class", style: { opacity: 0.5 } }
		},
		innerblocks_props: {
			template: [["core/quote"]],
			templateLock: false,
			allowedBlocks: ["core/quote"]
		},
		settings: {
			// Check the "How can I add a custom attribute?" section for more info.
			custom: {
				prop_a: { default: "value_A" },
				prop_b: { default: 2 },
				prop_c: { default: true }
			},
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
			// There are several sets of padding settings which can be combined.
			// For example: padding_top, padding_bottom and padding_leftright.
			padding: {
				show_control: true,
				default: 20,
				min: 0,
				max: 100
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
			padding_topbottom: {
				show_control: true,
				default: 20,
				min: 0,
				max: 200
			},
			padding_leftright: {
				show_control: true,
				default: 20,
				min: 0,
				max: 100
			},
			// These paddings will apply to screens smaller than 600px in width.
			// They are meant to override the previous paddings (over this comment).
			padding_small_screen: {
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
			},
			padding_topbottom_small_screen: {
				show_control: true,
				default: 20,
				min: 0,
				max: 200
			},
			padding_leftright_small_screen: {
				show_control: true,
				default: 20,
				min: 0,
				max: 100
			}
		}
	};

	it("html from save() should be correct, custom block, custom and default props", () => {
		const is_valid = isValid(block_raw, block_instance);

		expect(is_valid).toBe(true);
	});
});
