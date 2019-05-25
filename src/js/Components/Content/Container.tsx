import l, { Div, addPrefix } from "utils";
import Background from "./Background";
import Content from "./Content";

interface Props extends Object {
	innerblocks_props?: Object;
	attributes: Object;
	values: Object;
	settings: BlockSettings;
	extra_props: BlockExtraProps;
	is_edit: boolean;
}

const { isBoolean, toString, map, deburr } = lodash;
const getCustomAttClasses = (custom: Object) => {
	const custom_classes = map(
		custom,
		(value: string | number | boolean, key: string) => {
			if (isBoolean(value)) {
				const state = value ? "enabled" : "disabled";

				return `${key}-${state}`;
			}

			value = toString(value);
			value = deburr(value);
			value = value.replace(/[^\w-_]/g, "");

			return `${key}-${value}`;
		}
	);

	return custom_classes;
};

const Container: React.FunctionComponent<Props> = props => {
	const { extra_props, values } = props;
	const {
		className: extra_props_className,
		...rest_extra_props
	} = extra_props.container;
	const custom_classes = values.custom
		? getCustomAttClasses(values.custom)
		: [];
	const classes = ["container", ...extra_props_className, ...custom_classes];
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
			{...rest_extra_props}
			classes={classes}
			classes_from_value={{ classes: classes_from_value, values }}
		>
			<Background {...props} />
			<Content {...props} />
		</Div>
	);
};

export default Container;
