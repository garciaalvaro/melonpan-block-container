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

type ImageSize = {
	width: number;
	height: number;
	url: string;
};

interface ImageRaw {
	id: number;
	alt: string;
	link: string;
	caption: string;
	url: string;
	sizes: {
		full: ImageSize;
		large?: ImageSize;
		medium?: ImageSize;
		medium_large?: ImageSize;
		thumbnail?: ImageSize;
	};
}

interface Paddings {
	padding: number;
	padding_top: number;
	padding_bottom: number;
	padding_left: number;
	padding_right: number;
	padding_topbottom: number;
	padding_leftright: number;
	padding_small_screen: number;
	padding_top_small_screen: number;
	padding_bottom_small_screen: number;
	padding_left_small_screen: number;
	padding_right_small_screen: number;
	padding_topbottom_small_screen: number;
	padding_leftright_small_screen: number;
}

interface BorderShadow {
	border_color: string;
	border_color_opacity: number;
	border_width: number;
	shadow_color: string;
	shadow_color_opacity: number;
	shadow_width: number;
}

interface Attributes extends Paddings, BorderShadow {
	custom: any;
	align: string;
	content_align: string;
	content_maxwidth: number;
	content_color: string;
	background_color: string;
	background_color_opacity: number;
	background_image_id: number;
	background_image_url: string;
	background_image_srcset: string;
	background_image_alt: string;
	background_fixed: boolean;
}

interface AttributesDefinition extends Record<keyof Attributes, any> {}

interface Setting {
	default: any;
	[key: string]: any;
}

interface Settings
	extends Record<
		keyof Omit<
			Attributes,
			| "custom"
			| "background_image_id"
			| "background_image_url"
			| "background_image_srcset"
			| "background_image_alt"
		>,
		Setting
	> {
	background_image: any;
	custom: any;
}

interface ExtraProps {
	container: Object;
	content: Object;
	background: Object;
}

interface BlockRaw {
	blocktype_props: {
		name: string;
		title: string;
		icon: string | JSX.Element | React.ReactNode;
		category: string;
	};
	supports?: Object;
	settings?: Partial<Settings>;
	deprecated?: Object[];
	innerblocks_props?: Object;
	extra_props?: Partial<ExtraProps>;
}

interface Block {
	blocktype_props: {
		name: string;
		title: string;
		icon: string | JSX.Element | React.ReactNode;
		category: string;
		supports?: Object;
		deprecated: Object[];
		attributes: Partial<Attributes>;
	};
	settings: Partial<Settings>;
	innerblocks_props: Object;
	extra_props: ExtraProps;
}

interface BlockProps {
	values: Partial<Attributes>;
	attributes: Block["attributes"];
	settings: Block["settings"];
	innerblocks_props: Block["innerblocks_props"];
	extra_props: Block["extra_props"];
	is_edit: boolean;
	is_test?: boolean;
}

interface BlockPropsEdit extends BlockProps {
	className: string;
	setAttributes: Function;
}

interface BlockPropsSave extends BlockProps {}
