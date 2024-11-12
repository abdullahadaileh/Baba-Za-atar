import Container from '../../ReusableComponents/Container';
import { useOnboardingStep } from '../../../data';
import { getSteps } from './availableSteps';

const getCurrentStep = ( requestedStep, steps ) => {
	const isValidStep = ( step ) =>
		typeof step === 'number' &&
		Number.isInteger( step ) &&
		step >= 0 &&
		step < steps.length;

	const safeCurrentStep = isValidStep( requestedStep ) ? requestedStep : 0;
	return steps[ safeCurrentStep ];
};

const Onboarding = () => {
	const { step, setStep, setCompleted, flags } = useOnboardingStep();
	const steps = getSteps( flags );

	const CurrentStepComponent = getCurrentStep( step, steps );

	return (
		<Container page="onboarding">
			<div className="ppcp-r-card">
				<CurrentStepComponent
					setStep={ setStep }
					currentStep={ step }
					setCompleted={ setCompleted }
					stepperOrder={ steps }
				/>
			</div>
		</Container>
	);
};

export default Onboarding;
