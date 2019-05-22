// Wordpress
interface Wp {
	apiFetch: typeof import("./academic-bloggers-toolkit-master/wordpress__api-fetch");
	blockEditor: typeof import("./academic-bloggers-toolkit-master/wordpress__block-editor");
	blocks: typeof import("./academic-bloggers-toolkit-master/wordpress__blocks");
	components: typeof import("./academic-bloggers-toolkit-master/wordpress__components");
	compose: typeof import("./academic-bloggers-toolkit-master/wordpress__compose");
	dashicons: typeof import("./academic-bloggers-toolkit-master/wordpress__dashicons");
	data: typeof import("./academic-bloggers-toolkit-master/wordpress__data");
	domReady: typeof import("./academic-bloggers-toolkit-master/wordpress__dom-ready");
	editPost: typeof import("./academic-bloggers-toolkit-master/wordpress__edit-post");
	element: typeof import("./academic-bloggers-toolkit-master/wordpress__element");
	i18n: typeof import("./academic-bloggers-toolkit-master/wordpress__i18n");
	keycodes: typeof import("./academic-bloggers-toolkit-master/wordpress__keycodes");
	plugins: typeof import("./academic-bloggers-toolkit-master/wordpress__plugins");
	richText: typeof import("./academic-bloggers-toolkit-master/wordpress__rich-text");
	url: typeof import("./academic-bloggers-toolkit-master/wordpress__url");
}
declare const wp: Wp;

// Lodash
declare const lodash: typeof import("lodash");

// React
// namespace React = typeof import("react");
