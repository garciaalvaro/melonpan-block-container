import l from "utils";

const { isObject, isUndefined, reduce, pick, mapValues, keys } = lodash;

// Object containing settings properties meant to be private.
const settings_privates = {
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

// Array of all available settings.
let settings_defaults: Object;
settings_defaults = {
	custom: {},
	align: {
		default: "",
		options: ["left", "center", "right", "wide", "full"]
	},
	content_align: {
		default: "center",
		options: ["left", "center", "right", "full"]
	},
	content_maxwidth: {
		default: 800,
		min: 300,
		max: 1300
	},
	content_color: {
		default: "",
		colors: [
			{ name: "black", color: "#000000" },
			{ name: "white", color: "#ffffff" }
		]
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
settings_defaults = mapValues(settings_defaults, setting => ({
	...setting,
	show_control: true
}));

// Normalize the settings passed.
const prepareSettings = (block: Block) => {
	if (!block.settings || !isObject(block.settings)) {
		return {};
	}

	let { settings } = block;
	const defaults: Object = settings_defaults;
	const privates: Object = settings_privates;

	// Exclude not allowed settings.
	settings = pick(settings, keys(defaults));

	// Filter allowed keys in each setting.
	settings = mapValues(settings, (setting: Object, key: string) => {
		// Exclude not allowed properties.
		setting = pick(setting, keys(defaults[key]));
		// Fill not-set properties with the ones from defaults.
		setting = { ...defaults[key], ...setting };

		if (!isUndefined(privates[key])) {
			// Assign private properties.
			setting = { ...privates[key], ...setting };
		}

		return setting;
	});

	// Assign custom attribute.
	if (isObject(settings!.custom)) {
		const custom = reduce(
			settings.custom,
			(acc: Object, value: any, key: string) => {
				if (!isObject(value)) {
					return acc;
				}

				value = pick(value, ["default"]);
				value = { default: "", ...value };

				acc[key] = value;

				return acc;
			},
			{}
		);

		settings = { ...settings, custom };
	}

	return settings;
};

export default prepareSettings;
