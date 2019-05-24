import l from "utils";
import { registerBlockType } from "@wordpress/blocks";
import { renderToString } from "@wordpress/element";
import { parse } from "@wordpress/block-serialization-default-parser";

const { mapValues } = lodash;

// If the current HTML from the block's save function does not fit
// the existing block HTML, then look for a deprecated save output that fits:
// [{extra_props, settings}] => [{attributes, migrate, save}]

describe("deprecated, block migration", () => {
	const test_save = (current, testing) => {
		const attributes = { ...testing.attributes, ...current.attributes };

		l(renderToString(testing.save({ attributes })), current.html);
		return renderToString(testing.save({ attributes })) === current.html;
	};

	it("should return true, the block is compatible with the default save fn", () => {
		const block = registerBlockType("namespace/a", {
			title: "a",
			category: "common",
			attributes: {
				id: {
					type: "string",
					default: "bbb"
				},
				content: {
					type: "number",
					default: 20
				}
			},
			save: props => (
				<div id={props.attributes.id} className="wp-block-a-b">
					{props.attributes.content}
				</div>
			),
			deprecated: [
				{
					attributes: {
						id: {
							type: "string",
							default: "aaa"
						},
						content: {
							type: "number",
							default: 10
						}
					},
					save: props => (
						<div id={props.attributes.id} className="wp-block-a-b">
							<span>{props.attributes.content}</span>
						</div>
					)
				}
			]
		});
		const block_html = `<!-- wp:a/b {"id":"ccc","content":30} -->
		<div id="ccc" class="wp-block-a-b">30</div>
		<!-- /wp:a/b -->`;
		const parsed = parse(block_html)[0];
		const current = {
			attributes: parsed.attrs,
			html: parsed.innerHTML.replace(/\n|\t/g, "")
		};

		// Root save
		const testing = {
			save: block.save,
			attributes: mapValues(block.attributes, att => att.default)
		};
		const is_valid = test_save(current, testing);

		expect(is_valid).toBe(true);
	});

	it("should return false and then true, the block is compatible with a deprecated save fn", () => {
		const block = registerBlockType("namespace/b", {
			title: "b",
			category: "common",
			attributes: {
				id: {
					type: "string",
					default: "bbb"
				},
				content: {
					type: "number",
					default: 20
				}
			},
			save: props => (
				<div id={props.attributes.id} className="wp-block-a-b">
					{props.attributes.content}
				</div>
			),
			deprecated: [
				{
					attributes: {
						id: {
							type: "string",
							default: "aaa"
						},
						content: {
							type: "number",
							default: 10
						}
					},
					save: props => (
						<div id={props.attributes.id} className="wp-block-a-b">
							<span>{props.attributes.content}</span>
						</div>
					)
				}
			]
		});
		const block_html = `<!-- wp:a/b {"id":"ccc","content":30} -->
		<div id="ccc" class="wp-block-a-b"><span>30</span></div>
		<!-- /wp:a/b -->`;
		const parsed = parse(block_html)[0];
		const current = {
			attributes: parsed.attrs,
			html: parsed.innerHTML.replace(/\n|\t/g, "")
		};

		// Root save
		const testing = {
			save: block.save,
			attributes: mapValues(block.attributes, att => att.default)
		};
		let is_valid = test_save(current, testing);

		expect(is_valid).toBe(false);

		if (!is_valid) {
			block.deprecated.forEach(({ save, attributes }) => {
				if (is_valid) {
					return;
				}

				const testing = {
					save,
					attributes: mapValues(attributes, att => att.default)
				};

				is_valid = test_save(current, testing);
			});
		}

		expect(is_valid).toBe(true);
	});
});
