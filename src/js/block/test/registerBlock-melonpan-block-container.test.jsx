import l, { plugin_namespace, plugin_title, icons, getValues } from "utils";
import { registerBlockType } from "@wordpress/blocks";
import { renderToString } from "@wordpress/element";
import { parse } from "@wordpress/block-serialization-default-parser";
import prepareBlock from "../prepareBlock";
import EditSave from "../../Components/EditSave/EditSave";

const { mapValues, compact } = lodash;

// If the current HTML from the block's save function does not fit
// the existing block HTML, then look for a deprecated save output that fits:
// [{extra_props, settings}] => [{attributes, migrate, save}]

describe("block: melonpan-block/container", () => {
	const test_save = (current, testing) => {
		const attributes = { ...testing.attributes, ...current.attributes };

		// l(renderToString(testing.save({ attributes })), current.html);
		return renderToString(testing.save({ attributes })) === current.html;
	};

	const isValid = (block_html, index) => {
		const block_raw = {
			blocktype_props: {
				name: `${plugin_namespace}/container${index}`,
				title: plugin_title,
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
		const {
			blocktype_props,
			settings,
			innerblocks_props,
			extra_props
		} = prepareBlock(block_raw);
		const block = registerBlockType(blocktype_props.name, {
			...blocktype_props,
			supports: {
				...blocktype_props.supports,
				align: settings.align ? settings.align.options : false
			},
			save: props => {
				const values = getValues(settings, props.attributes, false);
				const wrapper_class = compact([
					`wp-block-melonpan-block-container${index}`,
					props.attributes.align ? `align${props.attributes.align}` : null
				]).join(" ");

				return (
					<div className={wrapper_class}>
						<EditSave
							{...props}
							values={values}
							settings={settings}
							extra_props={extra_props}
							is_edit={false}
						/>
					</div>
				);
			}
		});
		const parsed = parse(block_html)[0];
		const current = {
			attributes: parsed.attrs,
			html: parsed.innerHTML.replace(/\n|\t/g, "")
		};

		// Root save
		const testing = {
			save: block.save,
			attributes: mapValues(block.attributes, att => att.default)
		};
		const is_valid = test_save(current, testing);

		return is_valid;
	};

	it("should return true, plain without modifying any attribute", () => {
		const index = 0;
		const block_html = `<!-- wp:melonpan-block/container${index} {"background_color":"#bdb76b"} -->
		<div class="wp-block-melonpan-block-container${index}"><div class="mbc-container mbc-padding_top-20 mbc-padding_bottom-20 mbc-padding_left-20 mbc-padding_right-20 mbc-padding_top_small_screen-20 mbc-padding_bottom_small_screen-20 mbc-padding_left_small_screen-20 mbc-padding_right_small_screen-20"><div class="mbc-background mbc-background_fixed-disabled mbc-shadow_width-0 mbc-border_width-0" style="background-color:rgba(189, 183, 107, 0.5)"></div><div class="mbc-content mbc-content_maxwidth-800 mbc-content_align-center"><!-- wp:paragraph -->
		<p>Paragraph</p>
		<!-- /wp:paragraph --></div></div></div>
		<!-- /wp:melonpan-block/container -->`;
		const is_valid = isValid(block_html, index);

		expect(is_valid).toBe(true);
	});

	it("should return true, modifying all attributes (except image)", () => {
		const index = 1;
		const block_html = `<!-- wp:melonpan-block/container${index} {"align":"right","content_align":"left","content_maxwidth":1120,"content_color":"#5e54d9","background_color":"#f68c78","background_color_opacity":74,"background_fixed":true,"padding_top":95,"padding_bottom":10,"padding_left":60,"padding_right":40,"padding_top_small_screen":55,"padding_bottom_small_screen":120,"padding_left_small_screen":10,"padding_right_small_screen":65,"border_color":"#ce3b3b","border_color_opacity":34,"border_width":3,"shadow_color":"#43ea81","shadow_color_opacity":34,"shadow_width":5} -->
		<div class="wp-block-melonpan-block-container${index} alignright"><div class="mbc-container mbc-padding_top-95 mbc-padding_bottom-10 mbc-padding_left-60 mbc-padding_right-40 mbc-padding_top_small_screen-55 mbc-padding_bottom_small_screen-120 mbc-padding_left_small_screen-10 mbc-padding_right_small_screen-65"><div class="mbc-background mbc-background_fixed-enabled mbc-shadow_width-5 mbc-border_width-3" style="color:rgba(67, 234, 129, 0.34);border-color:rgba(206, 59, 59, 0.34);background-color:rgba(246, 140, 120, 0.74)"></div><div class="mbc-content mbc-has-color mbc-content_maxwidth-1120 mbc-content_align-left" style="color:rgb(94, 84, 217)"><!-- wp:paragraph -->
		<p>Paragraph</p>
		<!-- /wp:paragraph --></div></div></div>
		<!-- /wp:melonpan-block/container -->`;
		const is_valid = isValid(block_html, index);

		expect(is_valid).toBe(true);
	});

	it("should return true, plain with columns", () => {
		const index = 2;
		const block_html = `<!-- wp:melonpan-block/container${index} {"background_color":"#bdb76b"} -->
		<div class="wp-block-melonpan-block-container${index}"><div class="mbc-container mbc-padding_top-20 mbc-padding_bottom-20 mbc-padding_left-20 mbc-padding_right-20 mbc-padding_top_small_screen-20 mbc-padding_bottom_small_screen-20 mbc-padding_left_small_screen-20 mbc-padding_right_small_screen-20"><div class="mbc-background mbc-background_fixed-disabled mbc-shadow_width-0 mbc-border_width-0" style="background-color:rgba(189, 183, 107, 0.5)"></div><div class="mbc-content mbc-content_maxwidth-800 mbc-content_align-center"><!-- wp:columns -->
		<div class="wp-block-columns has-2-columns"><!-- wp:column -->
		<div class="wp-block-column"><!-- wp:paragraph -->
		<p>paragraph</p>
		<!-- /wp:paragraph --></div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column"><!-- wp:quote -->
		<blockquote class="wp-block-quote"><p>quote</p><cite>citation</cite></blockquote>
		<!-- /wp:quote --></div>
		<!-- /wp:column --></div>
		<!-- /wp:columns --></div></div></div>
		<!-- /wp:melonpan-block/container -->`;
		const is_valid = isValid(block_html, index);

		expect(is_valid).toBe(true);
	});
});
