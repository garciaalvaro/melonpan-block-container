import { attributes_defaults } from "block/prepareAttributes";
import { prepareExtraProps } from "block/prepareExtraProps";
import { prepareSettings } from "block/prepareSettings";
import { prepareDeprecated } from "block/prepareDeprecated";

const { mapValues } = lodash;

describe("prepareDeprecated", () => {
	let extra_props: any = {};
	let settings: any = {
		custom: {
			prop_a: { default: "value_B" },
			// prop_b: { default: 2 },
			prop_c: { default: true }
		},
		content_maxwidth: {
			show_control: true,
			default: 800,
			min: 300,
			max: 1300
		}
	};
	let deprecated = [
		{
			settings: {
				align: {
					default: "right",
					options: ["right", "full"]
				}
			}
		},
		{
			settings: {
				custom: {
					prop_a: { default: "value_A" },
					prop_b: { default: 2 },
					prop_c: { default: true }
				},
				content_maxwidth: {
					show_control: true,
					default: 444,
					min: 300,
					max: 1300
				}
			}
		}
	];
	settings = prepareSettings(settings);
	extra_props = prepareExtraProps(extra_props);
	const deprecated_prepared = prepareDeprecated(
		deprecated,
		settings,
		extra_props
	);

	it("should return correct attributes", () => {
		const expected_attributes = [
			mapValues(attributes_defaults, (att, key) => {
				if (key === "align") {
					return {
						type: "string",
						default: "right"
					};
				}

				return att;
			}),
			mapValues(attributes_defaults, (att, key) => {
				if (key === "custom") {
					return {
						type: "object",
						default: { prop_a: "value_A", prop_b: 2, prop_c: true }
					};
				} else if (key === "content_maxwidth") {
					return {
						type: "number",
						default: 444
					};
				}

				return att;
			})
		];

		expect(deprecated_prepared[0].attributes).toStrictEqual(
			expected_attributes[0]
		);
		expect(deprecated_prepared[1].attributes).toStrictEqual(
			expected_attributes[1]
		);
	});

	it("should return correct supports", () => {
		const expected_supports = [
			{
				align: ["right", "full"]
			},
			{ align: false }
		];

		expect(deprecated_prepared[0].supports).toStrictEqual(expected_supports[0]);
		expect(deprecated_prepared[1].supports).toStrictEqual(expected_supports[1]);
	});
});
