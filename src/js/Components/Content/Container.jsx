import l, { Div, plugin_slug, prepareClass } from "../../utils";
import Background from "./Background";
import Content from "./Content";

const { compact, isUndefined } = lodash;
const { Component } = wp.element;

class Container extends Component {
	getClasses = () => {
		const {
			align,
			padding_top,
			padding_bottom,
			padding_leftright
		} = this.props.attributes;

		let classes;
		classes = [
			`${plugin_slug}-container`,
			prepareClass("align", align, false),
			prepareClass("paddingtop", padding_top),
			prepareClass("paddingbottom", padding_bottom),
			prepareClass("paddingleftright", padding_leftright)
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
