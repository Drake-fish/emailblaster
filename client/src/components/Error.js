import React from 'react';
import Payments from './Payments';
const Error = ({ cancel }) => {
	return (
		<div className="error-container">
			<div className="error-modal" />
			<div className="error-message">
				<h3>OUT OF CREDITS!</h3>
				<Payments />
				<span onClick={() => cancel()} className="btn red cancel-error">
					Nope
				</span>
			</div>
		</div>
	);
};

export default Error;
