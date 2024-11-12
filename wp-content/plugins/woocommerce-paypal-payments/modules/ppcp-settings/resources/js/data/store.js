import { createReduxStore, register, combineReducers } from '@wordpress/data';
import { controls } from '@wordpress/data-controls';
import { STORE_NAME } from './constants';
import * as onboarding from './onboarding';

const actions = {};
const selectors = {};
const resolvers = {};

[ onboarding ].forEach( ( item ) => {
	Object.assign( actions, { ...item.actions } );
	Object.assign( selectors, { ...item.selectors } );
	Object.assign( resolvers, { ...item.resolvers } );
} );

const reducer = combineReducers( {
	onboarding: onboarding.reducer,
} );

export const initStore = () => {
	const store = createReduxStore( STORE_NAME, {
		reducer,
		controls,
		actions,
		selectors,
		resolvers,
	} );

	register( store );

	/* eslint-disable no-console */
	// Provide a debug tool to inspect the Redux store via the JS console.
	if ( window.ppcpSettings?.debug && console?.groupCollapsed ) {
		window.ppcpSettings.dumpStore = () => {
			const storeSelector = `wp.data.select('${ STORE_NAME }')`;
			console.group( `[STORE] ${ storeSelector }` );

			const storeState = wp.data.select( STORE_NAME );
			Object.keys( selectors ).forEach( ( selector ) => {
				console.groupCollapsed( `[SELECTOR] .${ selector }()` );
				console.table( storeState[ selector ]() );
				console.groupEnd();
			} );

			console.groupEnd();
		};
		window.ppcpSettings.resetStore = () => {
			wp.data.dispatch( STORE_NAME ).resetOnboarding();
			wp.data.dispatch( STORE_NAME ).persist();
		};
		window.ppcpSettings.startOnboarding = () => {
			wp.data.dispatch( STORE_NAME ).setCompleted( false );
			wp.data.dispatch( STORE_NAME ).setOnboardingStep( 0 );
			wp.data.dispatch( STORE_NAME ).persist();
		};
	}
	/* eslint-enable no-console */
};
