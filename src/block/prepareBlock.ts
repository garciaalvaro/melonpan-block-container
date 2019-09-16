import { prepareAttributes } from "./prepareAttributes";
import { prepareSettings } from "./prepareSettings";
import { prepareDeprecated } from "./prepareDeprecated";
import { prepareExtraProps } from "./prepareExtraProps";

// Normalize the block props.
export const prepareBlock = (block_raw: BlockRaw): Block => {
	const settings = prepareSettings(block_raw.settings || {});
	const attributes = prepareAttributes(settings);
	const supports = block_raw.supports || {};
	const extra_props = prepareExtraProps(block_raw.extra_props || {});
	const innerblocks_props = block_raw.innerblocks_props || {};
	const deprecated = prepareDeprecated(
		block_raw.deprecated || [],
		settings,
		extra_props
	);

	return {
		blocktype_props: {
			...block_raw.blocktype_props,
			attributes,
			deprecated,
			supports
		},
		extra_props,
		settings,
		innerblocks_props
	};
};
