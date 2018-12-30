import l from "../utils";

const { isObject, isUndefined, assign, pick, mapValues, keys } = lodash;

const settings_private_props = {
	content_maxwidth: {
		step: 10
	},
	background_color_opacity: {
		step: 1
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
	max_padding_small_screen: {
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

const settings_default_prop = {
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
			{ name: "banana", color: "#FFDEAD" },
			{ name: "melon", color: "#aae6bd" },
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
	content_maxwidth: {
		default: 800,
		min: 300,
		max: 1300
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
	max_padding_small_screen: {
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
		setting_value = assign({}, defaults[setting_key], setting_value);

		if (!isUndefined(privates[setting_key])) {
			// Assign private properties.
			setting_value = assign({}, privates[setting_key], setting_value);
		}

		return setting_value;
	});

	if (!isUndefined(custom.background_image)) {
		const background_image = {
			background_image_id: {},
			background_image_url: {},
			background_image_srcset: {},
			background_image_alt: {}
		};

		// Assign private required properties.
		settings = assign({}, background_image, settings);
	}

	return settings;
};

export default prepareSettings;
