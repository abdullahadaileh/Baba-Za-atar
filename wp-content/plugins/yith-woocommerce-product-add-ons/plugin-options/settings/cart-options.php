<?php
/**
 * Cart settings Tab
 *
 * @author  YITH <plugins@yithemes.com>
 * @package YITH\ProductAddOns
 * @version 4.0.0
 */

defined( 'YITH_WAPO' ) || exit; // Exit if accessed directly.

$cart_settings = array(

    'settings-cart' => array(
        'cart-order'                     => array(
            'id'    => 'yith-wapo-cart-order',
            // translators: [ADMIN] General Settings tab title.
            'title' => __( 'Cart & Order options', 'yith-woocommerce-product-add-ons' ),
            'type'  => 'title',
            'desc'  => '',
        ),

        'show-options-in-cart-page'      => array(
            'id'        => 'yith_wapo_show_options_in_cart',
            // translators: [ADMIN] General Settings > Cart & Order sub-tab option
            'name'      => __( 'Show options in the cart', 'yith-woocommerce-product-add-ons' ),
            // translators: [ADMIN] General Settings > Cart & Order sub-tab option (description)
            'desc'      => __( 'Enable to show the details of the options in the cart.', 'yith-woocommerce-product-add-ons' ),
            'type'      => 'yith-field',
            'yith-type' => 'onoff',
            'default'   => 'yes',
        ),
        'allow-edit-in-cart'      => array(
            'id'        => 'yith_wapo_allow_edit_in_cart',
            // translators: [ADMIN] General Settings > Cart & Order sub-tab option
            'name'      => __( 'Allow options editing in the cart', 'yith-woocommerce-product-add-ons' ),
            // translators: [ADMIN] General Settings > Cart & Order sub-tab option (description)
            'desc'      => __( 'Enable this option to allow users to edit options directly in the cart.', 'yith-woocommerce-product-add-ons' ),
            'type'      => 'yith-field',
            'yith-type' => 'onoff',
            'default'   => 'no',
            'deps'      => array(
                'id'    => 'yith_wapo_show_options_in_cart',
                'value' => 'yes',
                'type'  => 'fade',
            ),
            'is_option_disabled' => true,
            'option_tags'        => array( 'premium' ),
        ),
        'show-replacement-image-in-cart' => array(
            'id'        => 'yith_wapo_show_image_in_cart',
            // translators: [ADMIN] General Settings > Cart & Order sub-tab option
            'name'      => __( 'Show the replacement image in the cart', 'yith-woocommerce-product-add-ons' ),
            // translators: [ADMIN] General Settings > Cart & Order sub-tab option (description)
            'desc'      => __( 'Enable to replace the product image with the option image in the cart.', 'yith-woocommerce-product-add-ons' ),
            'type'      => 'yith-field',
            'yith-type' => 'onoff',
            'default'   => 'no',
        ),

        'hide-options-in-order-email'    => array(
            'id'        => 'yith_wapo_hide_options_in_order_email',
            //translators: [ADMIN] General Settings > Cart & Order sub-tab option
            'name'      => __( 'Hide options in the order email', 'yith-woocommerce-product-add-ons' ),
            //translators: [ADMIN] General Settings > Cart & Order sub-tab option (description)
            'desc'      => __( 'Enable to hide the options in the order email.', 'yith-woocommerce-product-add-ons' ),
            'type'      => 'yith-field',
            'yith-type' => 'onoff',
            'default'   => 'no',
        ),

        'cart-order-end'                 => array(
            'id'   => 'yith-wapo-cart-order',
            'type' => 'sectionend',
        ),
    )

);

return apply_filters( 'yith_wapo_cart_options_array', $cart_settings );