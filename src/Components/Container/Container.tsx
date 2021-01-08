import React from "react";
import { isBoolean, toString, map, deburr } from "lodash";

import "./Container.styl";
import { Div } from "utils/Components";
import { Background } from "../Background/Background";
import { Content } from "../Content/Content";

const getCustomAttClassName = (custom: Attributes["custom"]) => {
	const custom_className = map(
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

	return custom_className;
};

export const Container: React.ComponentType<EditProps | SaveProps> = props => {
	const { extra_props, values } = props;
	const {
		className: extra_props_className,
		...extra_props_rest
	} = extra_props.container;
	const custom_className = values.custom
		? getCustomAttClassName(values.custom)
		: [];
	const className = [
		"container",
		...extra_props_className,
		...custom_className
	];
	const className_from_value = [
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
			{...extra_props_rest}
			className={className}
			className_from_value={{ className: className_from_value, values }}
		>
			<Background {...props} />
			<Content {...props} />
		</Div>
	);
};
