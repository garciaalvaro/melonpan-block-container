import l, {
	Div,
	plugin_slug,
	prepareClass,
	prepareClassPaddingSmallScreen
} from "../../utils";
import Background from "./Background";
import Content from "./Content";

const { compact } = lodash;
const { Component } = wp.element;

class Container extends Component {
	getClasses = () => {
		const { extra_props, settings, attributes, className } = this.props;

		let classes;
		classes = [
			extra_props.container.className,
			className, // Apply the classes from the block prop.
			`${plugin_slug}-container`,

			prepareClassPaddingSmallScreen("padding_top", settings, attributes),
			prepareClassPaddingSmallScreen(
				"padding_bottom",
				settings,
				attributes
			),
			prepareClassPaddingSmallScreen(
				"padding_left",
				settings,
				attributes
			),
			prepareClassPaddingSmallScreen(
				"padding_right",
				settings,
				attributes
			),
			prepareClassPaddingSmallScreen(
				"padding_topbottom",
				settings,
				attributes
			),
			prepareClassPaddingSmallScreen(
				"padding_leftright",
				settings,
				attributes
			),

			prepareClass("padding_top", settings, attributes),
			prepareClass("padding_bottom", settings, attributes),
			prepareClass("padding_left", settings, attributes),
			prepareClass("padding_right", settings, attributes),
			prepareClass("padding_topbottom", settings, attributes),
			prepareClass("padding_leftright", settings, attributes)
		];
		classes = compact(classes);
		classes = classes.join(" ");

		return classes;
	};

	render() {
		const { getClasses, props } = this;
		const {
			extra_props,
			settings,
			is_edit,
			innerblocks_props,
			...rest
		} = props;

		// We pass all the props to the container of the block,
		// in case there were extra props added through filters.
		return (
			<Div {...extra_props.container} {...rest} className={getClasses()}>
				<Background {...props} />
				<Content {...props} />
			</Div>
		);
	}
}

export default Container;
