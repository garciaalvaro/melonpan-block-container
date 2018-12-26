import l from "../utils";
import prepareSettings from "./prepareSettings";
import prepareAttributes from "./prepareAttributes";
import EditSave from "../Components/EditSave/EditSave";

const { isUndefined, isObject, isArray, mapValues, pick, keys } = lodash;

const prepareDeprecated = (attributes_new, deprecated_settings) => {
	if (!isObject(attributes_new) || !isArray(deprecated_settings)) {
		return [];
	}

	const deprecated = deprecated_settings.map(setting_old => {
		setting_old = prepareSettings(setting_old);
		let attributes_old_definition = prepareAttributes(setting_old);

		return {
			attributes: attributes_old_definition,
			save: props => (
				<EditSave {...props} settings={setting_old} is_edit={false} />
			),
			supports: !isUndefined(setting_old.align)
				? { align: setting_old.align.options }
				: {},
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

	return deprecated;
};

export default prepareDeprecated;
