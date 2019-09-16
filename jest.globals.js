import "./jest.matchMedia.mock";
import React from "react";
import ReactDOM from "react-dom";
import lodash from "lodash";
import * as blockEditor from "@wordpress/block-editor";
import * as blockSerializationDefaultParser from "@wordpress/block-serialization-default-parser";
import * as blocks from "@wordpress/blocks";
import * as components from "@wordpress/components";
import * as compose from "@wordpress/compose";
import * as data from "@wordpress/data";
import * as editor from "@wordpress/editor";
import * as element from "@wordpress/element";
import * as hooks from "@wordpress/hooks";
import * as i18n from "@wordpress/i18n";

global.React = React;
global.ReactDOM = ReactDOM;
global.lodash = "lodash";
global.wp = {
	blockEditor,
	blockSerializationDefaultParser,
	blocks,
	components,
	compose,
	data,
	editor,
	element,
	hooks,
	i18n
};
