import l, { Div, plugin_slug, prepareClass } from "../../utils";
import Background from "./Background";
import Content from "./Content";

const { compact, isUndefined } = lodash;
const { Component } = wp.element;

class Container extends Component {
	getClasses = () => {
		const { settings, attributes } = this.props;

		let classes;
		classes = [
			`${plugin_slug}-container`,
			!isUndefined(settings.align) && !isUndefined(attributes.align)
				? `align${attributes.align}`
				: "",
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

		return (
			<Div className={getClasses()}>
				<Background {...props} />
				<Content {...props} />
			</Div>
		);
	}
}

export default Container;
