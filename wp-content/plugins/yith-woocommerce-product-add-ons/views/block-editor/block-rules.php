<?php
/**
 * Block Rules Template
 *
 * @author  YITH <plugins@yithemes.com>
 * @package YITH\ProductAddOns
 * @version 2.0.0
 *
 * @var YITH_WAPO_Block $block
 */

defined( 'YITH_WAPO' ) || exit; // Exit if accessed directly.

$show_in                 = $block->get_rule( 'show_in' );

$show_show_in_products   = ( 'categories' !== $show_in && 'all' !== $show_in && '' !== $show_in ) || isset( $_REQUEST['block_rule_show_in'] ) && 'products' === $_REQUEST['block_rule_show_in']; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$show_show_in_categories = 'categories' === $show_in;

$show_exclude_products            = 'all' === $show_in || 'products' === $show_in || 'categories' === $show_in;
$show_exclude_products_products   = $block->get_rule( 'exclude_products' ) === 'yes';
$show_exclude_products_categories = $block->get_rule( 'exclude_products' ) === 'yes';

?>

<div id="block-rules">

	<!-- Option field -->
	<div class="field-wrap">
		<label for="yith-wapo-block-rule-show-in"><?php
            // translators: [ADMIN] Edit block page
            echo esc_html__( 'Show this block of options in', 'yith-woocommerce-product-add-ons' ); ?>:</label>
		<div class="field block-option">
			<?php

                $block_rule_show_in = 'all';

                if ( ! empty( $block->get_rule( 'show_in' ) ) ) {
                    $block_rule_show_in = $block->get_rule( 'show_in' );
                } elseif ( isset( $_REQUEST['block_rule_show_in'] ) && ! empty( $_REQUEST['block_rule_show_in'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                    $block_rule_show_in = $_REQUEST['block_rule_show_in']; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                }


				yith_plugin_fw_get_field(
					array(
						'id'      => 'yith-wapo-block-rule-show-in',
						'name'    => 'block_rule_show_in',
						'type'    => 'select',
						'value'   => $block_rule_show_in,
						'options' => array(
                            // translators: [ADMIN] Edit block page
							'all'      => __( 'All products', 'yith-woocommerce-product-add-ons' ),
                            // translators: [ADMIN] Edit block page
                            'products' => __( 'Specific products or categories', 'yith-woocommerce-product-add-ons' ),
						),
						'default' => 'all',
						'class'   => 'wc-enhanced-select',
					),
					true
				);
				?>
			<span class="description"><?php
                // translators: [ADMIN] Edit block page
                echo esc_html__( 'Choose to show these options in all products or only specific products or categories.', 'yith-woocommerce-product-add-ons' ); ?></span>
		</div>
	</div>
	<!-- End option field -->

	<!-- Option field -->
	<div class="field-wrap yith-wapo-block-rule-show-in-products" style="<?php echo $show_show_in_products ? '' : 'display: none;'; ?>">
		<label for="yith-wapo-block-rule-show-in-products">
            <?php
            // translators: [ADMIN] Edit block page.
            echo esc_html__( 'Show in products',  'yith-woocommerce-product-add-ons' ); ?>:</label>
		<div class="field block-option">
			<?php
            $show_in_products = $block->get_rule( 'show_in_products' );

            if ( empty( $show_in_products ) && isset( $_REQUEST['block_rule_show_in_products'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                $show_in_products = is_string( $_REQUEST['block_rule_show_in_products'] ) ? // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                    preg_match('~[0-9]+~', $_REQUEST['block_rule_show_in_products']) ? // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                    explode(',', stripslashes( str_replace( array( '[', ']', '"', "\'" ), '', $_REQUEST['block_rule_show_in_products'] ) ) ) : '' // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                        : $_REQUEST['block_rule_show_in_products']; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            }
				yith_plugin_fw_get_field(
					array(
						'id'       => 'yith-wapo-block-rule-show-in-products',
						'name'     => 'block_rule_show_in_products',
						'type'     => 'ajax-products',
						'multiple' => true,
						'value'    => $show_in_products,
						'data'     => array(
							'action'   => 'woocommerce_json_search_products_and_variations',
							'security' => wp_create_nonce( 'search-products' ),
							'limit'    => apply_filters( 'yith_wapo_show_in_products_limit', 30 ),
						),
					),
					true
				);
				?>
			<span class="description"><?php
                // translators: [ADMIN] Edit block page.
                echo esc_html__( 'Choose in which products to show this block.', 'yith-woocommerce-product-add-ons' ); ?></span>
		</div>
	</div>
	<!-- End option field -->

	<!-- Option field -->
	<div class="field-wrap yith-wapo-block-rule-show-in-products" style="<?php echo $show_show_in_products ? '' : 'display: none;'; ?>">
		<label for="yith-wapo-block-rule-show-in-categories"><?php
            // translators: [ADMIN] Edit block page
            echo esc_html__( 'Show in categories',  'yith-woocommerce-product-add-ons' ); ?>:</label>
		<div class="field block-option">
			<?php
            $show_in_categories = $block->get_rule( 'show_in_categories' );

            if ( empty( $show_in_categories ) && isset( $_REQUEST['block_rule_show_in_categories'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                $show_in_categories = is_string( $_REQUEST['block_rule_show_in_categories'] ) ? // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                    preg_match('~[0-9]+~', $_REQUEST['block_rule_show_in_categories']) ? // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                        explode(',', stripslashes( str_replace( array( '[', ']', '"', "\'" ), '', $_REQUEST['block_rule_show_in_categories'] ) ) ) : '' // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                    : $_REQUEST['block_rule_show_in_categories']; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            }
				yith_plugin_fw_get_field(
					array(
						'id'       => 'yith-wapo-block-rule-show-in-categories',
						'name'     => 'block_rule_show_in_categories',
						'type'     => 'ajax-terms',
						'multiple' => true,
						'value'    => $show_in_categories,
						'data'     => array(
                            // translators: [ADMIN] Edit block page
                            'placeholder' => __( 'Search for categories', 'yith-woocommerce-product-add-ons' ) . '&hellip;',
							'taxonomy'    => 'product_cat',
						),
					),
					true
				);
				?>
			<span class="description">
                <?php
                // translators: [ADMIN] Edit block page
                echo esc_html__( 'Choose in which product categories to show this block.', 'yith-woocommerce-product-add-ons' ); ?></span>
		</div>
	</div>
	<!-- End option field -->

    <!-- Option field -->
    <div class="field-wrap yith-wapo-block-rule-show-to-option">
        <label for="yith-wapo-block-rule-show-to"><?php
            // translators: [ADMIN] Edit block page
            echo esc_html__( 'Show options to', 'yith-woocommerce-product-add-ons' ); ?>:</label>
        <div class="field block-option">
            <?php
            $block_rule_show_to    = 'all';
            $show_to_options_array = array(
                // translators: [ADMIN] Edit block page
                'all'          => __( 'All users', 'yith-woocommerce-product-add-ons' ),
                // translators: [ADMIN] Edit block page
                'guest_users'  => __( 'Only to guest users', 'yith-woocommerce-product-add-ons' ) . ' ' . yith_wapo_print_premium_badge_fw(false, 'small' ),
                // translators: [ADMIN] Edit block page
                'logged_users' => __( 'Only to logged-in users', 'yith-woocommerce-product-add-ons' ) . ' ' . yith_wapo_print_premium_badge_fw(false, 'small' ),
                // translators: [ADMIN] Edit block page
                'user_roles'   => __( 'Only to specified user roles', 'yith-woocommerce-product-add-ons' ) . ' ' . yith_wapo_print_premium_badge_fw(false, 'small' ),
            );
            $disabled_show_to_options_array = array(
                // translators: [ADMIN] Edit block page
                'guest_users',
                // translators: [ADMIN] Edit block page
                'logged_users',
                // translators: [ADMIN] Edit block page
                'user_roles'
            )
            ?>
                <?php
                yith_plugin_fw_get_field(
                    array(
                        'id'      => 'yith-wapo-block-rule-show-to',
                        'name'    => 'block_rule_show_to',
                        'type'    => 'select',
                        'value'   => $block_rule_show_to,
                        'options' => $show_to_options_array,
                        'disabled_options' => $disabled_show_to_options_array,
                        'default' => 'all',
                        //'class'   => 'wc-enhanced-select', Managed from admin.js to allow HTML with escapeMarkup parameter.
                    ),
                    true
                );
                ?>

            <span class="description"><?php
                // translators: [ADMIN] Edit block page
                echo esc_html__( 'Choose to show these options to all users, or only to specific user roles or members of a membership plan.', 'yith-woocommerce-product-add-ons' ); ?></span>
        </div>
    </div>
    <!-- End option field -->

</div>
