import l from "../../utils";
import Controls from "../Controls/Controls";
import Container from "../Content/Container";

const { Fragment } = wp.element;

const EditSave = props => {
	return (
		<Fragment>
			{props.is_edit && <Controls {...props} />}
			<Container {...props} />
		</Fragment>
	);
};

export default EditSave;
