import l from "utils";
import Controls from "../Controls/Controls";
import Container from "../Content/Container";

interface Props {
	innerblocks_props: Object;
	values: Object;
	settings: BlockSettings;
	extra_props: BlockExtraProps;
	is_edit: boolean;
	[rest: string]: any;
}

const { Fragment } = wp.element;

// We use the same component for both save and edit properties of
// the block registration function. The only difference is the is_edit prop
// which will add or not the Controls component and
// make use of Innerblocks or Innerblocks.Content component.
const EditSave: React.FunctionComponent<Props> = props => {
	return (
		<Fragment>
			{props.is_edit && <Controls {...props} />}
			<Container {...props} />
		</Fragment>
	);
};

export default EditSave;
