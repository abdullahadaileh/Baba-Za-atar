<?php

/**
 * @see http://tgmpluginactivation.com/configuration/ for detailed documentation.
 *
 * @package    TGM-Plugin-Activation
 * @subpackage Example
 * @version    2.6.1 for parent theme Bakery and Pastry for publication on WordPress.org
 * @author     Thomas Griffin, Gary Jones, Juliette Reinders Folmer
 * @copyright  Copyright (c) 2011, Thomas Griffin
 * @license    http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 * @link       https://github.com/TGMPA/TGM-Plugin-Activation
 */

require_once get_template_directory() . '/inc/tgm/class-tgm-plugin-activation.php';

add_action('tgmpa_register', 'bakery_and_pastry_register_required_plugins', 0);
function bakery_and_pastry_register_required_plugins()
{
	$plugins = array(
		array(
			'name'      => 'Superb Addons',
			'slug'      => 'superb-blocks',
			'required'  => false,
		),
	);

	$config = array(
		'id'           => 'bakery-and-pastry',
		'default_path' => '',
		'menu'         => 'tgmpa-install-plugins',
		'has_notices'  => true,
		'dismissable'  => true,
		'dismiss_msg'  => '',
		'is_automatic' => true,
		'message'      => '',
	);

	tgmpa($plugins, $config);
}


function bakery_and_pastry_pattern_styles()
{
	wp_enqueue_style('bakery-and-pastry-patterns', get_template_directory_uri() . '/assets/css/patterns.css', array(), filemtime(get_template_directory() . '/assets/css/patterns.css'));
	if (is_admin()) {
		global $pagenow;
		if ('site-editor.php' === $pagenow) {
			// Do not enqueue editor style in site editor
			return;
		}
		wp_enqueue_style('bakery-and-pastry-editor', get_template_directory_uri() . '/assets/css/editor.css', array(), filemtime(get_template_directory() . '/assets/css/editor.css'));
	}
}
add_action('enqueue_block_assets', 'bakery_and_pastry_pattern_styles');


add_theme_support('wp-block-styles');

// Removes the default wordpress patterns
add_action('init', function () {
	remove_theme_support('core-block-patterns');
});

// Register customer Bakery and Pastry pattern categories
function bakery_and_pastry_register_block_pattern_categories()
{
	register_block_pattern_category(
		'header',
		array(
			'label'       => __('Header', 'bakery-and-pastry'),
			'description' => __('Header patterns', 'bakery-and-pastry'),
		)
	);
	register_block_pattern_category(
		'call_to_action',
		array(
			'label'       => __('Call To Action', 'bakery-and-pastry'),
			'description' => __('Call to action patterns', 'bakery-and-pastry'),
		)
	);
	register_block_pattern_category(
		'content',
		array(
			'label'       => __('Content', 'bakery-and-pastry'),
			'description' => __('Bakery and Pastry content patterns', 'bakery-and-pastry'),
		)
	);
	register_block_pattern_category(
		'teams',
		array(
			'label'       => __('Teams', 'bakery-and-pastry'),
			'description' => __('Team patterns', 'bakery-and-pastry'),
		)
	);
	register_block_pattern_category(
		'banners',
		array(
			'label'       => __('Banners', 'bakery-and-pastry'),
			'description' => __('Banner patterns', 'bakery-and-pastry'),
		)
	);
	register_block_pattern_category(
		'contact',
		array(
			'label'       => __('Contact', 'bakery-and-pastry'),
			'description' => __('Contact patterns', 'bakery-and-pastry'),
		)
	);
	register_block_pattern_category(
		'layouts',
		array(
			'label'       => __('Layouts', 'bakery-and-pastry'),
			'description' => __('layout patterns', 'bakery-and-pastry'),
		)
	);
	register_block_pattern_category(
		'testimonials',
		array(
			'label'       => __('Testimonial', 'bakery-and-pastry'),
			'description' => __('Testimonial and review patterns', 'bakery-and-pastry'),
		)
	);

}

add_action('init', 'bakery_and_pastry_register_block_pattern_categories');


// Initialize information content
require_once trailingslashit(get_template_directory()) . 'inc/vendor/autoload.php';

use SuperbThemesThemeInformationContent\ThemeEntryPoint;

ThemeEntryPoint::init([
	'theme_url' => 'https://superbthemes.com/bakery-and-pastry/',
	'demo_url' => 'https://superbthemes.com/demo/bakery-and-pastry/'
]);
