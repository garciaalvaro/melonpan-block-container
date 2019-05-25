import l, { getValues } from "utils";
import prepareSettings from "./prepareSettings";
import prepareAttributes from "./prepareAttributes";
import EditSave from "../Components/EditSave/EditSave";

const { isUndefined, difference, keys, omit, defaults } = lodash;

// Prepare the deprecated array of objects.
const prepareDeprecated = (
	deprecated: Object[],
	settings_new: Object,
	extra_props_new: Object
) => {
	const deprecated_prepared = deprecated.map((deprecated: Object) => {
		const settings = deprecated.settings
			? prepareSettings(deprecated.settings)
			: settings_new;
		// This is the attributes object definition, not the values.
		const attributes_definition = prepareAttributes(settings);
		const extra_props = deprecated.extra_props
			? defaults({}, deprecated.extra_props, {
					container: {},
					content: {},
					background: {}
			  })
			: extra_props_new;

		return {
			attributes: attributes_definition,
			migrate: (old_attributes: Object) => {
				const deprecated_custom_keys = difference(
					keys(old_attributes.custom),
					keys(settings_new.custom)
				);

				const updated_attributes = {
					// Both new and old attributes object has all attributes.
					// The difference is in the default value. We are passing the old one.
					// This way if a block instance had a default attribute value,
					// After the migration it will have that old default value applied,
					// rather than inheriting the new default. This way the new default value
					// only applies to new instances and not to old ones.
					...old_attributes,
					custom: omit(old_attributes.custom, deprecated_custom_keys)
				};

				return updated_attributes;
			},
			save: (props: Object) => {
				const { attributes } = props;
				// If the custom property changed we need to manually include
				// the old keys in the old version of the attribute.
				const missing_keys = difference(
					keys(settings.custom),
					keys(attributes.custom)
				);

				if (missing_keys.length) {
					const custom_old: Object = {};

					missing_keys.forEach(missing_key => {
						custom_old[missing_key] = settings.custom[missing_key].default;
					});

					attributes.custom = {
						...attributes.custom,
						...custom_old
					};
				}
				const values = getValues(settings, attributes, false);

				return (
					<div>
						<EditSave
							{...props}
							values={values}
							settings={settings}
							extra_props={extra_props}
							innerblocks_props={{}}
							is_edit={false}
						/>
					</div>
				);
			},
			supports: {
				align: !isUndefined(settings.align) ? settings.align.options : false
			}
		};
	});

	return deprecated_prepared;
};

export default prepareDeprecated;
