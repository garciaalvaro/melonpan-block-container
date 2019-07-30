import { prepareSettings, settings_defaults } from "block/prepareSettings";
import {
	prepareAttributes,
	attributes_defaults
} from "block/prepareAttributes";

const { cloneDeep, mapValues } = lodash;

describe("prepareAttributes", () => {
	it("should return the default attributes, given default settings", () => {
		const settings = prepareSettings(settings_defaults);
		let attributes: Partial<Attributes>;
		attributes = cloneDeep(attributes_defaults);
		attributes = mapValues(attributes, (value, key) => {
			if (key in settings && "default" in settings[key as keyof Settings]) {
				return {
					...value,
					default: settings[key as keyof Settings].default
				};
			}
			return value;
		});

		expect(prepareAttributes(settings)).toStrictEqual(attributes);
	});

	it("should return the default attributes, given empty settings", () => {
		const settings = prepareSettings({});

		expect(prepareAttributes(settings)).toStrictEqual(attributes_defaults);
	});

	it("should apply the custom property with correct defaults", () => {
		const settings = prepareSettings({
			custom: { a: { incorrect: true }, b: { default: true } }
		});
		const attributes = {
			...attributes_defaults,
			custom: { type: "object", default: { a: "", b: true } }
		};

		expect(prepareAttributes(settings)).toStrictEqual(attributes);
	});

	it("should not set incorrect properties", () => {
		const settings = {
			incorrect_1: true,
			incorrect_2: {
				min: 300,
				max: 1300,
				step: 10
			},
			content_maxwidth: {
				show_control: true,
				default: 333,
				min: 300,
				max: 1300,
				step: 10
			}
		};
		const attributes = {
			...attributes_defaults,
			content_maxwidth: { type: "number", default: 333 }
		};

		expect(prepareAttributes(settings)).toStrictEqual(attributes);
	});

	it("should not let a setting modify private properties", () => {
		const settings: Partial<Settings> = {
			// @ts-ignore Ignore so we can test.
			padding_topbottom_small_screen: {
				type: "boolean"
			}
		};

		expect(prepareAttributes(settings)).toStrictEqual(attributes_defaults);
	});

	it("should apply custom property values", () => {
		const settings = {
			padding_topbottom_small_screen: {
				default: 111
			}
		};
		const attributes = {
			...attributes_defaults,
			padding_topbottom_small_screen: {
				default: 111,
				type: "number"
			}
		};

		expect(prepareAttributes(settings)).toStrictEqual(attributes);
	});
});
