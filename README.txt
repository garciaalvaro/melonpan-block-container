=== Melonpan Block - Container ===
Contributors: melonpan
Tags: gutenberg, blocks, editor, container, innerblocks
Requires at least: 5.1
Tested up to: 5.2
Stable tag: 1.2.0
Requires PHP: 7.1
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Container block with settings, that can have other blocks nested.

== Description ==

This plugin provides a container block which can have other blocks nested. It comes with the following settings:

* Background image, fixed, color & opacity
* Content align, max-width, text color
* Border width, color & opacity
* Shadow width, color & opacity
* Padding top, bottom, left, right, responsive paddings

Developers: The plugin comes with a filter to register your own block based on this one. Check the *How can I use the filter to register my own block?* section for more info.

[GitHub repository](https://github.com/garciaalvaro/melonpan-block-container)


== Screenshots ==

1. Block edit panel.


== Usage ==

The block can be found inside the blocks inserter menu under the *Melonpan Blocks* category.
Once added in the post you can edit its settings and add blocks inside (you may even add a container).


== Installation ==

Installation from the WordPress admin.

1. Log in to the WordPress admin and navigate to *Plugins > Add New*.
2. Type *Melonpan Block - Container* in the Search field.
3. In the results list *Melonpan Block - Container* plugin should appear, click **Install Now** button.
4. Once it finished installing, click the *Activate* button.
5. That's it, now you can go to any post where Gutenberg is enabled and start using the block.


== Frequently Asked Questions ==

= Registering a custom block =

The plugin comes with a filter that lets you register your own block type extending this one. This way your block can make use of the plugin settings and controls.

**Notes**
You can choose from the available settings, listed below, and assign the block’s InnerBlocks properties to customize it.
You may also pass your own attributes, inside the **custom** attribute. For more info check *Adding a custom attribute*.

**Steps**
First, [enqueue your script in the editor](https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/javascript/loading-javascript/).
The script needs to have *'wp-hooks'* as a dependency.

Inside your script call the filter in the following way (make sure *Melonpan Block - Container* plugin is active):

    // Custom block registration example using the filter.
    wp.hooks.addFilter("melonpanBlockContainer.createBlock", "my-plugin/my-block", blocks => {
        return blocks.concat({
            // Default block registration properties. For more available properties:
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
                // For more info check the section "Adding a custom attribute".
                custom: {
                    example_attribute_name: { default: "value_A" },
                    another_example_attribute_name: { default: true }
                },
                align: {
                    default: "",
                    options: ["left", "center", "right", "wide", "full"]
                },
                content_align: {
                    show_control: true,
                    default: "center"
                },
                content_maxwidth: {
                    show_control: true,
                    default: 800,
                    min: 300,
                    max: 1300
                },
				content_color: {
					show_control: true,
					default: "",
					colors: [
						{ name: "black", color: "#000000" },
						{ name: "white", color: "#ffffff" }
					]
				},
                background_color: {
                    show_control: true,
                    default: "",
                    colors: [
                        { name: "banana", color: "#fce198" },
                        { name: "sandia", color: "#f68c78" },
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
				background_fixed: {
					show_control: true,
                    default: false
                },
                background_color_opacity: {
                    show_control: true,
                    default: 50,
                    min: 0,
                    max: 100
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
                // The following paddings will apply to screens smaller
                // than 600px in width, overriding the previous paddings.
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
            // Experimental: If you need to update the block to a new version
            // because either the "settings" or the "extra_props" objects changed,
            // pass those objects as they were before the change, inside an object.
            // Then wrap all the different versions inside an array.
            deprecated: [
                {
                    // Old version of the block.
                    extra_props: {
                        // ...
                    },
                    settings: {
                        // ...
                    }
                },
                {
                    // Another old version of the block.
                    extra_props: {
                        // ...
                    },
                    settings: {
                        // ...
                    }
                }
            ]
        });
    });


= Adding a custom attribute =

You may include custom attributes, when creating a block type through the plugins filter.
This setting is meant to be a helper that adds a class with the name and value of the attribute.
One of the advantages of using it rather than using the *blocks.registerBlockType* filter is that it should work if you need to deprecate the attribute.
Keep in mind that it will simply add a class in the **.mbc-container** div, and that a *string*, *number* or *boolean* value can be used.

**string or number**
If the attribute is a *string* or *number* the class will include the name and the value (example_attribute_name => **.mbc-example_attribute_name-the_value**).

**boolean**
If the attribute is a *boolean* the class will include the name and *enabled* or *disabled* (example_attribute_name => **.mbc-example_attribute_name-enabled**).


= Adding a control to a custom attribute =

To add a control for your custom attribute use Gutenberg filters. Remember to remove the control if you deprecate the attribute.
Here is an example of adding a control:

    const { __ } = wp.i18n;
    const { Fragment } = wp.element;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, RadioControl } = wp.components;

    const withMyAttributeControl = wp.compose.createHigherOrderComponent(BlockEdit => {
        return props => {
            if (props.name !== "my-plugin/my-block") {
                return <BlockEdit {...props} />;
            }

            const { setAttributes, attributes } = props;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={__("My Panel")}>
                            <RadioControl
                                label={__("My attribute")}
                                selected={attributes.custom.example_attribute_name}
                                options={[
                                    {
                                        value: "value_A",
                                        label: "Value A"
                                    },
                                    {
                                        value: "value_B",
                                        label: "Value B"
                                    }
                                ]}
                                onChange={value =>
                                    setAttributes({
                                        custom: {
                                            // Its important to pass the whole object.
                                            ...attributes.custom,
                                            example_attribute_name: value
                                        }
                                    })
                                }
                            />
                        </PanelBody>
                    </InspectorControls>
                    <BlockEdit {...props} />
                </Fragment>
            );
        };
    }, "withMyAttributeControl");

    wp.hooks.addFilter(
        "editor.BlockEdit",
        "my-plugin/my-filter",
        withMyAttributeControl
    );


== Changelog ==

= 1.2.0 =
* Added ButtonBlockAppender in block InnerBlocks, for future WordPress version.
* Fixed dependencies. Use wp-block-editor instead of wp-editor if its available.
* Cleaned TypeScript types, code and tests.

= 1.1.1 =
* Fix bug for blocks created using the hook which had default colors assigned. In the colorpicker clicking clear to assign no color, saved undefined which was interpreted by the save function (after page reload) as the default value, thus throwing an incompatibility error.

= 1.1.0 =
* Improved code: Updated JS, added tests and migrated JS to Typescript.

= 1.0.1 =
* Fix bug where the color was empty but the class .mbc-has-color was still assigned.

= 1.0.0 =
* Initial release.


== Credits ==

Screenshot background image belongs to [Sander Wehkamp](https://unsplash.com/@sanderwehkamp).
