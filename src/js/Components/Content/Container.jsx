import l, {
	Div,
	plugin_slug,
	prepareClass,
	prepareExtraClasses
} from "../../utils";
import Background from "./Background";
import Content from "./Content";

const { compact } = lodash;
const { Component } = wp.element;

class Container extends Component {
	getClasses = () => {
		const { extra_props, settings, attributes } = this.props;

		let classes;
		classes = [
			`${plugin_slug}-container`,
			extra_props.container.className,

			prepareExtraClasses(settings, attributes),

			// Padding
			prepareClass("padding", settings, attributes),
			prepareClass("padding_top", settings, attributes),
			prepareClass("padding_bottom", settings, attributes),
			prepareClass("padding_left", settings, attributes),
			prepareClass("padding_right", settings, attributes),
			prepareClass("padding_topbottom", settings, attributes),
			prepareClass("padding_leftright", settings, attributes),

			// Padding small screen
			prepareClass("padding_small_screen", settings, attributes),
			prepareClass("padding_top_small_screen", settings, attributes),
			prepareClass("padding_bottom_small_screen", settings, attributes),
			prepareClass("padding_left_small_screen", settings, attributes),
			prepareClass("padding_right_small_screen", settings, attributes),
			prepareClass(
				"padding_topbottom_small_screen",
				settings,
				attributes
			),
			prepareClass("padding_leftright_small_screen", settings, attributes)
		];
		// Remove falsey values.
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
			innerBlocks,
			...rest
		} = props;
		const extra_props_from_filters = is_edit ? {} : rest;

		// We pass all the props to the container of the block,
		// in case there were extra props added through filters.
		return (
			<Div
				{...extra_props.container}
				{...extra_props_from_filters}
				className={getClasses()}
			>
				<Background {...props} />
				<Content {...props} />
			</Div>
		);
	}
}

export default Container;
