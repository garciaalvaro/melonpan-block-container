import l from "utils";
import melonpan_block_container from "../../core/register-block";
import registerBlock from "../registerBlock";

describe("registerBlock", () => {
	it("melonpan-block/container should register a valid block type", () => {
		expect(registerBlock(melonpan_block_container)).not.toBeUndefined();
	});

	it("custom block should register a valid block type", () => {
		const custom_block = {
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

		expect(registerBlock(custom_block)).not.toBeUndefined();
	});
});
