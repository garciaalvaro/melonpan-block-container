import l from "../utils";
import prepareAttributes from "./prepareAttributes";
import prepareSettings from "./prepareSettings";
import prepareDeprecated from "./prepareDeprecated";

const prepareBlock = block => {
	const defaults = {
		name: "",
		title: "",
		icon: "",
		category: "",
		template: undefined,
		templateLock: undefined,
		allowedBlocks: undefined,
		settings_old: []
	};

	block = { ...defaults, ...block };

	const settings = prepareSettings(block.settings);
	const attributes = prepareAttributes(settings);

	block = {
		// Block-register properties.
		name: block.name,
		title: block.title,
		icon: block.icon,
		category: block.category,

		// InnerBlock properties.
		template: block.template,
		templateLock: block.templateLock,
		allowedBlocks: block.allowedBlocks,

		// Settings.
		settings,
		attributes,

		// Settings.
		deprecated: prepareDeprecated(attributes, block.settings_old)
	};

	return block;
};

export default prepareBlock;
