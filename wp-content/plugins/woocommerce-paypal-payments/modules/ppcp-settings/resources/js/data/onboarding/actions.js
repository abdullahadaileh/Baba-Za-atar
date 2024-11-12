import { select } from '@wordpress/data';
import { apiFetch } from '@wordpress/data-controls';
import ACTION_TYPES from './action-types';
import { NAMESPACE, STORE_NAME } from '../constants';

/**
 * Special. Resets all values in the onboarding store to initial defaults.
 *
 * @return {{type: string}} The action.
 */
export const resetOnboarding = () => {
	return { type: ACTION_TYPES.RESET_ONBOARDING };
};

/**
 * Non-persistent. Marks the onboarding details as "ready", i.e., fully initialized.
 *
 * @param {boolean} isReady
 * @return {{type: string, isReady}} The action.
 */
export const setIsReady = ( isReady ) => {
	return {
		type: ACTION_TYPES.SET_ONBOARDING_IS_READY,
		isReady,
	};
};

/**
 * Non-persistent. Changes the "saving" flag.
 *
 * @param {boolean} isSaving
 * @return {{type: string, isSaving}} The action.
 */
export const setIsSaving = ( isSaving ) => {
	return {
		type: ACTION_TYPES.SET_IS_SAVING_ONBOARDING,
		isSaving,
	};
};

/**
 * Persistent. Set the full onboarding details, usually during app initialization.
 *
 * @param {{data: {}, flags?: {}}} payload
 * @return {{type: string, payload}} The action.
 */
export const setOnboardingDetails = ( payload ) => {
	return {
		type: ACTION_TYPES.SET_ONBOARDING_DETAILS,
		payload,
	};
};

/**
 * Persistent.Set the "onboarding completed" flag which shows or hides the wizard.
 *
 * @param {boolean} completed
 * @return {{type: string, payload}} The action.
 */
export const setCompleted = ( completed ) => {
	return {
		type: ACTION_TYPES.SET_ONBOARDING_COMPLETED,
		completed,
	};
};

/**
 * Persistent. Sets the onboarding wizard to a new step.
 *
 * @param {number} step
 * @return {{type: string, step}} An action.
 */
export const setOnboardingStep = ( step ) => {
	return {
		type: ACTION_TYPES.SET_ONBOARDING_STEP,
		step,
	};
};

/**
 * Persistent. Sets the sandbox mode on or off.
 *
 * @param {boolean} sandboxMode
 * @return {{type: string, useSandbox}} An action.
 */
export const setSandboxMode = ( sandboxMode ) => {
	return {
		type: ACTION_TYPES.SET_SANDBOX_MODE,
		useSandbox: sandboxMode,
	};
};

/**
 * Persistent. Toggles the "Manual Connection" mode on or off.
 *
 * @param {boolean} manualConnectionMode
 * @return {{type: string, useManualConnection}} An action.
 */
export const setManualConnectionMode = ( manualConnectionMode ) => {
	return {
		type: ACTION_TYPES.SET_MANUAL_CONNECTION_MODE,
		useManualConnection: manualConnectionMode,
	};
};

/**
 * Persistent. Changes the "client ID" value.
 *
 * @param {string} clientId
 * @return {{type: string, clientId}} The action.
 */
export const setClientId = ( clientId ) => {
	return {
		type: ACTION_TYPES.SET_CLIENT_ID,
		clientId,
	};
};

/**
 * Persistent. Changes the "client secret" value.
 *
 * @param {string} clientSecret
 * @return {{type: string, clientSecret}} The action.
 */
export const setClientSecret = ( clientSecret ) => {
	return {
		type: ACTION_TYPES.SET_CLIENT_SECRET,
		clientSecret,
	};
};

/**
 * Persistent. Sets the "isCasualSeller" value.
 *
 * @param {boolean} isCasualSeller
 * @return {{type: string, isCasualSeller}} The action.
 */
export const setIsCasualSeller = ( isCasualSeller ) => {
	return {
		type: ACTION_TYPES.SET_IS_CASUAL_SELLER,
		isCasualSeller,
	};
};

/**
 * Persistent. Sets the "products" array.
 *
 * @param {string[]} products
 * @return {{type: string, products}} The action.
 */
export const setProducts = ( products ) => {
	return {
		type: ACTION_TYPES.SET_PRODUCTS,
		products,
	};
};

/**
 * Saves the persistent details to the WP database.
 *
 * @return {any} A generator function that handles the saving process.
 */
export function* persist() {
	let error = null;

	try {
		const path = `${ NAMESPACE }/onboarding`;
		const data = select( STORE_NAME ).getPersistentData();

		yield setIsSaving( true );

		yield apiFetch( {
			path,
			method: 'post',
			data,
		} );
	} catch ( e ) {
		error = e;
		console.error( 'Error saving progress.', e );
	} finally {
		yield setIsSaving( false );
	}

	return error === null;
}
