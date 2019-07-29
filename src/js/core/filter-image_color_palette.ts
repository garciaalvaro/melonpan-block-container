const { __ } = wp.i18n;

// Add color attributes to filter from Image Color Palette plugin
// https://wordpress.org/plugins/image-color-palette/advanced/
wp.hooks.addFilter(
	"imageColorPalette.addBlockTypeColorAttributes",
	"melonpan-block/container",
	(block_types: Object) => ({
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
