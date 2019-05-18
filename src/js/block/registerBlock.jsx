import l from "utils";
import prepareBlock from "./prepareBlock";
import EditSave from "../Components/EditSave/EditSave";

const { reduce } = lodash;
const { registerBlockType } = wp.blocks;
const getValues = (settings, attributes) =>
	reduce(
		settings,
		(acc, value, key) => {
			if (key === "background_image") {
				acc.background_image_url = attributes.background_image_url;
				acc.background_image_srcset = attributes.background_image_srcset;
				acc.background_image_alt = attributes.background_image_alt;
				acc.background_image_id = attributes.background_image_id;
			} else {
				acc[key] = attributes[key];
			}

			return acc;
		},
		{}
	);

// Register block function helper.
const registerBlock = block => {
	// Normalize the block.
	block = prepareBlock(block);

	if (!block) {
		return;
	}

	const { blocktype_props, settings, innerblocks_props, extra_props } = block;

	registerBlockType(blocktype_props.name, {
		...blocktype_props,
		supports: {
			...blocktype_props.supports,
			align: settings.align ? settings.align.options : false
		},
		edit: props => {
			const values = getValues(settings, props.attributes);

			return (
				<div className={props.className}>
					<EditSave
						{...props}
						innerblocks_props={innerblocks_props}
						values={values}
						settings={settings}
						extra_props={extra_props}
						is_edit={true}
					/>
				</div>
			);
		},
		save: props => {
			const values = getValues(settings, props.attributes);

			return (
				<div>
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
};

export default registerBlock;
