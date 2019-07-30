import { getValues } from "utils/tools/getValues";
import { prepareBlock } from "./prepareBlock";
import { EditSave } from "Components/EditSave/EditSave";

// Register block function helper.
export const registerBlock = (block_raw: BlockRaw) => {
	// Normalize the block.
	const block = prepareBlock(block_raw);

	const { blocktype_props, settings, innerblocks_props, extra_props } = block;

	const config = {
		...blocktype_props,
		supports: {
			...blocktype_props.supports,
			align: settings.align ? (settings.align.options as string[]) : false
		},
		edit: (props: BlockPropsEdit) => {
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
		save: (props: BlockPropsSave) => {
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

	// @ts-ignore TODO
	return wp.blocks.registerBlockType(blocktype_props.name, config);
};
