<?php
/**
 * Plugin Name: Melonpan Block - Container
 * Plugin URI: https://wordpress.org/plugins/melonpan-block-container/
 * Description: Container block with settings, that can have other blocks nested.
 * Author: melonpan
 * Version: 1.3.0
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

namespace MELONPANBLOCKCONTAINER;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! defined( __NAMESPACE__ . '\PLUGIN_VERSION' ) ) {
	define( __NAMESPACE__ . '\PLUGIN_VERSION', '1.3.0' );
}
if ( ! defined( __NAMESPACE__ . '\PLUGIN_NAME' ) ) {
	define( __NAMESPACE__ . '\PLUGIN_NAME', 'melonpan-block-container' );
}
if ( ! defined( __NAMESPACE__ . '\BUILD_DIR' ) ) {
	define( __NAMESPACE__ . '\BUILD_DIR', plugins_url( 'build/', __FILE__ ) );
}

/**
 * Enqueue the plugin style in the front page.
 *
 * @since 1.0.0
 */
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_front' );
function enqueue_front() {

	wp_enqueue_style(
		PLUGIN_NAME . '-front',
		BUILD_DIR . PLUGIN_NAME . '-front.css',
		array(),
		PLUGIN_VERSION
	);
}

/**
 * Enqueue the plugin styles and scripts in the editor.
 *
 * @since 1.0.0
 */
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_editor', 900 );
function enqueue_editor() {

	global $wp_scripts;

	wp_enqueue_style(
		PLUGIN_NAME . '-editor',
		BUILD_DIR . PLUGIN_NAME . '-editor.css',
		array(),
		PLUGIN_VERSION
	);

	wp_enqueue_script(
		PLUGIN_NAME . '-editor',
		BUILD_DIR . PLUGIN_NAME . '-editor.js',
		array(
			'lodash',
			'wp-blocks',
			// If wp-block-editor is registered (from WP 5.2)
			// enqueue it. Otherwise enqueue wp-editor.
			isset( $wp_scripts->registered['wp-block-editor'] )
				? 'wp-block-editor'
				: 'wp-editor',
			'wp-components',
			'wp-compose',
			'wp-data',
			'wp-element',
			'wp-hooks',
			'wp-i18n',
		),
		PLUGIN_VERSION,
		true // Enqueue in the footer.
	);
}
