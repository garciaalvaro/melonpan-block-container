import l from "../../utils";
import Controls from "../Controls/Controls";
import Container from "../Content/Container";

const { Fragment, Component } = wp.element;

// We use the same component for both save and edit properties of
// the block registration function. The only difference is the is_edit prop
// which will add or not the Controls component and
// make use of Innerblocks or Innerblocks.Content component.
class EditSave extends Component {
	render() {
		const { props } = this;

		return (
			<Fragment>
				{props.is_edit && <Controls {...props} />}
				<Container {...props} />
			</Fragment>
		);
	}
}

export default EditSave;
