<?php
/**
 * WAPO Template
 *
 * @author  YITH <plugins@yithemes.com>
 * @package YITH\ProductAddOns
 * @version 2.0.0
 *
 * @var YITH_WAPO_Addon $addon
 * @var int $x
 * @var string $option_image
 * @var string $addon_image_position
 * @var string $images_height_style
 */

defined( 'YITH_WAPO' ) || exit; // Exit if accessed directly.

$attachment_id = wp_get_attachment_image( $option_image );
if ( is_numeric( $option_image ) ) {
    $image_url     = wp_get_attachment_image_url( $option_image, 'full' );
} else {
    $image_url     = $option_image;
}

$file_explode = explode('.', $image_url );
$file_type    = strtolower( end( $file_explode ) );

$option_image_alt = empty( $attachment_id ) ? '' : get_post_meta( $attachment_id, '_wp_attachment_image_alt', true );

if ( ! empty( $addon_image_position ) ) : ?>
<div class="image-container" for="yith-wapo-<?php echo esc_attr( $addon->id ); ?>-<?php echo esc_attr( $x ); ?>">
	<div class="image type-<?php echo esc_attr( $file_type ) ;?>">
		<img src="<?php echo esc_attr( $image_url ); ?>" style="<?php echo $images_height_style ?? '' ?>" alt="<?php echo esc_attr( $option_image_alt ); ?>">
	</div>
</div>
<?php endif; ?>
