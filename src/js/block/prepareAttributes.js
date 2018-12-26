import l, { plugin_slug } from "../utils";

const { reduce, isUndefined, get } = lodash;

const prepareAttributes = settings => {
	const attributes = {
		align: {
			type: "string"
		},
		content_align: {
			type: "string"
		},
		content_maxwidth: {
			type: "number"
		},
		background_color: {
			type: "string"
		},
		background_color_opacity: {
			type: "number"
		},
		background_image_id: {
			type: "number"
		},
		background_image_url: {
			type: "string",
			source: "attribute",
			selector: `.${plugin_slug}-background-image`,
			attribute: "src"
		},
		background_image_srcset: {
			type: "string",
			source: "attribute",
			selector: `.${plugin_slug}-background-image`,
			attribute: "srcset"
		},
		background_image_alt: {
			type: "string",
			source: "attribute",
			selector: `.${plugin_slug}-background-image`,
			attribute: "alt"
		},
		padding_top: {
			type: "number"
		},
		padding_bottom: {
			type: "number"
		},
		padding_leftright: {
			type: "number"
		},
		border_color: {
			type: "string"
		},
		border_color_opacity: {
			type: "number"
		},
		border_width: {
			type: "number"
		},
		shadow_color: {
			type: "string"
		},
		shadow_color_opacity: {
			type: "number"
		},
		shadow_width: {
			type: "number"
		}
	};

	// We need to pass all attributes because the migrate function
	// in deprecate doesn't recognize the removed attributes otherwise
	// see: https://github.com/WordPress/gutenberg/issues/10406
	const attributes_custom = reduce(
		attributes,
		(acc, attribute, key) => {
			if (!isUndefined(get(settings, [key, "default"]))) {
				acc[key] = {
					...attribute,
					default: settings[key].default
				};
			} else {
				acc[key] = attribute;
			}

			return acc;
		},
		{}
	);

	// const attributes_custom = reduce(
	// 	settings,
	// 	(acc, setting, key) => {
	// 		if (!isUndefined(setting.default)) {
	// 			acc[key] = {
	// 				...attributes[key],
	// 				default: setting.default
	// 			};
	// 		} else {
	// 			acc[key] = {
	// 				...attributes[key]
	// 			};
	// 		}

	// 		return acc;
	// 	},
	// 	{}
	// );

	return attributes_custom;
};

export default prepareAttributes;
