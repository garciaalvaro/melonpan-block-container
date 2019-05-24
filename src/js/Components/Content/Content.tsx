import l, { Div, getRgbaColor } from "utils";

interface Props extends Object {
	values: Object;
	extra_props: BlockExtraProps;
	is_edit: boolean;
}

const { isUndefined, isObject, compact } = lodash;
const { InnerBlocks } = wp.editor;

const Content: React.FunctionComponent<Props> = props => {
	const { extra_props, values, is_edit } = props;
	const {
		className: extra_props_className,
		...rest_extra_props
	} = extra_props.content;
	const { content_color, content_align } = values;
	const classes = [
		"content",
		...extra_props_className,

		// When clicking the Clear button, the value changes to undefined.
		// However on reload the value is an empty string.
		!isUndefined(content_color) && content_color !== "" ? "has-color" : null
	];
	const classes_from_value = compact([
		!content_align || content_align !== "full" ? "content_maxwidth" : null,
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
			{is_edit ? (
				<InnerBlocks {...props.innerblocks_props} />
			) : (
				<InnerBlocks.Content />
			)}
		</Div>
	);
};

export default Content;
