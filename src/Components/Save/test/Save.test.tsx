import { mapValues, compact, defaults, map } from "lodash";
import { shallow } from "enzyme";

import { getValues } from "utils/tools";
import { Save } from "Components/Save/Save";
import { prepareBlock } from "block/prepareBlock";
import { melonpan_block_container } from "init/register-block_type";

// TODO

const getHTML = (modified_attributes?: Object) => {
	const {
		blocktype_props,
		settings,
		innerblocks_props,
		extra_props
	} = prepareBlock(melonpan_block_container);

	let { attributes } = blocktype_props;
	attributes = mapValues(attributes, att => att.default);
	attributes = defaults({}, modified_attributes, attributes);

	const props: SaveProps = {
		innerblocks_props,
		attributes,
		values: getValues(settings, attributes, false),
		settings,
		extra_props,
		is_edit: false,
		is_test: true
	};
	const wrapper_class = compact([
		`wp-block-${blocktype_props.name.replace("/", "-")}`,
		attributes.align ? `align${attributes.align}` : null
	]).join(" ");
	const Testing: React.ComponentType = () => (
		<div className={wrapper_class}>
			<Save {...props} />
		</div>
	);
	const attributes_in_html_comment = !modified_attributes
		? ""
		: `{${map(modified_attributes, (value, key) => {
				value = typeof value === "string" ? `"${value}"` : value;
				return `"${key}":${value}`;
		  })}} `;
	const html: string = `<!-- wp:melonpan-block/container ${attributes_in_html_comment}-->${shallow(
		<Testing />
	).html()}<!-- /wp:melonpan-block/container -->`;

	return html;
};

describe("Save", function() {
	it("plain melonpan-block/container, no innerBlocks", function() {
		const block_instance = `<!-- wp:melonpan-block/container --><div class="wp-block-melonpan-block-container"><div class="mbc-container mbc-padding_top-20 mbc-padding_bottom-20 mbc-padding_left-20 mbc-padding_right-20 mbc-padding_top_small_screen-20 mbc-padding_bottom_small_screen-20 mbc-padding_left_small_screen-20 mbc-padding_right_small_screen-20"><div class="mbc-background mbc-background_fixed-disabled mbc-shadow_width-0 mbc-border_width-0"></div><div class="mbc-content mbc-content_maxwidth-800 mbc-content_align-center"></div></div></div><!-- /wp:melonpan-block/container -->`;

		expect(getHTML()).toBe(block_instance);
	});

	it("modified melonpan-block/container, no innerBlocks", function() {
		const block_instance = `<!-- wp:melonpan-block/container {"background_color":"#f68c78"} --><div class="wp-block-melonpan-block-container"><div class="mbc-container mbc-padding_top-20 mbc-padding_bottom-20 mbc-padding_left-20 mbc-padding_right-20 mbc-padding_top_small_screen-20 mbc-padding_bottom_small_screen-20 mbc-padding_left_small_screen-20 mbc-padding_right_small_screen-20"><div class="mbc-background mbc-background_fixed-disabled mbc-shadow_width-0 mbc-border_width-0" style="background-color:rgba(246, 140, 120, 0.5)"></div><div class="mbc-content mbc-content_maxwidth-800 mbc-content_align-center"></div></div></div><!-- /wp:melonpan-block/container -->`;
		const modified_attributes = { background_color: "#f68c78" };

		expect(getHTML(modified_attributes)).toBe(block_instance);
	});

	it("modified melonpan-block/container, no innerBlocks", function() {
		const block_instance = `<!-- wp:melonpan-block/container {"content_align":"right","content_maxwidth":980,"content_color":"#000000","background_color":"#f68c78","background_color_opacity":22,"background_fixed":true,"padding_top":115,"padding_left":35,"padding_bottom_small_screen":95,"padding_right_small_screen":35,"border_color":"#a75959","border_color_opacity":40,"border_width":3,"shadow_color_opacity":39,"shadow_width":4} --><div class="wp-block-melonpan-block-container"><div class="mbc-container mbc-padding_top-115 mbc-padding_bottom-20 mbc-padding_left-35 mbc-padding_right-20 mbc-padding_top_small_screen-20 mbc-padding_bottom_small_screen-95 mbc-padding_left_small_screen-20 mbc-padding_right_small_screen-35"><div class="mbc-background mbc-background_fixed-enabled mbc-shadow_width-4 mbc-border_width-3" style="border-color:rgba(167, 89, 89, 0.4);background-color:rgba(246, 140, 120, 0.22)"></div><div class="mbc-content mbc-has-color mbc-content_maxwidth-980 mbc-content_align-right" style="color:rgb(0, 0, 0)"></div></div></div><!-- /wp:melonpan-block/container -->`;
		const modified_attributes = {
			content_align: "right",
			content_maxwidth: 980,
			content_color: "#000000",
			background_color: "#f68c78",
			background_color_opacity: 22,
			background_fixed: true,
			padding_top: 115,
			padding_left: 35,
			padding_bottom_small_screen: 95,
			padding_right_small_screen: 35,
			border_color: "#a75959",
			border_color_opacity: 40,
			border_width: 3,
			shadow_color_opacity: 39,
			shadow_width: 4
		};

		expect(getHTML(modified_attributes)).toBe(block_instance);
	});

	it("modified melonpan-block/container, no innerBlocks", function() {
		const block_instance = `<!-- wp:melonpan-block/container {"align":"full","content_align":"full","background_color":"#fce198","padding_top":100,"border_color":"#ffffff","shadow_color":"#000000"} --><div class="wp-block-melonpan-block-container alignfull"><div class="mbc-container mbc-padding_top-100 mbc-padding_bottom-20 mbc-padding_left-20 mbc-padding_right-20 mbc-padding_top_small_screen-20 mbc-padding_bottom_small_screen-20 mbc-padding_left_small_screen-20 mbc-padding_right_small_screen-20"><div class="mbc-background mbc-background_fixed-disabled mbc-shadow_width-0 mbc-border_width-0" style="color:rgba(0, 0, 0, 0.15);border-color:rgba(255, 255, 255, 0.15);background-color:rgba(252, 225, 152, 0.5)"></div><div class="mbc-content mbc-content_maxwidth-800 mbc-content_align-full"></div></div></div><!-- /wp:melonpan-block/container -->`;
		const modified_attributes = {
			align: "full",
			content_align: "full",
			background_color: "#fce198",
			padding_top: 100,
			border_color: "#ffffff",
			shadow_color: "#000000"
		};

		expect(getHTML(modified_attributes)).toBe(block_instance);
	});
});
