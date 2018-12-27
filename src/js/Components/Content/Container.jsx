import l, { Div, plugin_slug, prepareClass } from "../../utils";
import Background from "./Background";
import Content from "./Content";

const { compact, isUndefined } = lodash;
const { Component } = wp.element;

class Container extends Component {
	getClasses = () => {
		const { extra_classes, settings, attributes, className } = this.props;

		let classes;
		classes = [
			extra_classes.container,
			className, // Apply the classes from the block prop.
			`${plugin_slug}-container`,
			prepareClass("padding_top", settings, attributes),
			prepareClass("padding_bottom", settings, attributes),
			prepareClass("padding_leftright", settings, attributes)
		];
		classes = compact(classes);
		classes = classes.join(" ");

		return classes;
	};

	render() {
		const { getClasses, props } = this;
		const {
			extra_classes,
			settings,
			is_edit,
			innerblocks_props,
			...rest
		} = props;

		// We pass all the props to the container of the block,
		// in case there were extra props added through filters.
		return (
			<Div {...rest} className={getClasses()}>
				<Background {...props} />
				<Content {...props} />
			</Div>
		);
	}
}

export default Container;
