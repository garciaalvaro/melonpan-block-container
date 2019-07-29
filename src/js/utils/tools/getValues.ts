const { reduce, mapValues, isUndefined, pickBy } = lodash;

export const getValues = (
	settings: Settings,
	attributes: Attributes,
	is_edit: boolean
) =>
	reduce<Settings, Object>(
		settings,
		(acc, _, key) => {
			if (key === "background_image") {
				acc.background_image_url = attributes.background_image_url;
				acc.background_image_srcset = attributes.background_image_srcset;
				acc.background_image_alt = attributes.background_image_alt;
				acc.background_image_id = attributes.background_image_id;
			} else if (key === "custom") {
				if (attributes.custom) {
					let custom;
					custom = mapValues(
						settings.custom,
						(value: { default: any }, key: string): any =>
							!isUndefined(attributes.custom[key]) &&
							attributes.custom[key] !== ""
								? attributes.custom[key]
								: is_edit
								? settings.custom[key].default
								: null
					);
					custom = pickBy(custom, value => value !== null);
					acc.custom = custom;
				}
			} else if (!isUndefined(attributes[key])) {
				acc[key] = attributes[key];
			}

			return acc;
		},
		{}
	);
