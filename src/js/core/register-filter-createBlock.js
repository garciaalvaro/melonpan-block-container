import l from "utils";
import prepareBlock from "../block/prepareBlock";
import registerBlock from "./registerBlock";

const { isObject, forEach, castArray } = lodash;
const { applyFilters } = wp.hooks;

let blocks;
// Apply the filter to get all the blocks to register.
blocks = applyFilters("melonpanBlockContainer.createBlock", []);
// Make sure blocks is an array.
blocks = castArray(blocks);

forEach(blocks, block => {
	if (!isObject(block)) {
		return;
	}

	// Normalize the block.
	block = prepareBlock(block);

	if (block !== false) {
		registerBlock(block);
	}
});
