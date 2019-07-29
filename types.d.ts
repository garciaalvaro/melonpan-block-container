// Console log shortcut
declare const l: Function;

// Lodash
declare const lodash: typeof import("lodash");

// Wordpress
declare const wp: {
	blockEditor: typeof import("wordpress__block-editor");
	blocks: typeof import("wordpress__blocks");
	blockSerializationDefaultParser: typeof import("wordpress__block-serialization-default-parser");
	components: typeof import("wordpress__components");
	compose: typeof import("wordpress__compose");
	data: typeof import("wordpress__data");
	editor: typeof import("wordpress__editor");
	element: typeof import("wordpress__element");
	hooks: typeof import("wordpress__hooks");
	i18n: typeof import("wordpress__i18n");
};

interface Object {
	[key: string]: any;
}

interface EditSaveProps extends Object {
	attributes: BlockSettings;
	settings: BlockSettings;
	extra_props: BlockExtraProps;
}

interface BlockExtraProps extends Object {
	container: Object;
	content: Object;
	background: Object;
}

interface BlockSettings extends Object {
	custom?: Object;
	align?: Object;
	content_align?: Object;
	content_maxwidth?: Object;
	content_color?: Object;
	background_color?: Object;
	background_image?: Object;
	background_fixed?: Object;
	background_color_opacity?: Object;
	border_color?: Object;
	border_color_opacity?: Object;
	border_width?: Object;
	shadow_color?: Object;
	shadow_color_opacity?: Object;
	shadow_width?: Object;
	padding?: Object;
	padding_top?: Object;
	padding_bottom?: Object;
	padding_left?: Object;
	padding_right?: Object;
	padding_topbottom?: Object;
	padding_leftright?: Object;
	padding_small_screen?: Object;
	padding_top_small_screen?: Object;
	padding_bottom_small_screen?: Object;
	padding_left_small_screen?: Object;
	padding_right_small_screen?: Object;
	padding_topbottom_small_screen?: Object;
	padding_leftright_small_screen?: Object;
}

interface Block extends Object {
	blocktype_props: {
		name: string;
		title: string;
		icon: string | JSX.Element;
		category: string;
		supports?: Object;
	};
	settings?: BlockSettings;
	deprecated?: Object[];
	innerblocks_props?: Object;
	extra_props?: any; // Needed
}
