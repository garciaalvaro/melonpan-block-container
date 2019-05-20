import React from "react";
import ReactDOM from "react-dom";
import lodash from "lodash";
import * as i18n from "@wordpress/i18n";
import * as element from "@wordpress/element";
// import * as components from "@wordpress/components";
// import * as editor from "@wordpress/editor";
// import * as hooks from "@wordpress/hooks";

global.React = React;
global.ReactDOM = ReactDOM;
global.lodash = lodash;
global.wp = {
	i18n,
	element
	// components,
	// editor,
	// hooks
};
