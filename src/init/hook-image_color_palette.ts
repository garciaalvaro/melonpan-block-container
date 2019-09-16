import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";

interface BlockTypeProps {
	[type: string]: {
		label: string;
		attribute: string;
		icon: string;
	}[];
}

// Add color attributes to hook from Image Color Palette plugin
// https://wordpress.org/plugins/image-color-palette/
addFilter(
	"imageColorPalette.addBlockTypeColorAttributes",
	"melonpan-block/container",
	(block_types: BlockTypeProps) => ({
		...block_types,
		"melonpan-block/container": [
			{
				label: __("Background Color"),
				attribute: "background_color",
				icon: "fill"
			},
			{
				label: __("Border Color"),
				attribute: "border_color",
				icon: "border"
			}
		]
	})
);
