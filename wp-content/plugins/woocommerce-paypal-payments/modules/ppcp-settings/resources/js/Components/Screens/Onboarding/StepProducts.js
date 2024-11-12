import OnboardingHeader from '../../ReusableComponents/OnboardingHeader';
import Navigation from '../../ReusableComponents/Navigation';
import { __ } from '@wordpress/i18n';
import SelectBox from '../../ReusableComponents/SelectBox';
import SelectBoxWrapper from '../../ReusableComponents/SelectBoxWrapper';
import { useOnboardingStepProducts } from '../../../data';
import { PRODUCT_TYPES } from '../../../data/constants';

const PRODUCTS_CHECKBOX_GROUP_NAME = 'products';

const StepProducts = ( {
	setStep,
	currentStep,
	stepperOrder,
	setCompleted,
} ) => {
	const { products, toggleProduct } = useOnboardingStepProducts();

	return (
		<div className="ppcp-r-page-products">
			<OnboardingHeader
				title={ __(
					'Tell Us About the Products You Sell',
					'woocommerce-paypal-payments'
				) }
			/>
			<div className="ppcp-r-inner-container">
				<SelectBoxWrapper>
					<SelectBox
						title={ __( 'Virtual', 'woocommerce-paypal-payments' ) }
						description={ __(
							'Digital items or services that don’t require shipping.',
							'woocommerce-paypal-payments'
						) }
						icon="icon-product-virtual.svg"
						name={ PRODUCTS_CHECKBOX_GROUP_NAME }
						value={ PRODUCT_TYPES.VIRTUAL }
						changeCallback={ toggleProduct }
						currentValue={ products }
						type="checkbox"
					>
						<ul className="ppcp-r-services">
							<li>
								{ __(
									'Services',
									'woocommerce-paypal-payments'
								) }
							</li>
							<li>
								{ __(
									'Downloadable',
									'woocommerce-paypal-payments'
								) }
							</li>
							<li>
								{ __(
									'Bookings',
									'woocommerce-paypal-payments'
								) }
							</li>
							<li>
								{ __(
									'Deposits',
									'woocommerce-paypal-payments'
								) }
							</li>
						</ul>
					</SelectBox>
					<SelectBox
						title={ __(
							'Physical Goods',
							'woocommerce-paypal-payments'
						) }
						description={ __(
							'Items that need to be shipped.',
							'woocommerce-paypal-payments'
						) }
						icon="icon-product-physical.svg"
						name={ PRODUCTS_CHECKBOX_GROUP_NAME }
						value={ PRODUCT_TYPES.PHYSICAL }
						changeCallback={ toggleProduct }
						currentValue={ products }
						type="checkbox"
					>
						<ul className="ppcp-r-services">
							<li>
								{ __( 'Goods', 'woocommerce-paypal-payments' ) }
							</li>
							<li>
								{ __(
									'Deliveries',
									'woocommerce-paypal-payments'
								) }
							</li>
						</ul>
					</SelectBox>
					<SelectBox
						title={ __(
							'Subscriptions',
							'woocommerce-paypal-payments'
						) }
						description={ __(
							'Recurring payments for physical goods or services.',
							'woocommerce-paypal-payments'
						) }
						icon="icon-product-subscription.svg"
						name={ PRODUCTS_CHECKBOX_GROUP_NAME }
						value={ PRODUCT_TYPES.SUBSCRIPTIONS }
						changeCallback={ toggleProduct }
						currentValue={ products }
						type="checkbox"
					>
						<a
							target="__blank"
							href="https://woocommerce.com/document/woocommerce-paypal-payments/#subscriptions-faq"
						>
							{ __(
								'WooCommerce Subscriptions',
								'woocommerce-paypal-payments'
							) }
						</a>
					</SelectBox>
				</SelectBoxWrapper>
				<Navigation
					setStep={ setStep }
					currentStep={ currentStep }
					stepperOrder={ stepperOrder }
					setCompleted={ setCompleted }
					canProceeedCallback={ () => products.length > 0 }
				/>
			</div>
		</div>
	);
};

export default StepProducts;
