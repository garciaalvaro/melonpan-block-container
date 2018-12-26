import l, { Div, plugin_slug, prepareClass } from "../../utils";
import Background from "./Background";
import Content from "./Content";

const { compact, isUndefined } = lodash;
const { Component } = wp.element;

class Container extends Component {
	getClasses = () => {
		const { settings, attributes, className } = this.props;

		let classes;
		classes = [
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

		// We pass all the props to the container of the block,
		// in case there were extra props added through filters.
		return (
			<Div {...props} className={getClasses()}>
				<Background {...props} />
				<Content {...props} />
			</Div>
		);
	}
}

export default Container;
