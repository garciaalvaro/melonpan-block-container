import l from "utils";
import prepareExtraProps from "../prepareExtraProps";

describe("prepareExtraProps", () => {
	it("should return defaults when receiving an empty object", () => {
		const testing = {};
		const expected = {
			content: { className: [] },
			container: { className: [] },
			background: { className: [] }
		};

		expect(prepareExtraProps(testing)).toStrictEqual(expected);
	});

	it("should return defaults when receiving an incorrect object", () => {
		const testing = {
			incorrect_1: 123,
			incorrect_2: { a: 1, b: true },
			incorrect_3: true
		};
		const expected = {
			content: { className: [] },
			container: { className: [] },
			background: { className: [] }
		};

		expect(prepareExtraProps(testing)).toStrictEqual(expected);
	});

	it("should return defaults and prepared clasName and id (with a hash to later be use in addPrefix)", () => {
		const testing = {
			background: { aaa: true, className: "aaa bbb", "data-a": 123, id: "aaa" },
			incorrect_1: 123,
			incorrect_2: { a: 1, b: true },
			incorrect_3: true
		};
		const expected = {
			content: { className: [] },
			container: { className: [] },
			background: {
				id: "#aaa",
				aaa: true,
				className: ["#aaa", "#bbb"],
				"data-a": 123
			}
		};

		expect(prepareExtraProps(testing)).toStrictEqual(expected);
	});
});
