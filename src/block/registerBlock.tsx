import { registerBlockType } from "@wordpress/blocks";

import { prepareBlock } from "./prepareBlock";
import { getValues } from "utils/tools";
import { Edit } from "Components/Edit/Edit";
import { Save } from "Components/Save/Save";

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
		edit: (props: EditProps) => {
			const values = getValues(settings, props.attributes, true);

			return (
				<div className={props.className}>
					<Edit
						{...props}
						innerblocks_props={innerblocks_props}
						values={values}
						settings={settings}
						extra_props={extra_props}
					/>
				</div>
			);
		},
		save: (props: SaveProps) => {
			const values = getValues(settings, props.attributes, false);

			return (
				<div>
					<Save
						{...props}
						values={values}
						settings={settings}
						extra_props={extra_props}
					/>
				</div>
			);
		}
	};

	// @ts-ignore TODO: Check types
	return registerBlockType(blocktype_props.name, config);
};
