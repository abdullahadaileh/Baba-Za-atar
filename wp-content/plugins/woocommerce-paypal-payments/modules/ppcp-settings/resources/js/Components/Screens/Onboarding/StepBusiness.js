import OnboardingHeader from '../../ReusableComponents/OnboardingHeader';
import SelectBoxWrapper from '../../ReusableComponents/SelectBoxWrapper';
import SelectBox from '../../ReusableComponents/SelectBox';
import { __ } from '@wordpress/i18n';
import PaymentMethodIcons from '../../ReusableComponents/PaymentMethodIcons';
import { useOnboardingStepBusiness } from '../../../data';
import Navigation from '../../ReusableComponents/Navigation';
import { BUSINESS_TYPES } from '../../../data/constants';

const BUSINESS_RADIO_GROUP_NAME = 'business';

const StepBusiness = ( {
	setStep,
	currentStep,
	stepperOrder,
	setCompleted,
} ) => {
	const { isCasualSeller, setIsCasualSeller } = useOnboardingStepBusiness();

	const handleSellerTypeChange = ( value ) => {
		setIsCasualSeller( BUSINESS_TYPES.CASUAL_SELLER === value );
	};

	const getCurrentValue = () => {
		if ( isCasualSeller === null ) {
			return '';
		}

		return isCasualSeller
			? BUSINESS_TYPES.CASUAL_SELLER
			: BUSINESS_TYPES.BUSINESS;
	};

	return (
		<div className="ppcp-r-page-business">
			<OnboardingHeader
				title={ __(
					'Tell Us About Your Business',
					'woocommerce-paypal-payments'
				) }
			/>
			<div className="ppcp-r-inner-container">
				<SelectBoxWrapper>
					<SelectBox
						title={ __(
							'Casual Seller',
							'woocommerce-paypal-payments'
						) }
						description={ __(
							'I sell occasionally and mainly use PayPal for personal transactions.',
							'woocommerce-paypal-payments'
						) }
						icon="icon-business-casual-seller.svg"
						name={ BUSINESS_RADIO_GROUP_NAME }
						value={ BUSINESS_TYPES.CASUAL_SELLER }
						changeCallback={ handleSellerTypeChange }
						currentValue={ getCurrentValue() }
						checked={ isCasualSeller === true }
						type="radio"
					>
						<PaymentMethodIcons
							icons={ [
								'paypal',
								'venmo',
								'visa',
								'mastercard',
								'amex',
								'discover',
							] }
						/>
					</SelectBox>
					<SelectBox
						title={ __(
							'Business',
							'woocommerce-paypal-payments'
						) }
						description={ __(
							'I run a registered business and sell full-time.',
							'woocommerce-paypal-payments'
						) }
						icon="icon-business-business.svg"
						name={ BUSINESS_RADIO_GROUP_NAME }
						value={ BUSINESS_TYPES.BUSINESS }
						changeCallback={ handleSellerTypeChange }
						currentValue={ getCurrentValue() }
						checked={ isCasualSeller === false }
						type="radio"
					>
						<PaymentMethodIcons
							icons={ [
								'paypal',
								'venmo',
								'visa',
								'mastercard',
								'amex',
								'discover',
								'apple-pay',
								'google-pay',
								'ideal',
							] }
						/>
					</SelectBox>
				</SelectBoxWrapper>
				<Navigation
					setStep={ setStep }
					currentStep={ currentStep }
					stepperOrder={ stepperOrder }
					setCompleted={ setCompleted }
					canProceeedCallback={ () => isCasualSeller !== null }
				/>
			</div>
		</div>
	);
};

export default StepBusiness;
