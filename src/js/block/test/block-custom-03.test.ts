import { isValid } from "./block-utils";

describe("block: my-plugin/my-block", () => {
	const block_raw: BlockRaw & { deprecated: Object[] } = {
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
		settings: {
			custom: {
				prop_a: { default: "value_B" },
				// prop_b: { default: 2 },
				prop_c: { default: true }
			},
			content_maxwidth: {
				show_control: true,
				default: 800,
				min: 300,
				max: 1300
			}
		},
		deprecated: [
			{
				settings: {
					custom: {
						prop_a: { default: "value_A" },
						prop_b: { default: 2 },
						prop_c: { default: true }
					},
					content_maxwidth: {
						show_control: true,
						default: 800,
						min: 300,
						max: 1300
					}
				}
			}
		]
	};

	it("html from save() should be correct, custom block, deprecate custom attribute, modified custom attribute value", () => {
		const block_instance = `<!-- wp:my-plugin/my-block {"custom":{"prop_a":"text_B","prop_c":false,"prop_b":2}} -->
			<div class="wp-block-my-plugin-my-block"><div class="mbc-container mbc-prop_a-text_B mbc-prop_b-2 mbc-prop_c-disabled"><div class="mbc-content mbc-content_maxwidth-800"><!-- wp:quote -->
			<blockquote class="wp-block-quote"><p>sdf</p><cite>sdf</cite></blockquote>
			<!-- /wp:quote --></div></div></div>
			<!-- /wp:my-plugin/my-block -->`;
		let is_valid = isValid(block_raw, block_instance);

		expect(is_valid).toBe(false);

		if (!is_valid) {
			block_raw.deprecated.forEach((_, index) => {
				if (is_valid) {
					return;
				}

				is_valid = isValid(block_raw, block_instance, index);
			});
		}

		expect(is_valid).toBe(true);
	});

	it("html from save() should be correct, custom block, deprecate custom attribute, default custom attribute value", () => {
		const block_instance = `<!-- wp:my-plugin/my-block -->
			<div class="wp-block-my-plugin-my-block"><div class="mbc-container mbc-prop_a-value_A mbc-prop_b-2 mbc-prop_c-enabled"><div class="mbc-content mbc-content_maxwidth-800"><!-- wp:quote -->
			<blockquote class="wp-block-quote"><p>sdf</p><cite>sdf</cite></blockquote>
			<!-- /wp:quote --></div></div></div>
			<!-- /wp:my-plugin/my-block -->`;
		let is_valid = isValid(block_raw, block_instance);

		expect(is_valid).toBe(false);

		if (!is_valid) {
			block_raw.deprecated.forEach((_, index) => {
				if (is_valid) {
					return;
				}

				is_valid = isValid(block_raw, block_instance, index);
			});
		}

		expect(is_valid).toBe(true);
	});
});
