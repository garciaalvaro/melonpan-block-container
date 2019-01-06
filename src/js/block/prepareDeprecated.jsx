import l from "../utils";
import prepareSettings from "./prepareSettings";
import prepareAttributes from "./prepareAttributes";
import prepareExtraProps from "./prepareExtraProps";
import EditSave from "../Components/EditSave/EditSave";

const {
	isUndefined,
	isArray,
	isEmpty,
	difference,
	forEach,
	keys,
	omit
} = lodash;

// Prepare the deprecated array of objects.
const prepareDeprecated = (deprecated, settings_new, extra_props_new) => {
	if (!isArray(deprecated)) {
		return [];
	}

	const deprecated_prepared = deprecated.map(deprecated => {
		const settings = !isUndefined(deprecated.settings)
			? prepareSettings(deprecated.settings)
			: settings_new;
		// This is the attributes object definition, not the values.
		const attributes_definition = prepareAttributes(settings);
		const extra_props = !isUndefined(deprecated.extra_props)
			? prepareExtraProps(deprecated.extra_props)
			: extra_props_new;

		return {
			attributes: attributes_definition,
			migrate: old_attributes => {
				const deprecated_custom_keys = difference(
					keys(old_attributes.custom),
					keys(settings_new.custom)
				);

				const updated_attributes = {
					...old_attributes,
					custom: omit(old_attributes.custom, deprecated_custom_keys)
				};

				return updated_attributes;
			},
			save: props => {
				// If the custom property changed we need to manually include
				// the old keys in the old version of the attribute.
				const missing_keys = difference(
					keys(settings.custom),
					keys(props.attributes.custom)
				);

				if (!isEmpty(missing_keys)) {
					const custom_old = {};

					forEach(missing_keys, missing_key => {
						custom_old[missing_key] =
							settings.custom[missing_key].default;
					});

					props.attributes.custom = {
						...props.attributes.custom,
						...custom_old
					};
				}

				return (
					<div>
						<EditSave
							{...props}
							settings={settings}
							extra_props={extra_props}
							is_edit={false}
						/>
					</div>
				);
			},
			supports: {
				align: !isUndefined(settings.align)
					? settings.align.options
					: false
			}
		};
	});

	return deprecated_prepared;
};

export default prepareDeprecated;
