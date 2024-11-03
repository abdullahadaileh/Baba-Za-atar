<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'falafel_db' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '&au5T_AUPP4sm8j|[);GF65$(N;@X4r426TN~(c|293VcX]+(eD|hFMbmL`?ECb<' );
define( 'SECURE_AUTH_KEY',  'cTc<!:L5J^F&C#l97Sl@flO$6VO%T3:4__:4}5FDOj)/>xI)<(TlB+.QSNJg{8^+' );
define( 'LOGGED_IN_KEY',    '<-7YcUKX*NB ~rzvj;qdy3-OO6>@O6IPUSr06LD}O9`/4DDJ]3orHkuL@;yL@<>Q' );
define( 'NONCE_KEY',        's[T`!gHNR1QYoW$66/Q4.bn)t^J71FFnG>>z~,M^vm_9ea-7K/6iI=.Ywv:E_<^w' );
define( 'AUTH_SALT',        'usGt2MtneJ`u=SKElr~(gq:I@#T}h}[]1YmHOR`Uk}F:I_L&-Ng)&?/RaPKAn.MV' );
define( 'SECURE_AUTH_SALT', '}3U{^NZVzkF8PfLoU[FY@R}ZpC95}=A^W>tJD^pjuu1jB?F&=KBQpXTVgUG%&0Fh' );
define( 'LOGGED_IN_SALT',   '< vh~n6{#AUm{BD@u>%70:AX.8ghv%,e}zW4eo{rVYkSmQ4iIV}8kKG94AI]ArsV' );
define( 'NONCE_SALT',       '%;h4]hK^JR_^j$U`z Nr!Zo?r[~RD%Za;%{x^?&o|B9Az9-[9u2J}Q*]LA$*0{`<' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
