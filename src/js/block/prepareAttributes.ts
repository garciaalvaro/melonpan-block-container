import { addPrefix } from "utils/tools/addPrefix";

const { mapValues, reduce, cloneDeep } = lodash;

export const attributes_defaults: AttributesDefinition = {
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
		selector: `.${addPrefix("background-image")}`,
		attribute: "src"
	},
	background_image_srcset: {
		type: "string",
		source: "attribute",
		selector: `.${addPrefix("background-image")}`,
		attribute: "srcset"
	},
	background_image_alt: {
		type: "string",
		source: "attribute",
		selector: `.${addPrefix("background-image")}`,
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

// Prepare attributes object. Pass the default values from settings object.
export const prepareAttributes = (settings: Partial<Settings>) => {
	// Assign only the attributes that are passed in the settings.
	const attributes_definition = reduce<
		AttributesDefinition,
		Partial<AttributesDefinition>
	>(
		attributes_defaults,
		(acc, attribute, attribute_key) => {
			const key = attribute_key as keyof Attributes;

			// We need to pass all attributes because the migrate function
			// in deprecate doesn't recognize removed attributes otherwise.
			// (This only applies to certain attributes like background_color).
			// See: https://github.com/WordPress/gutenberg/issues/10406
			acc[key] = cloneDeep(attribute);

			if (key === "custom" && "custom" in settings) {
				acc.custom.default = mapValues(
					settings.custom,
					custom_prop => custom_prop.default
				);
			} else if (
				key in settings &&
				"default" in settings[key as keyof Settings]
			) {
				acc[key].default = settings[key as keyof Settings].default;
			}

			return acc;
		},
		{}
	);

	return attributes_definition;
};
