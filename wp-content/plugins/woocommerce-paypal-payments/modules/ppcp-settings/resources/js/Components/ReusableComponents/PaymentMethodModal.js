import { Modal } from '@wordpress/components';
import PaymentMethodIcon from './PaymentMethodIcon';

const PaymentMethodModal = ( props ) => {
	let className = 'ppcp-r-modal';
	let classNameContainer = 'ppcp-r-modal__container';

	if ( props?.className ) {
		className += ' ' + props.className;
	}

	if ( props?.container && props.container === 'small' ) {
		classNameContainer += ' ppcp-r-modal__container--small';
	}

	return (
		<Modal
			className={ className }
			onRequestClose={ () => props.setModalIsVisible( false ) }
		>
			<div className={ classNameContainer }>
				<div className="ppcp-r-modal__header">
					<PaymentMethodIcon
						icons={ [ props.icon ] }
						type={ props.icon }
					/>
					<span className="ppcp-r-modal__title">{ props.title }</span>
				</div>
				<div className="ppcp-r-modal__content">{ props.children }</div>
			</div>
		</Modal>
	);
};

export default PaymentMethodModal;
