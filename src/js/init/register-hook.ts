import { registerBlock } from "block/registerBlock";

const { isArray, isObject } = lodash;

// Apply the filter to get all the blocks to register.
const blocks = wp.hooks.applyFilters("melonpanBlockContainer.createBlock", []);

if (isArray(blocks)) {
	blocks.forEach((block: BlockRaw) => {
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
}
