import l from "utils";

const { castArray } = lodash;

const addHash = (props: string) => {
	const array = props.split(" ");

	if (array.length === 1) {
		return `#${props}`;
	}

	return array.map((prop: string) => `#${prop}`);
};

const prepareExtraProps = (extra_props: BlockExtraProps) => {
	["container", "content", "background"].forEach(el => {
		if (extra_props[el].id) {
			extra_props[el].id = addHash(extra_props[el].id);
		}

		extra_props[el].className = extra_props[el].className
			? castArray(addHash(extra_props[el].className))
			: [];
	});

	return extra_props;
};

export default prepareExtraProps;
