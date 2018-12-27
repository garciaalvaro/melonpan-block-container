import l from "../utils";
import EditSave from "../Components/EditSave/EditSave";

const { isUndefined } = lodash;
const { registerBlockType } = wp.blocks;

const registerBlock = ({
	blocktype_props,
	settings,
	innerblocks_props,
	extra_classes
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
				extra_classes={extra_classes}
				is_edit={true}
			/>
		),
		save: props => (
			<EditSave
				{...props}
				settings={settings}
				extra_classes={extra_classes}
				is_edit={false}
			/>
		)
	});
};

export default registerBlock;
