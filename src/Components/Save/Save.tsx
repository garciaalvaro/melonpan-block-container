import { Fragment } from "@wordpress/element";

import { Container } from "../Container/Container";

export const Save: React.ComponentType<SaveProps> = props => {
	return (
		<Fragment>
			<Container {...props} is_edit={false} />
		</Fragment>
	);
};
