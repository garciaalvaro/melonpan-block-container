import l from "../utils";
import prepareSettings from "./prepareSettings";
import prepareAttributes from "./prepareAttributes";
import prepareExtraClasses from "./prepareExtraClasses";
import EditSave from "../Components/EditSave/EditSave";

const { isUndefined, isObject, isArray, mapValues, pick, keys } = lodash;

const prepareDeprecated = (attributes_new, deprecated) => {
	if (!isObject(attributes_new) || !isArray(deprecated)) {
		return [];
	}

	const deprecated_prepared = deprecated.map(deprecated => {
		const settings = prepareSettings(deprecated.settings);
		const attributes_definition = prepareAttributes(settings);
		const extra_classes = prepareExtraClasses(deprecated.extra_classes);

		return {
			attributes: attributes_definition,
			save: props => (
				<EditSave
					{...props}
					settings={settings}
					extra_classes={extra_classes}
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
