import l from "utils";
import prepareBlock from "./prepareBlock";
import EditSave from "../Components/EditSave/EditSave";

const { registerBlockType } = wp.blocks;

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
		edit: props => (
			<div className={props.className}>
				<EditSave
					{...props}
					innerblocks_props={innerblocks_props}
					settings={settings}
					extra_props={extra_props}
					is_edit={true}
				/>
			</div>
		),
		save: props => (
			<div>
				<EditSave
					{...props}
					settings={settings}
					extra_props={extra_props}
					is_edit={false}
				/>
			</div>
		)
	});
};

export default registerBlock;
