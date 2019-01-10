import l, {
	Div,
	plugin_slug,
	prepareClass,
	prepareColor,
	getValue
} from "../../utils";

const { isUndefined, isObject, compact } = lodash;
const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

class Content extends Component {
	getClasses = () => {
		let { extra_props, settings, attributes } = this.props;
		const content_align = getValue("content_align", settings, attributes);
		const content_maxwidth =
			isUndefined(content_align) || content_align !== "full"
				? getValue("content_maxwidth", settings, attributes)
				: undefined;

		let classes;
		classes = [
			`${plugin_slug}-content`,
			extra_props.content.className,

			// When clicking the Clear button, the value changes to undefined.
			// However on reload the value is an empty string.
			!isUndefined(attributes.content_color) &&
			attributes.content_color !== ""
				? `${plugin_slug}-has-color`
				: null,
			prepareClass(
				"content_maxwidth",
				settings,
				attributes,
				content_maxwidth
			),
			prepareClass("content_align", settings, attributes)
		];
		// Remove falsey values.
		classes = compact(classes);
		classes = classes.join(" ");

		return classes;
	};

	getStyle = () => {
		const { extra_props, settings, attributes } = this.props;
		const content_color = getValue("content_color", settings, attributes);

		let style;
		style = {
			color: prepareColor(content_color)
		};
		style = isObject(extra_props.content.style)
			? { ...style, ...extra_props.content.style }
			: style;

		return style;
	};

	render() {
		const { getClasses, getStyle, props } = this;
		const { is_edit, extra_props } = props;

		return (
			<Div
				{...extra_props.content}
				className={getClasses()}
				style={getStyle()}
			>
				{is_edit ? (
					<InnerBlocks {...props.innerblocks_props} />
				) : (
					<InnerBlocks.Content />
				)}
			</Div>
		);
	}
}

export default Content;
