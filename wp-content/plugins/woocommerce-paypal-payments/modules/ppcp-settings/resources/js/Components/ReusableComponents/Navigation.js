import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Navigation = ( {
	setStep,
	setCompleted,
	currentStep,
	stepperOrder,
	canProceeedCallback = () => true,
} ) => {
	const navigateBy = ( stepDirection ) => {
		let newStep = currentStep + stepDirection;

		if ( isNaN( newStep ) || newStep < 0 ) {
			console.warn( 'Invalid next step:', newStep );
			newStep = 0;
		}

		if ( newStep >= stepperOrder.length ) {
			setCompleted( true );
		} else {
			setStep( newStep );
		}
	};

	return (
		<div className="ppcp-r-navigation">
			<Button variant="tertiary" onClick={ () => navigateBy( -1 ) }>
				{ __( 'Back', 'woocommerce-paypal-payments' ) }
			</Button>
			<Button
				variant="primary"
				disabled={ ! canProceeedCallback() }
				onClick={ () => navigateBy( 1 ) }
			>
				{ __( 'Next', 'woocommerce-paypal-payments' ) }
			</Button>
		</div>
	);
};

export default Navigation;
