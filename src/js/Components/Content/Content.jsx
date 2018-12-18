import l, { Div, plugin_slug, prepareClass } from "../../utils";

const { compact, isUndefined } = lodash;
const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

class Content extends Component {
	getClasses = () => {
		let { content_maxwidth, content_align } = this.props.attributes;
		content_maxwidth =
			isUndefined(content_align) || content_align !== "full"
				? content_maxwidth
				: undefined;

		let classes;
		classes = [
			`${plugin_slug}-content`,
			prepareClass("maxwidth", content_maxwidth),
			prepareClass("align", content_align)
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
					<InnerBlocks
						template={props.template}
						templateLock={props.templateLock}
						allowedBlocks={props.allowedBlocks}
					/>
				) : (
					<InnerBlocks.Content />
				)}
			</Div>
		);
	}
}

export default Content;
