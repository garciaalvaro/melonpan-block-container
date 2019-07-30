import { Controls } from "Components/Controls/Controls";
import { Container } from "Components/Content/Container";

const { Fragment } = wp.element;

// We use the same component for both save and edit properties of
// the block registration function. The only difference is the is_edit prop
// which will add or not the Controls component and
// make use of Innerblocks or Innerblocks.Content component.
export const EditSave: React.ComponentType<
	BlockPropsSave | BlockPropsEdit
> = props => {
	return (
		<Fragment>
			{props.is_edit && <Controls {...props as BlockPropsEdit} />}
			<Container {...props} />
		</Fragment>
	);
};
