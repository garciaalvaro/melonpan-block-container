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

describe("block: custom/block", () => {
	const test_save = (current, testing) => {
		const attributes = { ...testing.attributes, ...current.attributes };

		// l(renderToString(testing.save({ attributes })), current.html);
		return renderToString(testing.save({ attributes })) === current.html;
	};

	const isValid = (block_html, index) => {
		const block_raw = {
			blocktype_props: {
				name: `custom/block${index}`,
				title: "title",
				icon: "carrot",
				category: "common"
			},
			settings: {
				padding_top: {
					show_control: true,
					default: 100,
					min: 50,
					max: 150
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
					`wp-block-custom-block${index}`,
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
		const block_html = `<!-- wp:custom/block${index} {"padding_top":0} -->
		<div class="wp-block-custom-block${index}"><div class="mbc-container mbc-padding_top-0"><div class="mbc-content"><!-- wp:paragraph -->
		<p>testo</p>
		<!-- /wp:paragraph --></div></div></div>
		<!-- /wp:custom/block -->`;
		const is_valid = isValid(block_html, index);

		expect(is_valid).toBe(true);
	});
});
