import PaymentMethodModal from '../../../ReusableComponents/PaymentMethodModal';
import { __ } from '@wordpress/i18n';
import { ToggleControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

const ModalPayPal = ( { setModalIsVisible } ) => {
	const [ paypalSettings, setPaypalSettings ] = useState( {
		checkoutPageTitle: 'PayPal',
		checkoutPageDescription: 'Pay via PayPal',
		showLogo: false,
	} );

	const updateFormValue = ( key, value ) => {
		setPaypalSettings( { ...paypalSettings, [ key ]: value } );
	};

	return (
		<PaymentMethodModal
			setModalIsVisible={ setModalIsVisible }
			icon="payment-method-paypal"
			container="small"
			title={ __( 'PayPal', 'woocommerce-paypal-payments' ) }
		>
			<div className="ppcp-r-modal__field-rows">
				<div className="ppcp-r-modal__field-row">
					<label htmlFor="ppcp-r-paypal-settings-checkout-title">
						{ __(
							'Checkout page title',
							'woocommerce-paypal-payments'
						) }
					</label>
					<input
						type="text"
						id="ppcp-r-paypal-settings-checkout-title"
						value={ paypalSettings.checkoutPageTitle }
						onInput={ ( e ) =>
							updateFormValue(
								'checkoutPageTitle',
								e.target.value
							)
						}
					/>
				</div>
				<div className="ppcp-r-modal__field-row">
					<label htmlFor="ppcp-r-paypal-settings-checkout-page-description">
						{ __(
							'Checkout page description',
							'woocommerce-paypal-payments'
						) }
					</label>
					<input
						type="text"
						id="ppcp-r-paypal-settings-checkout-page-description"
						value={ paypalSettings.checkoutPageDescription }
						onInput={ ( e ) =>
							updateFormValue(
								'checkoutPageDescription',
								e.target.value
							)
						}
					/>
				</div>
				<div className="ppcp-r-modal__field-row">
					<ToggleControl
						className="ppcp-r-modal__inverted-toggle-control"
						label={ __(
							'Show logo',
							'woocommerce-paypal-payments'
						) }
						id="ppcp-r-paypal-settings-show-logo"
						checked={ paypalSettings.showLogo }
						onChange={ ( newValue ) => {
							updateFormValue( 'showLogo', newValue );
						} }
					/>
				</div>
				<div className="ppcp-r-modal__field-row ppcp-r-modal__field-row--save">
					<Button variant="primary">
						{ __( 'Save changes', 'woocommerce-paypal-payments' ) }
					</Button>
				</div>
			</div>
		</PaymentMethodModal>
	);
};

export default ModalPayPal;
