import { castArray, pick, defaults, isString } from "lodash";

// We add a question mark prefix so later on when applying addPrefix()
// these classes dont get added the plugin_prefix.
const addQuestionMarkPrefix = (props: string) => {
	const array = props.split(" ");

	if (array.length === 1) {
		return `!${props}`;
	}

	return array.map((prop: string) => `!${prop}`);
};

export const prepareExtraProps = (
	extra_props: Partial<ExtraProps>
): ExtraProps => {
	const properties: ("container" | "content" | "background")[] = [
		"container",
		"content",
		"background"
	];
	const extra_props_prepared: ExtraProps = defaults(
		{},
		pick(extra_props, properties),
		{
			container: {},
			content: {},
			background: {}
		}
	);

	properties.forEach(el => {
		if (isString(extra_props_prepared[el].id)) {
			extra_props_prepared[el].id = addQuestionMarkPrefix(
				extra_props_prepared[el].id
			);
		}

		if (isString(extra_props_prepared[el].className)) {
			extra_props_prepared[el].className = castArray(
				addQuestionMarkPrefix(extra_props_prepared[el].className)
			);
		} else {
			extra_props_prepared[el].className = [];
		}
	});

	return extra_props_prepared;
};
