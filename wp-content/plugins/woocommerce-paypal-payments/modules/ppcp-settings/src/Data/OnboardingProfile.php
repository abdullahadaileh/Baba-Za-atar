<?php
/**
 * Onboarding Profile class
 *
 * @package WooCommerce\PayPalCommerce\Settings\Data
 */

declare( strict_types = 1 );

namespace WooCommerce\PayPalCommerce\Settings\Data;

use RuntimeException;

/**
 * Class OnboardingProfile
 *
 * This class serves as a container for managing the onboarding profile details
 * within the WooCommerce PayPal Commerce plugin.
 *
 * This profile impacts the onboarding wizard and help to apply default
 * settings. The details here should not be used outside the onboarding process.
 */
class OnboardingProfile extends AbstractDataModel {

	/**
	 * Option key where profile details are stored.
	 *
	 * @var string
	 */
	protected const OPTION_KEY = 'woocommerce-ppcp-data-onboarding';

	/**
	 * List of customization flags, provided by the server (read-only).
	 *
	 * @var array
	 */
	protected array $flags = array();

	/**
	 * Constructor.
	 *
	 * @param bool $can_use_casual_selling Whether casual selling is enabled in the store's country.
	 * @param bool $can_use_vaulting       Whether vaulting is enabled in the store's country.
	 * @param bool $can_use_card_payments  Whether credit card payments are possible.
	 *
	 * @throws RuntimeException If the OPTION_KEY is not defined in the child class.
	 */
	public function __construct(
		bool $can_use_casual_selling = false,
		bool $can_use_vaulting = false,
		bool $can_use_card_payments = false
	) {
		parent::__construct();

		$this->flags['can_use_casual_selling'] = $can_use_casual_selling;
		$this->flags['can_use_vaulting']       = $can_use_vaulting;
		$this->flags['can_use_card_payments']  = $can_use_card_payments;
	}

	/**
	 * Get default values for the model.
	 *
	 * @return array
	 */
	protected function get_defaults() : array {
		return array(
			'completed'             => false,
			'step'                  => 0,
			'use_sandbox'           => false,
			'use_manual_connection' => false,
			'client_id'             => '',
			'client_secret'         => '',
			'is_casual_seller'      => null,
			'products'              => array(),
		);
	}

	// -----

	/**
	 * Gets the 'completed' flag.
	 *
	 * @return bool
	 */
	public function get_completed() : bool {
		return (bool) $this->data['completed'];
	}

	/**
	 * Sets the 'completed' flag.
	 *
	 * @param bool $step Whether the onboarding process has been completed.
	 */
	public function set_completed( bool $step ) : void {
		$this->data['completed'] = $step;
	}

	/**
	 * Gets the 'step' setting.
	 *
	 * @return int
	 */
	public function get_step() : int {
		return (int) $this->data['step'];
	}

	/**
	 * Sets the 'step' setting.
	 *
	 * @param int $step The current onboarding step.
	 */
	public function set_step( int $step ) : void {
		$this->data['step'] = $step;
	}

	/**
	 * Gets the 'use sandbox' setting.
	 *
	 * @return bool
	 */
	public function get_sandbox() : bool {
		return (bool) $this->data['use_sandbox'];
	}

	/**
	 * Sets the 'use sandbox' setting.
	 *
	 * @param bool $use_sandbox Whether to use sandbox mode.
	 */
	public function set_sandbox( bool $use_sandbox ) : void {
		$this->data['use_sandbox'] = $use_sandbox;
	}

	/**
	 * Gets the 'use manual connection' setting.
	 *
	 * @return bool
	 */
	public function get_manual_connection() : bool {
		return (bool) $this->data['use_manual_connection'];
	}

	/**
	 * Sets the 'use manual connection' setting.
	 *
	 * @param bool $use_manual_connection Whether to use manual connection.
	 */
	public function set_manual_connection( bool $use_manual_connection ) : void {
		$this->data['use_manual_connection'] = $use_manual_connection;
	}

	/**
	 * Gets the client ID.
	 *
	 * @return string
	 */
	public function get_client_id() : string {
		return $this->data['client_id'];
	}

	/**
	 * Sets the client ID.
	 *
	 * @param string $client_id The client ID.
	 */
	public function set_client_id( string $client_id ) : void {
		$this->data['client_id'] = sanitize_text_field( $client_id );
	}

	/**
	 * Gets the client secret.
	 *
	 * @return string
	 */
	public function get_client_secret() : string {
		return $this->data['client_secret'];
	}

	/**
	 * Sets the client secret.
	 *
	 * @param string $client_secret The client secret.
	 */
	public function set_client_secret( string $client_secret ) : void {
		$this->data['client_secret'] = sanitize_text_field( $client_secret );
	}

	/**
	 * Gets the casual seller flag.
	 *
	 * @return bool|null
	 */
	public function get_casual_seller() : ?bool {
		return $this->data['is_casual_seller'];
	}

	/**
	 * Sets the casual-seller flag.
	 *
	 * @param bool|null $casual_seller Whether the merchant uses a personal account for selling.
	 */
	public function set_casual_seller( ?bool $casual_seller ) : void {
		$this->data['is_casual_seller'] = $casual_seller;
	}

	/**
	 * Gets the active product types for this store.
	 *
	 * @return string[]
	 */
	public function get_products() : array {
		return $this->data['products'];
	}

	/**
	 * Sets the list of active product types.
	 *
	 * @param string[] $products Any of ['virtual'|'physical'|'subscriptions'].
	 */
	public function set_products( array $products ) : void {
		$this->data['products'] = $products;
	}

	/**
	 * Returns the list of read-only customization flags
	 *
	 * @return array
	 */
	public function get_flags() : array {
		return $this->flags;
	}
}
