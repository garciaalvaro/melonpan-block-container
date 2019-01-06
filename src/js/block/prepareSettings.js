import l from "../utils";

const { isObject, isUndefined, reduce, pick, mapValues, keys } = lodash;

// Object containing settings properties meant to be private.
const settings_private_props = {
	content_maxwidth: {
		step: 10
	},
	background_color_opacity: {
		step: 1
	},
	padding: {
		step: 5
	},
	padding_top: {
		step: 5
	},
	padding_bottom: {
		step: 5
	},
	padding_left: {
		step: 5
	},
	padding_right: {
		step: 5
	},
	padding_topbottom: {
		step: 5
	},
	padding_leftright: {
		step: 5
	},
	padding_small_screen: {
		step: 5
	},
	padding_top_small_screen: {
		step: 5
	},
	padding_bottom_small_screen: {
		step: 5
	},
	padding_left_small_screen: {
		step: 5
	},
	padding_right_small_screen: {
		step: 5
	},
	padding_topbottom_small_screen: {
		step: 5
	},
	padding_leftright_small_screen: {
		step: 5
	},
	border_width: {
		step: 1,
		min: 0,
		max: 10
	},
	border_color_opacity: {
		step: 1
	},
	shadow_width: {
		step: 1,
		min: 0,
		max: 10
	},
	shadow_color_opacity: {
		step: 1
	}
};

let settings_default_prop;

// This is an array of all available settings.
settings_default_prop = {
	custom: {},
	align: {
		default: "",
		options: ["left", "center", "right", "wide", "full"]
	},
	content_align: {
		default: "center",
		options: ["left", "center", "right", "full"]
	},
	background_color: {
		default: "",
		colors: [
			{ name: "banana", color: "#fce198" },
			{ name: "sandia", color: "#f68c78" },
			{ name: "melocoton", color: "#ffc5b4" },
			{ name: "pistacho", color: "#bdb76b" },
			{ name: "ciruela", color: "#bd8f8f" },
			{ name: "naranja", color: "#ff7f50" },
			{ name: "endrina", color: "#708090" },
			{ name: "black", color: "#000000" },
			{ name: "white", color: "#ffffff" }
		]
	},
	background_color_opacity: {
		default: 50,
		min: 0,
		max: 100
	},
	background_image: {},
	background_fixed: { default: false },
	content_maxwidth: {
		default: 800,
		min: 300,
		max: 1300
	},
	padding: {
		default: 20,
		min: 0,
		max: 100
	},
	padding_top: {
		default: 20,
		min: 0,
		max: 200
	},
	padding_bottom: {
		default: 20,
		min: 0,
		max: 200
	},
	padding_left: {
		default: 20,
		min: 0,
		max: 100
	},
	padding_right: {
		default: 20,
		min: 0,
		max: 100
	},
	padding_topbottom: {
		default: 20,
		min: 0,
		max: 200
	},
	padding_leftright: {
		default: 20,
		min: 0,
		max: 100
	},
	padding_small_screen: {
		default: 20,
		min: 0,
		max: 100
	},
	padding_top_small_screen: {
		default: 20,
		min: 0,
		max: 200
	},
	padding_bottom_small_screen: {
		default: 20,
		min: 0,
		max: 200
	},
	padding_left_small_screen: {
		default: 20,
		min: 0,
		max: 100
	},
	padding_right_small_screen: {
		default: 20,
		min: 0,
		max: 100
	},
	padding_topbottom_small_screen: {
		default: 20,
		min: 0,
		max: 200
	},
	padding_leftright_small_screen: {
		default: 20,
		min: 0,
		max: 100
	},
	border_color: {
		default: "",
		colors: [
			{ name: "black", color: "#000000" },
			{ name: "white", color: "#ffffff" }
		]
	},
	border_color_opacity: {
		default: 15,
		min: 0,
		max: 100
	},
	border_width: {
		default: 0
	},
	shadow_color: {
		default: "",
		colors: [
			{ name: "black", color: "#000000" },
			{ name: "white", color: "#ffffff" }
		]
	},
	shadow_color_opacity: {
		default: 15,
		min: 0,
		max: 100
	},
	shadow_width: {
		default: 0
	}
};

// Assign the show_control property to each setting.
settings_default_prop = mapValues(settings_default_prop, setting_value => ({
	...setting_value,
	show_control: true
}));

// Nomralize the settings passed.
const prepareSettings = custom => {
	if (!isObject(custom)) {
		return {};
	}

	const defaults = settings_default_prop;
	const privates = settings_private_props;

	let settings;
	settings = custom;
	// Exclude not allowed attributes.
	settings = pick(settings, keys(defaults));

	// Use only the allowed keys.
	settings = mapValues(settings, (setting_value, setting_key) => {
		// Exclude not allowed properties.
		setting_value = pick(setting_value, keys(defaults[setting_key]));
		// Fill not-set properties with the ones from defaults.
		setting_value = { ...defaults[setting_key], ...setting_value };

		if (!isUndefined(privates[setting_key])) {
			// Assign private properties.
			setting_value = { ...privates[setting_key], ...setting_value };
		}

		return setting_value;
	});
	// Assign custom attribute.
	if (isObject(custom.custom)) {
		const custom_attribute = reduce(
			custom.custom,
			(acc, custom_value, custom_key) => {
				if (!isObject(custom_value)) {
					return acc;
				}

				custom_value = pick(custom_value, ["default"]);
				custom_value = { default: "", ...custom_value };

				acc[custom_key] = custom_value;

				return acc;
			},
			{}
		);

		settings = { ...settings, custom: custom_attribute };
	}

	return settings;
};

export default prepareSettings;
