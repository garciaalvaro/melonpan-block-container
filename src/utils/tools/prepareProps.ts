import { isUndefined, isBoolean, reduce, castArray } from "lodash";

import { addPrefix } from "utils/tools/addPrefix";

export const prepareProps = (props: ComponentProps) => {
	let { id, className = [], className_from_value, html_tag, ...rest } = props;

	if (className_from_value) {
		className = [
			...castArray(className),
			...className_from_value.className.map((prop: string) => {
				const value = className_from_value!.values[prop];

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

	return {
		id: addPrefix(id) || undefined,
		className: addPrefix(className) || undefined,
		...extra_props
	};
};
