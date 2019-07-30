import { getValues } from "utils/tools/getValues";
import { prepareBlock } from "block/prepareBlock";
import { prepareExtraProps } from "block/prepareExtraProps";
import { EditSave } from "Components/EditSave/EditSave";

const { parse } = wp.blockSerializationDefaultParser;
const { renderToString } = wp.element;
const { mapValues, compact, get, cloneDeep, difference, keys } = lodash;

const getBlock = (block_raw: BlockRaw, index: number | null = null): Object => {
	let { blocktype_props, settings, extra_props } = prepareBlock(
		cloneDeep(block_raw)
	);
	let attributes = blocktype_props.attributes;

	if (index !== null) {
		extra_props = get(block_raw.deprecated, [index, "extra_props"])
			? prepareExtraProps(get(block_raw.deprecated, [index, "extra_props"]))
			: extra_props;
		settings = get(block_raw.deprecated, [index, "settings"]);
		attributes = get(blocktype_props.deprecated, [index, "attributes"]);
	}

	return {
		attributes,
		save: (props: BlockPropsSave) => {
			const { attributes } = props;

			if (index !== null) {
				const missing_keys = difference(
					keys(settings.custom),
					keys(attributes.custom)
				);

				if (missing_keys.length) {
					const custom_old: Object = {};

					missing_keys.forEach(missing_key => {
						custom_old[missing_key] = settings.custom[missing_key].default;
					});

					attributes.custom = {
						...attributes.custom,
						...custom_old
					};
				}
			}

			const values = getValues(settings, attributes, false);
			const wrapper_class = compact([
				`wp-block-${blocktype_props.name.replace("/", "-")}`,
				attributes.align ? `align${attributes.align}` : null
			]).join(" ");

			return (
				<div className={wrapper_class}>
					<EditSave
						{...props}
						values={values}
						settings={settings}
						extra_props={extra_props}
						is_edit={false}
						is_test={true}
					/>
				</div>
			);
		}
	};
};

export const isValid = (
	block_raw: BlockRaw,
	block_instance: string,
	index: number | null = null
): boolean => {
	const { save, attributes: attributes_definition } = getBlock(
		block_raw,
		index
	);

	const attributes_defaults = mapValues(
		attributes_definition,
		att => att.default
	);

	let { attrs: attributes_modified, innerHTML: instance_html } = parse(
		block_instance
	)[0];

	instance_html = instance_html.replace(/\n|\t/g, "");

	const attributes = { ...attributes_defaults, ...attributes_modified };

	const html_from_save_fn = renderToString(save({ attributes }));

	const is_valid = html_from_save_fn === instance_html;

	// l(html_from_save_fn, "\n\n", instance_html);

	return is_valid;
};
