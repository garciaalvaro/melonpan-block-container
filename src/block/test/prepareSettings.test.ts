import { defaultsDeep } from "lodash";

import {
	prepareSettings,
	settings_defaults,
	settings_privates
} from "block/prepareSettings";

// TODO: Tests related to background_image => background_image_url
describe("prepareSettings", () => {
	it("should return the default settings", () => {
		const settings = settings_defaults;
		const settings_expected = defaultsDeep(
			settings_defaults,
			settings_privates
		);
		settings_expected.custom = {};

		expect(prepareSettings(settings)).toStrictEqual(settings_expected);
	});

	it("should return an empty object", () => {
		const settings = {};
		const settings_expected = {};

		expect(prepareSettings(settings)).toStrictEqual(settings_expected);
	});

	it("should add a setting's not set properties with the default value", () => {
		const settings: Partial<Settings> = {
			// @ts-ignore Ignore so we can test.
			content_maxwidth: {}
		};
		const settings_expected = {
			content_maxwidth: {
				show_control: true,
				default: 800,
				min: 300,
				max: 1300,
				step: 10
			}
		};

		expect(prepareSettings(settings)).toStrictEqual(settings_expected);
	});

	it("should not replace a setting's property values", () => {
		const settings = {
			content_maxwidth: {
				show_control: false,
				default: 22,
				min: 11,
				max: 33
			}
		};
		const settings_expected = {
			content_maxwidth: {
				show_control: false,
				default: 22,
				min: 11,
				max: 33,
				step: 10
			}
		};

		expect(prepareSettings(settings)).toStrictEqual(settings_expected);
	});

	it("should not add incorrect properties to a setting", () => {
		const settings: Partial<Settings> = {
			// @ts-ignore Ignore so we can test.
			content_maxwidth: {
				incorrect_prop_1: false,
				incorrect_prop_2: 100
			}
		};
		const settings_expected = {
			content_maxwidth: {
				show_control: true,
				default: 800,
				min: 300,
				max: 1300,
				step: 10
			}
		};

		expect(prepareSettings(settings)).toStrictEqual(settings_expected);
	});

	it("should not modify private properties of a setting", () => {
		const settings: Partial<Settings> = {
			// @ts-ignore Ignore so we can test.
			content_maxwidth: {
				step: 5
			},
			// @ts-ignore Ignore so we can test.
			border_width: {
				step: 5,
				min: 15,
				max: 30
			}
		};
		const settings_expected = {
			content_maxwidth: {
				show_control: true,
				default: 800,
				min: 300,
				max: 1300,
				step: 10
			},
			border_width: {
				show_control: true,
				default: 0,
				min: 0,
				max: 10,
				step: 1
			}
		};

		expect(prepareSettings(settings)).toStrictEqual(settings_expected);
	});

	it("should not add incorrect settings", () => {
		const settings: Partial<Settings> = {
			// @ts-ignore Ignore so we can test.
			content_maxwidth: {
				step: 5
			},
			incorrect_setting: {
				step: 5,
				min: 15,
				max: 30
			}
		};
		const settings_expected = {
			content_maxwidth: {
				show_control: true,
				default: 800,
				min: 300,
				max: 1300,
				step: 10
			}
		};

		expect(prepareSettings(settings)).toStrictEqual(settings_expected);
	});

	it("should add custom settings only with the default property", () => {
		const settings = {
			custom: {
				example_attribute_name: { incorrect_prop: true, default: "value_A" },
				other_example_attribute_name: { incorrect_prop: "a" },
				another_example_attribute_name: { incorrect_prop: "a", default: true }
			}
		};
		const settings_expected = {
			custom: {
				example_attribute_name: { default: "value_A" },
				other_example_attribute_name: { default: "" },
				another_example_attribute_name: { default: true }
			}
		};

		expect(prepareSettings(settings)).toStrictEqual(settings_expected);
	});
});
