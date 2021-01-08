import React from "react";
import { Fragment } from "@wordpress/element";

import "./Edit.styl";
import { Controls } from "../Controls/Controls";
import { Container } from "../Container/Container";

export const Edit: React.ComponentType<EditProps> = props => {
	return (
		<Fragment>
			<Controls {...props} />
			<Container {...props} is_edit={true} />
		</Fragment>
	);
};
