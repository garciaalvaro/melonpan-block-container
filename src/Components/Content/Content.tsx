import { isUndefined, isObject, compact } from "lodash";
import { Fragment } from "@wordpress/element";
import * as blockEditor from "@wordpress/block-editor";
import * as editor from "@wordpress/editor";

import "./Content.styl";
import { Div } from "utils/Components";
import { getRgbaColor } from "utils/tools";

const { InnerBlocks } = blockEditor || editor;

export const Content: React.ComponentType<EditProps | SaveProps> = props => {
	const { extra_props, values, is_edit, is_test } = props;
	const {
		className: extra_props_className,
		...extra_props_rest
	} = extra_props.content;
	const { content_color } = values;
	const className = [
		"content",
		...extra_props_className,

		// When clicking the Clear button, the value changes to undefined.
		// However on reload the value is an empty string.
		!isUndefined(content_color) && content_color !== "" ? "has-color" : null
	];
	const className_from_value = compact([
		// content_maxwidth is applied even if content_align is full.
		// In the CSS it will be overriden if content_align is full.
		"content_maxwidth",
		"content_align"
	]);
	let style;
	style = {
		color: content_color ? getRgbaColor(content_color) : null
	};
	style = isObject(extra_props.content.style)
		? { ...style, ...extra_props.content.style }
		: style;

	return (
		<Div
			{...extra_props_rest}
			className={className}
			style={style}
			className_from_value={{ className: className_from_value, values }}
		>
			{is_test ? null : is_edit ? (
				<Fragment>
					{/*
					// @ts-ignore */}
					<InnerBlocks {...props.innerblocks_props} />
				</Fragment>
			) : (
				<InnerBlocks.Content />
			)}
		</Div>
	);
};
