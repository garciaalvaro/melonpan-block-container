import l from "../utils";
import prepareSettings from "./prepareSettings";
import prepareAttributes from "./prepareAttributes";
import prepareExtraProps from "./prepareExtraProps";
import EditSave from "../Components/EditSave/EditSave";

const { isUndefined, isArray, mapValues, pick, keys } = lodash;

const prepareDeprecated = (
	deprecated,
	settings_new,
	attributes_new,
	extra_props_new
) => {
	if (!isArray(deprecated)) {
		return [];
	}

	const deprecated_prepared = deprecated.map(deprecated => {
		const settings = !isUndefined(deprecated.settings)
			? prepareSettings(deprecated.settings)
			: settings_new;
		const attributes_definition = prepareAttributes(settings);
		const extra_props = !isUndefined(deprecated.extra_props)
			? prepareExtraProps(deprecated.extra_props)
			: extra_props_new;

		return {
			attributes: attributes_definition,
			save: props => (
				<EditSave
					{...props}
					settings={settings}
					extra_props={extra_props}
					is_edit={false}
				/>
			),
			supports: {
				align: !isUndefined(settings.align)
					? settings.align.options
					: false
			},
			migrate: attributes_old => {
				attributes_new = mapValues(attributes_new, attribute =>
					!isUndefined(attribute.default)
						? attribute.default
						: attribute
				);

				attributes_old = pick(attributes_old, keys(attributes_new));

				return { ...attributes_new, ...attributes_old };
			}
		};
	});

	return deprecated_prepared;
};

export default prepareDeprecated;
