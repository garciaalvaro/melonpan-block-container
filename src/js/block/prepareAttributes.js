import l, { plugin_slug } from "utils";

const { isUndefined, mapValues, reduce } = lodash;

// Prepare attributes object. Pass the default values from settings object.
const prepareAttributes = settings => {
	const attributes = {
		custom: {
			type: "object",
			default: {}
		},
		align: {
			type: "string"
		},
		content_align: {
			type: "string"
		},
		content_maxwidth: {
			type: "number"
		},
		content_color: {
			type: "string"
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
		background_fixed: {
			type: "boolean"
		},
		padding: {
			type: "number"
		},
		padding_top: {
			type: "number"
		},
		padding_bottom: {
			type: "number"
		},
		padding_left: {
			type: "number"
		},
		padding_right: {
			type: "number"
		},
		padding_topbottom: {
			type: "number"
		},
		padding_leftright: {
			type: "number"
		},
		padding_small_screen: {
			type: "number"
		},
		padding_top_small_screen: {
			type: "number"
		},
		padding_bottom_small_screen: {
			type: "number"
		},
		padding_left_small_screen: {
			type: "number"
		},
		padding_right_small_screen: {
			type: "number"
		},
		padding_topbottom_small_screen: {
			type: "number"
		},
		padding_leftright_small_screen: {
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

	// Assign only the attributes that are passed in the settings.
	const attributes_custom = reduce(
		attributes,
		(acc, attribute, key) => {
			// We need to pass all attributes because the migrate function
			// in deprecate doesn't recognize removed attributes otherwise.
			// (This only applies to certain attributes like background_color).
			// See: https://github.com/WordPress/gutenberg/issues/10406
			acc[key] = attribute;

			if (key === "custom" && !isUndefined(settings.custom)) {
				acc.custom.default = mapValues(
					settings.custom,
					custom_value => custom_value.default
				);
			} else if (
				!isUndefined(settings[key]) &&
				!isUndefined(settings[key].default)
			) {
				acc[key].default = settings[key].default;
			}

			return acc;
		},
		{}
	);

	return attributes_custom;
};

export default prepareAttributes;
