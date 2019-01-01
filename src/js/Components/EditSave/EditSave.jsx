import l from "../../utils";
import Controls from "../Controls/Controls";
import Container from "../Content/Container";

const { Fragment } = wp.element;

// We use the same component for both save and edit properties of
// the block registration function. The only difference is the is_edit prop
// which will add or not the Controls component and
// make use of Innerblocks or Innerblocks.Content component.
const EditSave = props => {
	return (
		<Fragment>
			{props.is_edit && <Controls {...props} />}
			<Container {...props} />
		</Fragment>
	);
};

export default EditSave;
