import { isArray, isObject } from "lodash";
import { applyFilters } from "@wordpress/hooks";

import { registerBlock } from "block/registerBlock";

// Apply the hook to get all the block types to register.
const block_types = applyFilters("melonpanBlockContainer.createBlock", []);

if (isArray(block_types)) {
	block_types.forEach((block_type: BlockRaw) => {
		if (
			!isObject(block_type) ||
			!block_type.blocktype_props ||
			!block_type.blocktype_props.name ||
			!block_type.blocktype_props.title ||
			!block_type.blocktype_props.icon ||
			!block_type.blocktype_props.category
		) {
			return;
		}

		registerBlock(block_type);
	});
}
