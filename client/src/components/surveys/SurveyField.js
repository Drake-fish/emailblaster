import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
	//...input same as onblur={input.onBlur} onChange={input.onChange} etc.
	//abusing javascript right here with touched && error if touched is true it will display error if it's false it will exit out of the statement
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
