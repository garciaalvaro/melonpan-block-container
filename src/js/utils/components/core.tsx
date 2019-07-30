import { icons, Icons } from "utils/data/icons";
import { addPrefix } from "utils/tools/addPrefix";

interface ComponentProps {
	children?: React.ReactNode;
	id?: string | null;
	classes?: string | (string | null)[];
	classes_from_value?: { classes: string[]; values: { [key: string]: any } };
	[rest: string]: any;
}

export interface HTMLProps extends ComponentProps {
	html_tag: string;
}

interface IconProps {
	icon: keyof Icons;
}

export const Icon: React.ComponentType<IconProps> = props =>
	icons[props.icon] ? icons[props.icon] : null;

export const Div: React.ComponentType<ComponentProps> = props => (
	<HTML {...props} html_tag="div" />
);

export const Span: React.ComponentType<ComponentProps> = props => (
	<HTML {...props} html_tag="span" />
);

export const Img: React.ComponentType<ComponentProps> = props => (
	<HTML {...props} html_tag="img" />
);

const { isBoolean, isUndefined, reduce } = lodash;

const HTML: React.ComponentType<HTMLProps> = props_raw => {
	let {
		children,
		id,
		classes = [],
		classes_from_value,
		html_tag,
		...rest
	} = props_raw;

	if (classes_from_value) {
		classes = [
			...classes,
			...classes_from_value.classes.map((prop: string) => {
				const value = classes_from_value!.values[prop];

				if (isUndefined(value)) {
					return null;
				}

				if (isBoolean(value)) {
					const state = value ? "enabled" : "disabled";

					return `${prop}-${state}`;
				}

				return `${prop}-${value}`;
			})
		];
	}

	const extra_props = reduce(
		rest,
		(acc: { [key: string]: any }, value: any, key: string) => {
			if (value) {
				acc[key] = value;
			}

			return acc;
		},
		{}
	);

	const props = {
		id: id ? addPrefix(id) : undefined,
		className: classes && classes.length ? addPrefix(classes) : undefined,
		...extra_props
	};

	switch (html_tag) {
		case "div":
			return <div {...props}>{children}</div>;
			break;

		case "span":
			return <span {...props}>{children}</span>;
			break;

		case "img":
			return <img {...props} />;
			break;

		default:
			return null;
			break;
	}
};
