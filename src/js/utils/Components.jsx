import addPrefix from "./addPrefix";

const { isBoolean, isUndefined, reduce } = lodash;

const Div = props => <HTML {...props} html_tag="div" />;
const Span = props => <HTML {...props} html_tag="span" />;
const Img = props => <HTML {...props} html_tag="img" />;

const HTML = props => {
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
			...classes_from_value.classes.map(prop => {
				if (prop === null) {
					return null;
				}

				let value = classes_from_value.values[prop];

				if (isUndefined(value)) {
					return null;
				}

				if (isBoolean(value)) {
					value = value ? "enabled" : "disabled";
				}

				return `${prop}-${value}`;
			})
		];
	}

	let attributes;
	attributes = {
		...rest,
		id: addPrefix(id),
		className: addPrefix(classes)
	};
	attributes = reduce(
		attributes,
		(acc, value, key) => {
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
			return 123;
			break;
	}
};

export { Div, Span, Img };
