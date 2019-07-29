import l, { Div, getRgbaColor } from "utils";

interface Props extends Object {
	innerblocks_props?: Object;
	attributes: Object;
	values: Object;
	settings: BlockSettings;
	extra_props: BlockExtraProps;
	is_edit: boolean;
	is_test?: boolean;
}

const { isUndefined, isObject, compact } = lodash;
const editor = wp.blockEditor ? wp.blockEditor : wp.editor;
const { InnerBlocks } = editor;

const Content: React.FunctionComponent<Props> = props => {
	const { extra_props, values, is_edit, is_test } = props;
	const {
		className: extra_props_className,
		...rest_extra_props
	} = extra_props.content;
	const { content_color } = values;
	const classes = [
		"content",
		...extra_props_className,

		// When clicking the Clear button, the value changes to undefined.
		// However on reload the value is an empty string.
		!isUndefined(content_color) && content_color !== "" ? "has-color" : null
	];
	const classes_from_value = compact([
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
			{...rest_extra_props}
			classes={classes}
			style={style}
			classes_from_value={{ classes: classes_from_value, values }}
		>
			{is_test ? null : is_edit ? (
				<InnerBlocks {...props.innerblocks_props} />
			) : (
				<InnerBlocks.Content />
			)}
		</Div>
	);
};

export default Content;
