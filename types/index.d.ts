// Wordpress
declare const wp: {
	apiFetch: typeof import("./academic-bloggers-toolkit-master/wordpress__api-fetch");
	// blockEditor: typeof import("./academic-bloggers-toolkit-master/wordpress__block-editor");
	blocks: typeof import("./academic-bloggers-toolkit-master/wordpress__blocks");
	// components: typeof import("./academic-bloggers-toolkit-master/wordpress__components");
	// compose: typeof import("./academic-bloggers-toolkit-master/wordpress__compose");
	dashicons: typeof import("./academic-bloggers-toolkit-master/wordpress__dashicons");
	// data: typeof import("./academic-bloggers-toolkit-master/wordpress__data");
	domReady: typeof import("./academic-bloggers-toolkit-master/wordpress__dom-ready");
	editPost: typeof import("./academic-bloggers-toolkit-master/wordpress__edit-post");
	element: typeof import("./academic-bloggers-toolkit-master/wordpress__element");
	i18n: typeof import("./academic-bloggers-toolkit-master/wordpress__i18n");
	keycodes: typeof import("./academic-bloggers-toolkit-master/wordpress__keycodes");
	plugins: typeof import("./academic-bloggers-toolkit-master/wordpress__plugins");
	richText: typeof import("./academic-bloggers-toolkit-master/wordpress__rich-text");
	url: typeof import("./academic-bloggers-toolkit-master/wordpress__url");
	hooks: Object;
	data: Object;
	components: Object;
	editor: Object;
	compose: Object;
	blockEditor: Object;
	parse: (arg: string) => Object[];
};

// Lodash
declare const lodash: typeof import("lodash");

// React
// namespace React = typeof import("react");

declare interface Object {
	[key: string]: any;
}

declare interface EditSaveProps extends Object {
	attributes: BlockSettings;
	settings: BlockSettings;
	extra_props: BlockExtraProps;
}

declare interface BlockExtraProps extends Object {
	container: Object;
	content: Object;
	background: Object;
}

declare interface BlockSettings extends Object {
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

declare interface Block extends Object {
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
