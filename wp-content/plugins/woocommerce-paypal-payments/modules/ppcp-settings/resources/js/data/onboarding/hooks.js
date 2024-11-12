import { useSelect, useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { NAMESPACE, PRODUCT_TYPES, STORE_NAME } from '../constants';
import { getFlags } from './selectors';

const useOnboardingDetails = () => {
	const {
		persist,
		setOnboardingStep,
		setCompleted,
		setSandboxMode,
		setManualConnectionMode,
		setClientId,
		setClientSecret,
		setIsCasualSeller,
		setProducts,
	} = useDispatch( STORE_NAME );

	// Transient accessors.
	const isSaving = useSelect( ( select ) => {
		return select( STORE_NAME ).getTransientData().isSaving;
	}, [] );

	const isReady = useSelect( ( select ) => {
		return select( STORE_NAME ).getTransientData().isReady;
	} );

	// Read-only flags.
	const flags = useSelect( ( select ) => {
		return select( STORE_NAME ).getFlags();
	} );

	// Persistent accessors.
	const step = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().step || 0;
	} );

	const completed = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().completed;
	} );

	const clientId = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().clientId;
	}, [] );

	const clientSecret = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().clientSecret;
	}, [] );

	const isSandboxMode = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().useSandbox;
	}, [] );

	const isManualConnectionMode = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().useManualConnection;
	}, [] );

	const isCasualSeller = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().isCasualSeller;
	}, [] );

	const products = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().products || [];
	}, [] );

	const toggleProduct = ( list ) => {
		const validProducts = list.filter( ( item ) =>
			Object.values( PRODUCT_TYPES ).includes( item )
		);
		return setDetailAndPersist( setProducts, validProducts );
	};

	const setDetailAndPersist = async ( setter, value ) => {
		setter( value );
		await persist();
	};

	return {
		isSaving,
		isReady,
		step,
		setStep: ( value ) => setDetailAndPersist( setOnboardingStep, value ),
		completed,
		setCompleted: ( state ) => setDetailAndPersist( setCompleted, state ),
		isSandboxMode,
		setSandboxMode: ( state ) =>
			setDetailAndPersist( setSandboxMode, state ),
		isManualConnectionMode,
		setManualConnectionMode: ( state ) =>
			setDetailAndPersist( setManualConnectionMode, state ),
		clientId,
		setClientId: ( value ) => setDetailAndPersist( setClientId, value ),
		clientSecret,
		setClientSecret: ( value ) =>
			setDetailAndPersist( setClientSecret, value ),
		isCasualSeller,
		setIsCasualSeller: ( value ) =>
			setDetailAndPersist( setIsCasualSeller, value ),
		products,
		toggleProduct,
		flags,
	};
};

export const useOnboardingStepWelcome = () => {
	const {
		isSaving,
		isSandboxMode,
		setSandboxMode,
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
	} = useOnboardingDetails();

	return {
		isSaving,
		isSandboxMode,
		setSandboxMode,
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
	};
};

export const useOnboardingStepBusiness = () => {
	const { isCasualSeller, setIsCasualSeller } = useOnboardingDetails();

	return { isCasualSeller, setIsCasualSeller };
};

export const useOnboardingStepProducts = () => {
	const { products, toggleProduct } = useOnboardingDetails();

	return { products, toggleProduct };
};

export const useOnboardingStep = () => {
	const { isReady, step, setStep, completed, setCompleted, flags } =
		useOnboardingDetails();

	return { isReady, step, setStep, completed, setCompleted, flags };
};

export const useManualConnect = () => {
	const connectManual = async ( clientId, clientSecret, isSandboxMode ) => {
		return await apiFetch( {
			path: `${ NAMESPACE }/connect_manual`,
			method: 'POST',
			data: {
				clientId,
				clientSecret,
				useSandbox: isSandboxMode,
			},
		} );
	};

	return {
		connectManual,
	};
};
