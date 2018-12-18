import l from "../utils";
import EditSave from "../Components/EditSave/EditSave";

const { isUndefined } = lodash;
const { registerBlockType } = wp.blocks;

const registerBlock = ({
	name,
	title,
	description,
	icon,
	category,
	template,
	templateLock,
	allowedBlocks,
	settings,
	attributes,
	deprecated
}) => {
	registerBlockType(name, {
		title,
		description,
		icon,
		category,
		supports: !isUndefined(settings.align)
			? { align: settings.align.options }
			: {},
		attributes,
		edit: props => (
			<EditSave
				{...props}
				template={template}
				templateLock={templateLock}
				allowedBlocks={allowedBlocks}
				settings={settings}
				is_edit={true}
			/>
		),
		save: props => (
			<EditSave {...props} settings={settings} is_edit={false} />
		),
		deprecated
	});
};

export default registerBlock;
