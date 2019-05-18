import addPrefix from "./addPrefix";

const { isBoolean, isUndefined } = lodash;

const Div = ({ children, classes, id, classes_from_value, ...rest }) => {
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

	return (
		<div id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
			{children}
		</div>
	);
};
const Span = ({ children, classes, id, ...rest }) => (
	<span id={addPrefix(id)} className={addPrefix(classes)} {...rest}>
		{children}
	</span>
);
const Img = ({ classes, id, ...rest }) => (
	<img id={addPrefix(id)} className={addPrefix(classes)} {...rest} />
);

export { Div, Span, Img };
