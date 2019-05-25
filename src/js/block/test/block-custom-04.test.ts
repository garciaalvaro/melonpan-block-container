import l from "utils";
import isValid from "./block-utils";

describe("block: my-plugin/my-block", () => {
	const block_props = {
		blocktype_props: {
			name: `my-plugin/my-block`,
			title: "title",
			icon: "carrot",
			category: "common"
		},
		innerblocks_props: {
			template: [["core/quote"]],
			templateLock: false,
			allowedBlocks: ["core/quote"]
		},
		settings: {}
	};

	it("html from save() should be correct, attribute align", () => {
		const block_instance = `<!-- wp:my-plugin/my-block -->
			<div class="wp-block-my-plugin-my-block alignfull"><div class="mbc-container"><div class="mbc-content"><!-- wp:quote -->
			<blockquote class="wp-block-quote"><p></p></blockquote>
			<!-- /wp:quote --></div></div></div>
			<!-- /wp:my-plugin/my-block -->`;
		block_props.settings = {
			align: {
				default: "full",
				options: ["left", "center", "full"]
			}
		};
		const is_valid = isValid(block_props, block_instance);

		expect(is_valid).toBe(true);
	});

	it("html from save() should be correct, attribute content_align", () => {
		const block_instance = `<!-- wp:my-plugin/my-block -->
		<div class="wp-block-my-plugin-my-block"><div class="mbc-container"><div class="mbc-content mbc-content_align-right"><!-- wp:quote -->
		<blockquote class="wp-block-quote"><p></p></blockquote>
		<!-- /wp:quote --></div></div></div>
		<!-- /wp:my-plugin/my-block -->`;
		block_props.settings = {
			content_align: {
				show_control: true,
				default: "right"
			}
		};
		const is_valid = isValid(block_props, block_instance);

		expect(is_valid).toBe(true);
	});

	it("html from save() should be correct, attribute content_maxwidth", () => {
		const block_instance = `<!-- wp:my-plugin/my-block -->
		<div class="wp-block-my-plugin-my-block"><div class="mbc-container"><div class="mbc-content mbc-content_maxwidth-555"><!-- wp:quote -->
		<blockquote class="wp-block-quote"><p></p></blockquote>
		<!-- /wp:quote --></div></div></div>
		<!-- /wp:my-plugin/my-block -->`;
		block_props.settings = {
			content_maxwidth: {
				show_control: true,
				default: 555,
				min: 100,
				max: 2300
			}
		};
		const is_valid = isValid(block_props, block_instance);

		expect(is_valid).toBe(true);
	});

	it("html from save() should be correct, attribute content_color", () => {
		const block_instance = `<!-- wp:my-plugin/my-block -->
		<div class="wp-block-my-plugin-my-block"><div class="mbc-container"><div class="mbc-content mbc-has-color" style="color:rgb(255, 0, 0)"><!-- wp:quote -->
		<blockquote class="wp-block-quote"><p></p></blockquote>
		<!-- /wp:quote --></div></div></div>
		<!-- /wp:my-plugin/my-block -->`;
		block_props.settings = {
			content_color: {
				show_control: true,
				default: "#f00",
				colors: [{ name: "aaa", color: "#222" }, { name: "bbb", color: "#ef9" }]
			}
		};
		const is_valid = isValid(block_props, block_instance);

		expect(is_valid).toBe(true);
	});

	it("html from save() should be correct, attribute background_color", () => {
		const block_instance = `<!-- wp:my-plugin/my-block -->
		<div class="wp-block-my-plugin-my-block"><div class="mbc-container"><div class="mbc-background" style="background-color:rgb(238, 255, 153)"></div><div class="mbc-content"><!-- wp:quote -->
		<blockquote class="wp-block-quote"><p></p></blockquote>
		<!-- /wp:quote --></div></div></div>
		<!-- /wp:my-plugin/my-block -->`;
		block_props.settings = {
			background_color: {
				show_control: true,
				default: "#ef9",
				colors: [
					{ name: "banana", color: "#fce198" },
					{ name: "white", color: "#ffffff" }
				]
			}
		};
		const is_valid = isValid(block_props, block_instance);

		expect(is_valid).toBe(true);
	});

	it("html from save() should be correct, attribute background_color_opacity", () => {
		const block_instance = `<!-- wp:my-plugin/my-block -->
		<div class="wp-block-my-plugin-my-block"><div class="mbc-container"><div class="mbc-background"></div><div class="mbc-content"><!-- wp:quote -->
		<blockquote class="wp-block-quote"><p></p></blockquote>
		<!-- /wp:quote --></div></div></div>
		<!-- /wp:my-plugin/my-block -->`;
		block_props.settings = {
			background_color_opacity: {
				show_control: true,
				default: 50,
				min: 0,
				max: 100
			}
		};
		const is_valid = isValid(block_props, block_instance);

		expect(is_valid).toBe(true);
	});

	it("html from save() should be correct, attribute border_color", () => {
		const block_instance = `<!-- wp:my-plugin/my-block -->
		<div class="wp-block-my-plugin-my-block"><div class="mbc-container"><div class="mbc-background" style="border-color:rgb(255, 0, 0)"></div><div class="mbc-content"><!-- wp:quote -->
		<blockquote class="wp-block-quote"><p></p></blockquote>
		<!-- /wp:quote --></div></div></div>
		<!-- /wp:my-plugin/my-block -->`;
		block_props.settings = {
			border_color: {
				show_control: true,
				default: "#f00",
				colors: [{ name: "black", color: "#000000" }]
			}
		};
		const is_valid = isValid(block_props, block_instance);

		expect(is_valid).toBe(true);
	});

	it("html from save() should be correct, attribute padding_top", () => {
		const block_instance = `<!-- wp:my-plugin/my-block -->
		<div class="wp-block-my-plugin-my-block"><div class="mbc-container mbc-padding_top-20 mbc-padding_bottom-20"><div class="mbc-content"><!-- wp:quote -->
		<blockquote class="wp-block-quote"><p></p></blockquote>
		<!-- /wp:quote --></div></div></div>
		<!-- /wp:my-plugin/my-block -->`;
		block_props.settings = {
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
		};
		const is_valid = isValid(block_props, block_instance);

		expect(is_valid).toBe(true);
	});
});
