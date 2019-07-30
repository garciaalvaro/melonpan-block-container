import { prepareBlock } from "block/prepareBlock";
import { melonpan_block_container } from "init/register-block";
import { prepareAttributes } from "block/prepareAttributes";
import { prepareExtraProps } from "block/prepareExtraProps";
import { prepareSettings } from "block/prepareSettings";

describe("prepareBlock", () => {
	it("should return expected object from custom block, few props", () => {
		const custom_block = {
			blocktype_props: {
				name: `my-plugin/my-block`,
				title: "title",
				icon: "carrot",
				category: "common",
				extra: true
			},
			extra: true
		};

		const expected = {
			blocktype_props: {
				name: `my-plugin/my-block`,
				title: "title",
				icon: "carrot",
				category: "common",
				supports: {},
				deprecated: [],
				attributes: prepareAttributes({})
			},
			settings: {},
			extra_props: {},
			innerblocks_props: {}
		};

		expect(prepareBlock(custom_block)).toMatchObject(expected);
	});

	it("should return expected object from custom block, many props", () => {
		// Deprecated migrate and save functions are giving error
		// when testing them.
		const custom_block = {
			blocktype_props: {
				name: `my-plugin/my-block`,
				title: "title",
				icon: "carrot",
				category: "common",
				extra: true
			},
			extra: true,
			supports: { aaa: 111 },
			extra_props: {
				container: { id: "aaa", style: { opacity: 0.5 } },
				content: { className: "bbb" },
				extra: { id: "ccc" }
			},
			innerblocks_props: {
				template: [["core/quote"], ["core/image"]],
				templateLock: false,
				allowedBlocks: ["core/quote", "core/image"]
			},
			settings: {
				shadow_width: {
					show_control: false,
					default: 8,
					step: 123
				}
			}
		};
		const testing = prepareBlock(custom_block);

		const prepared_settings = prepareSettings(custom_block.settings);
		const prepared_extra_props = prepareExtraProps(custom_block.extra_props);
		const prepared_attributes = prepareAttributes(prepared_settings);

		const expected = {
			blocktype_props: {
				name: `my-plugin/my-block`,
				title: "title",
				icon: "carrot",
				category: "common",
				extra: true,
				deprecated: [],
				supports: { aaa: 111 },
				attributes: prepared_attributes
			},
			settings: prepared_settings,
			extra_props: prepared_extra_props,
			innerblocks_props: {
				template: [["core/quote"], ["core/image"]],
				templateLock: false,
				allowedBlocks: ["core/quote", "core/image"]
			}
		};

		expect(testing).toStrictEqual(expected);
	});

	it("should return expected object from melonpan-block/container", () => {
		const testing = prepareBlock(melonpan_block_container);

		// TODO: Test renderAppender.
		testing.innerblocks_props = {};

		const prepared_settings = prepareSettings(
			melonpan_block_container.settings
		);
		const prepared_extra_props = prepareExtraProps({});
		const prepared_attributes = prepareAttributes(prepared_settings);

		const expected = {
			blocktype_props: {
				name: `melonpan-block/container`,
				title: "Melonpan Block - Container",
				icon: melonpan_block_container.blocktype_props.icon,
				category: "melonpan",
				deprecated: [],
				supports: {},
				attributes: prepared_attributes
			},
			settings: prepared_settings,
			extra_props: prepared_extra_props,
			innerblocks_props: {}
		};

		expect(testing).toStrictEqual(expected);
	});
});
