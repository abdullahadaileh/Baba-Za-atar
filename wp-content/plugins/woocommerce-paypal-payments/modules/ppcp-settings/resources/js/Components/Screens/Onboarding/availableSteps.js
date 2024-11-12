import StepWelcome from './StepWelcome';
import StepBusiness from './StepBusiness';
import StepProducts from './StepProducts';

export const getSteps = ( flags ) => {
	const allSteps = [ StepWelcome, StepBusiness, StepProducts ];

	if ( ! flags.canUseCasualSelling ) {
		return allSteps.filter( ( step ) => step !== StepBusiness );
	}

	return allSteps;
};
