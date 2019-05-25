import l from "utils";
import registerBlock from "../block/registerBlock";

const { castArray, isObject } = lodash;

let blocks;
// Apply the filter to get all the blocks to register.
blocks = wp.hooks.applyFilters("melonpanBlockContainer.createBlock", []);
// Make sure blocks is an array.
// In case the user passed the block itself rather than push it to the array.
blocks = castArray(blocks);

blocks.forEach((block: Block) => {
	if (
		!isObject(block) ||
		!block.blocktype_props ||
		!block.blocktype_props.name ||
		!block.blocktype_props.title ||
		!block.blocktype_props.icon ||
		!block.blocktype_props.category
	) {
		return;
	}

	registerBlock(block);
});
