import l from "utils";

const { castArray, pick, defaults } = lodash;

const addHash = (props: string) => {
	const array = props.split(" ");

	if (array.length === 1) {
		return `#${props}`;
	}

	return array.map((prop: string) => `#${prop}`);
};

const prepareExtraProps = (extra_props: Object) => {
	const properties = ["container", "content", "background"];
	let extra_props_prepared: Object = {};

	extra_props_prepared = pick(extra_props, properties);
	extra_props_prepared = defaults({}, extra_props_prepared, {
		container: {},
		content: {},
		background: {}
	});

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
