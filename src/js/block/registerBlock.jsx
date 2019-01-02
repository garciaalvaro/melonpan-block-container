import l, { cleanClassName } from "../utils";
import EditSave from "../Components/EditSave/EditSave";

const { isUndefined } = lodash;
const { registerBlockType } = wp.blocks;

// Register block function helper.
const registerBlock = ({
	blocktype_props,
	settings,
	innerblocks_props,
	extra_props
}) => {
	registerBlockType(blocktype_props.name, {
		...blocktype_props,
		supports: {
			...blocktype_props.supports,
			align: !isUndefined(settings.align) ? settings.align.options : false
		},
		edit: props => (
			<EditSave
				{...props}
				innerblocks_props={innerblocks_props}
				settings={settings}
				extra_props={extra_props}
				is_edit={true}
			/>
		),
		save: props => {
			const { attributes } = props;

			if (!isUndefined(attributes.className)) {
				props.attributes.className = cleanClassName(
					attributes.className
				);
			}

			return (
				<EditSave
					{...props}
					settings={settings}
					extra_props={extra_props}
					is_edit={false}
				/>
			);
		}
	});
};

export default registerBlock;
