import { isUndefined, difference, keys, omit } from "lodash";

import { getValues } from "utils/tools";
import { prepareSettings } from "./prepareSettings";
import { prepareAttributes } from "./prepareAttributes";
import { prepareExtraProps } from "./prepareExtraProps";
import { Save } from "Components/Save/Save";

// Prepare the deprecated array of objects.
export const prepareDeprecated = (
	deprecated: Object[],
	settings_new: Partial<Settings>,
	extra_props_new: ExtraProps
) => {
	const deprecated_prepared = deprecated.map(deprecated => {
		const settings = deprecated.settings
			? prepareSettings(deprecated.settings)
			: settings_new;
		// This is the attributes object definition, not the values.
		const attributes_definition = prepareAttributes(settings);
		const extra_props = deprecated.extra_props
			? prepareExtraProps(deprecated.extra_props)
			: extra_props_new;

		return {
			attributes: attributes_definition,
			migrate: (old_attributes: Attributes) => {
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
			save: (props: BlockProps) => {
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
						<Save
							{...props}
							values={values}
							settings={settings}
							extra_props={extra_props}
							innerblocks_props={{}}
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
