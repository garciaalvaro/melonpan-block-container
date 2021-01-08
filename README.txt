=== Melonpan Block - Container ===
Contributors: melonpan
Tags: gutenberg, blocks, editor, container, innerblocks
Requires at least: 5.2
Tested up to: 5.3
Stable tag: 1.3.1
Requires PHP: 7.1
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Block that provides a container, with styling features, which can have other blocks nested.


== Description ==

[Demo](https://gutenberg-showcase.melonpan.io/melonpan-block-container) - [Documentation](https://melonpan.io/gutenberg-blocks/melonpan-block-container) - [GitHub](https://github.com/garciaalvaro/melonpan-block-container)

Block that provides a container, with styling features, which can have other blocks nested.


== Features ==

The block comes with the following settings:

* Background image, fixed, color & opacity
* Content align, max-width, text color
* Border width, color & opacity
* Shadow width, color & opacity
* Padding top, bottom, left, right, responsive paddings


== Plugin developers ==

The plugin comes with a filter to register your own block based on this one. Check the [documentation](https://melonpan.io/gutenberg-blocks/melonpan-block-container/registering-a-custom-block) to see how to use it.


== Screenshots ==

1. Block edit panel
2. Block options


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


== Changelog ==

= 1.3.1 =
* Upgraded dependencies.

= 1.3.0 =
* Refactored code base.
* Minor bug fixes.

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

Screenshot background image belongs to [Charles Postiaux](https://unsplash.com/@charlpost).
