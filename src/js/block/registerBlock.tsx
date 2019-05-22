import l from "utils";
import prepareBlock from "./prepareBlock";
import EditSave from "../Components/EditSave/EditSave";

interface Object {
	[key: string]: any;
}
interface Block extends Object {
	blocktype_props: {
		name: string;
		title: string;
		icon: string | JSX.Element;
		category: string;
		supports: Object;
	};
	settings: Object;
	deprecated?: Object[];
	innerblocks_props?: Object;
	extra_props?: Object;
}

const { reduce, mapValues, isUndefined, pickBy } = lodash;
const { registerBlockType } = wp.blocks;
const getValues = (settings: Object, attributes: Object, is_edit: boolean) =>
	reduce(
		settings,
		(acc: Object, value, key) => {
			if (key === "background_image") {
				acc.background_image_url = attributes.background_image_url;
				acc.background_image_srcset = attributes.background_image_srcset;
				acc.background_image_alt = attributes.background_image_alt;
				acc.background_image_id = attributes.background_image_id;
			} else if (key === "custom") {
				if (attributes.custom) {
					let custom;
					custom = mapValues(
						settings.custom,
						(value: { default: any }, key: string): any =>
							!isUndefined(attributes.custom[key]) &&
							attributes.custom[key] !== ""
								? attributes.custom[key]
								: is_edit
								? settings.custom[key].default
								: null
					);
					custom = pickBy(custom, value => value !== null);
					acc.custom = custom;
				}
			} else {
				acc[key] = attributes[key];
			}

			return acc;
		},
		{}
	);

// Register block function helper.
const registerBlock = (block: Block) => {
	// Normalize the block.
	block = prepareBlock(block);

	if (!block) {
		return;
	}

	const { blocktype_props, settings, innerblocks_props, extra_props } = block;
	const config = {
		...blocktype_props,
		supports: {
			...blocktype_props.supports,
			align: settings.align ? settings.align.options : false
		},
		edit: (props: any) => {
			const values = getValues(settings, props.attributes, true);

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
		save: (props: any) => {
			const values = getValues(settings, props.attributes, false);

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
	};

	registerBlockType(blocktype_props.name, config);
};

export default registerBlock;
