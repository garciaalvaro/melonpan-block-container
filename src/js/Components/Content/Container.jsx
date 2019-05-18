import l, { Div } from "utils";
import Background from "./Background";
import Content from "./Content";

const Container = props => {
	const { extra_props, values } = props;
	const classes = [
		"container",
		extra_props.container.className
		// TODO
		// prepareCustomAttributeClasses(settings, attributes, is_edit),
	];
	const classes_from_value = [
		// Padding
		"padding",
		"padding_top",
		"padding_bottom",
		"padding_left",
		"padding_right",
		"padding_topbottom",
		"padding_leftright",
		// Padding small screen
		"padding_small_screen",
		"padding_top_small_screen",
		"padding_bottom_small_screen",
		"padding_left_small_screen",
		"padding_right_small_screen",
		"padding_topbottom_small_screen",
		"padding_leftright_small_screen"
	];

	return (
		<Div
			{...extra_props.container}
			classes={classes}
			classes_from_value={{ classes: classes_from_value, values }}
		>
			<Background {...props} />
			<Content {...props} />
		</Div>
	);
};

export default Container;
