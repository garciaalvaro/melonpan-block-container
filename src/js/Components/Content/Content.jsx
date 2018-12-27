import l, { Div, plugin_slug, prepareClass, getValue } from "../../utils";

const { compact, isUndefined } = lodash;
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
			extra_props.content.className,
			`${plugin_slug}-content`,
			prepareClass(
				"content_maxwidth",
				settings,
				attributes,
				content_maxwidth
			),
			prepareClass("content_align", settings, attributes)
		];
		classes = compact(classes);
		classes = classes.join(" ");

		return classes;
	};

	render() {
		const { getClasses, props } = this;
		const { is_edit, extra_props } = props;

		return (
			<Div {...extra_props.content} className={getClasses()}>
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
