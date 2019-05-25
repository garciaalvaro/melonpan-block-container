import l, { getValues } from "utils";
import prepareBlock from "./prepareBlock";
import EditSave from "../Components/EditSave/EditSave";

// Register block function helper.
const registerBlock = (block: Block) => {
	// Normalize the block.
	const block_prepared = prepareBlock(block);

	const {
		blocktype_props,
		settings,
		innerblocks_props,
		extra_props
	} = block_prepared;
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
		save: (props: EditSaveProps) => {
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

	return wp.blocks.registerBlockType(blocktype_props.name, config);
};

export default registerBlock;
