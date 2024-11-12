import TabNavigation from '../ReusableComponents/TabNavigation';
import { getSettingsTabs } from './tabs';
import { useOnboardingStep } from '../../data';
import Onboarding from './Onboarding/Onboarding';

const Settings = () => {
	const onboardingProgress = useOnboardingStep();

	if ( ! onboardingProgress.isReady ) {
		// TODO: Use better loading state indicator.
		return <div>Loading...</div>;
	}

	if ( ! onboardingProgress.completed ) {
		return <Onboarding />;
	}

	const tabs = getSettingsTabs( onboardingProgress );

	return <TabNavigation tabs={ tabs }></TabNavigation>;
};

export default Settings;
