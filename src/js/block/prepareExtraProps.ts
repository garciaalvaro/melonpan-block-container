import l from "utils";

const { castArray, pick, defaults } = lodash;

const addHash = (props: string) => {
	const array = props.split(" ");

	if (array.length === 1) {
		return `#${props}`;
	}

	return array.map((prop: string) => `#${prop}`);
};

const prepareExtraProps = (extra_props: Object): BlockExtraProps => {
	const properties = ["container", "content", "background"];
	const extra_props_prepared: BlockExtraProps = defaults(
		{},
		pick(extra_props, properties),
		{
			container: {},
			content: {},
			background: {}
		}
	);

	properties.forEach(el => {
		if (typeof extra_props_prepared[el].id === "string") {
			extra_props_prepared[el].id = addHash(extra_props_prepared[el].id);
		}

		if (typeof extra_props_prepared[el].className === "string") {
			extra_props_prepared[el].className = castArray(
				addHash(extra_props_prepared[el].className)
			);
		} else {
			extra_props_prepared[el].className = [];
		}
	});

	return extra_props_prepared;
};

export default prepareExtraProps;
