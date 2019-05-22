import addPrefix from "./addPrefix";

interface Props {
	children?: React.ReactChild;
	id?: string | null;
	classes?: string | (string | null)[];
	classes_from_value?: { classes: string[]; values: { [key: string]: any } };
	[rest: string]: any;
}
interface HTMLProps extends Props {
	html_tag: string;
}

const { isBoolean, isUndefined, reduce } = lodash;

const Div: React.FunctionComponent<Props> = props => (
	<HTML {...props} html_tag="div" />
);
const Span: React.FunctionComponent<Props> = props => (
	<HTML {...props} html_tag="span" />
);
const Img: React.FunctionComponent<Props> = props => (
	<HTML {...props} html_tag="img" />
);

const HTML: React.FunctionComponent<HTMLProps> = props => {
	let {
		children,
		id,
		classes = [],
		classes_from_value,
		html_tag,
		...rest
	} = props;

	if (classes_from_value) {
		classes = [
			...classes,
			...classes_from_value.classes.map((prop: string) => {
				const value = classes_from_value!.values[prop];

				if (typeof value === "undefined") {
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

	let attributes;
	attributes = {
		...rest,
		id: id ? addPrefix(id) : null,
		className: classes ? addPrefix(classes) : null
	};
	attributes = reduce(
		attributes,
		(acc: { [key: string]: any }, value: any, key: string) => {
			if (value) {
				acc[key] = value;
			}

			return acc;
		},
		{}
	);

	switch (html_tag) {
		case "div":
			return <div {...attributes}>{children}</div>;
			break;

		case "span":
			return <span {...attributes}>{children}</span>;
			break;

		case "img":
			return <img {...attributes} />;
			break;

		default:
			return null;
			break;
	}
};

export { Div, Span, Img };
