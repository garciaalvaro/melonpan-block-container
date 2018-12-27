import l, { Div, plugin_slug, prepareClass, getValue } from "../../utils";

const { compact, isUndefined } = lodash;
const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

class Content extends Component {
	getClasses = () => {
		let { extra_classes, settings, attributes } = this.props;
		const content_align = getValue("content_align", settings, attributes);
		const content_maxwidth =
			isUndefined(content_align) || content_align !== "full"
				? getValue("content_maxwidth", settings, attributes)
				: undefined;

		let classes;
		classes = [
			extra_classes.content,
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
		const { is_edit } = props;

		return (
			<Div className={getClasses()}>
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
