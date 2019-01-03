import l from "../utils";
import prepareSettings from "./prepareSettings";
import prepareAttributes from "./prepareAttributes";
import prepareExtraProps from "./prepareExtraProps";
import EditSave from "../Components/EditSave/EditSave";

const { isUndefined, isArray, isEmpty, difference, forEach, keys } = lodash;

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
			save: props => {
				// If the extra property changed we need to manually include
				// the old keys in the old version of the attribute.
				const missing_keys = difference(
					keys(settings.extra),
					keys(props.attributes.extra)
				);
				if (!isEmpty(missing_keys)) {
					const extra_old = {};

					forEach(missing_keys, missing_key => {
						extra_old[missing_key] = settings.extra[missing_key];
					});

					props.attributes.extra = {
						...props.attributes.extra,
						...extra_old
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
