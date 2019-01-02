=== Melonpan Block Container ===
Contributors: melonpan
Tags: gutenberg, blocks, editor, container, innerblocks
Requires at least: 5.0
Tested up to: 5.0
Stable tag: 0.0.1
Requires PHP: 5.6
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Container block with settings to nest other blocks. Developers may also use it to create their own blocks in a quick way.

== Description ==

This block is a wrapper that can nest other blocks. It comes with several settings:
Background color, Background color opacity, Background image, Content align, Content max-width, Border color, Border color opacity, Border width, Shadow color, Shadow color opacity, Shadow width, Padding top, Padding bottom, Padding left, Padding right...
Developers: The plugin comes with a filter to register your own block based on this one, with nested templates. Check the tab "How can I use the filter to create my own block?" below for more info.

== Screenshots ==

1. Main view, dark scheme.
2. Dragging a block to a different position.
3. Opened block menu.
4. Development Tool, console log block data.
5. List of available color schemes, light and dark.

== Usage ==

This block will be added inside the blocks inserter menu under the "Melonpan Blocks" category.
Once added in the page you can edit its settings and add other blocks inside it.
You may even add this same block type inside.

== Installation ==

Installation from the WordPress admin.

1. Log in to the WordPress admin and navigate to Plugins > Add New.
2. Type "Melonpan Block - Container" in the Search field.
3. In the results list "Melonpan Block - Container" plugin should appear, click **Install Now** button.
4. Once it finished installing, click the Activate button.
5. That's it, now you can go to any post where Gutenberg is enabled and start using the block.

== Frequently Asked Questions ==

= How can I use the filter to create my own block? =

The plugin comes with a filter to register your own block based on this one.
You can choose from the available settings, listed below, and assign the block's InnerBlocks properties to customize it.
First you need to [enqueue your script in the editor](https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/javascript/loading-javascript/).

Then, inside your script call the filter in the following way (make sure "Melonpan Block - Container" plugin is active):

    // Custom block registration example using the filter.
    wp.hooks.addFilter("mbc.createBlock", "my-plugin/my-block", blocks => {
        return blocks.concat({
            // These are the default block registration properties. For more available properties:
            // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
            blocktype_props: {
                name: "my-plugin/my-block",
                title: "My Block",
                icon: "carrot",
                category: "common"
            },
            // These properties will be passed to the InnerBlocks component. For more info:
            // https://github.com/WordPress/gutenberg/blob/master/packages/editor/src/components/inner-blocks/README.md
            innerblocks_props: {
                template: [["core/quote"], ["core/image"]],
                templateLock: false,
                allowedBlocks: ["core/quote", "core/image"]
            },
            // Use this property to add extra props to the container, content or background divs.
            extra_props: {
                container: {
                    id: "my_id",
                    className: "my_container_class another_class"
                },
                content: {},
                background: { className: "my_bg_class", style: { opacity: 0.5 } }
            },
            // This is the list of all the available properties and their default values.
            // Settings are opt-in so only the ones that are passed will be used.
            // If an empty object is passed (for example, background_color:{}) the default values will apply.
            // Set the "show_control" property to false if you want to apply the setting
            // with the default value but hide the control from the editor.
            settings: {
                align: {
                    default: "",
                    options: ["left", "center", "right", "wide", "full"]
                },
                content_align: {
                    show_control: true,
                    default: "center"
                },
                background_color: {
                    show_control: true,
                    default: "",
                    colors: [
                        { name: "banana", color: "#ffdead" },
                        { name: "melon", color: "#aae6bd" },
                        { name: "melocoton", color: "#ffc5b4" },
                        { name: "pistacho", color: "#bdb76b" },
                        { name: "ciruela", color: "#bd8f8f" },
                        { name: "naranja", color: "#ff7f50" },
                        { name: "endrina", color: "#708090" },
                        { name: "black", color: "#000000" },
                        { name: "white", color: "#ffffff" }
                    ]
                },
                background_image: {},
                background_color_opacity: {
                    show_control: true,
                    default: 50,
                    min: 0,
                    max: 100
                },
                content_maxwidth: {
                    show_control: true,
                    default: 800,
                    min: 300,
                    max: 1300
                },
                border_color: {
                    show_control: true,
                    default: "",
                    colors: [
                        { name: "black", color: "#000000" },
                        { name: "white", color: "#ffffff" }
                    ]
                },
                border_color_opacity: {
                    show_control: true,
                    default: 15,
                    min: 0,
                    max: 100
                },
                border_width: {
                    show_control: true,
                    default: 0
                },
                shadow_color: {
                    show_control: true,
                    default: "",
                    colors: [
                        { name: "black", color: "#000000" },
                        { name: "white", color: "#ffffff" }
                    ]
                },
                shadow_color_opacity: {
                    show_control: true,
                    default: 15,
                    min: 0,
                    max: 100
                },
                shadow_width: {
                    show_control: true,
                    default: 0
                },
                // There are several sets of padding settings which can be combined.
                // For example: padding_top, padding_bottom and padding_leftright.
                padding: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 100
                },
                padding_top: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 200
                },
                padding_bottom: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 200
                },
                padding_left: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 100
                },
                padding_right: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 100
                },
                padding_topbottom: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 200
                },
                padding_leftright: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 100
                },
                // These paddings will apply to screens smaller than 600px in width.
                // They are meant to override the previous paddings (over this comment).
                padding_small_screen: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 100
                },
                padding_top_small_screen: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 200
                },
                padding_bottom_small_screen: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 200
                },
                padding_left_small_screen: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 100
                },
                padding_right_small_screen: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 100
                },
                padding_topbottom_small_screen: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 200
                },
                padding_leftright_small_screen: {
                    show_control: true,
                    default: 20,
                    min: 0,
                    max: 100
                }
            },
            // This property is experimental. If you need to migrate the block to a new version,
            // because either the "settings" or the "extra_props" objects changed,
            // you need to pass those objects as they were before the change, inside an object.
            // Then wrap all the different versions inside an array.
            deprecated: [
                {
                    // Old version of the block. Both extra_props and settings changed.
                    extra_props: {
                        // ...
                    },
                    settings: {
                        // ...
                    }
                },
                {
                    // Another old version of the block. Only settings changed.
                    settings: {
                        // ...
                    }
                }
            ]
        });
    });

== Credits ==

Images from the readme banner and screenshots belong to [Sander Wehkamp](https://unsplash.com/@sanderwehkamp).

== Changelog ==

= 1.0.0 =
* Initial release.
