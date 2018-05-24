import React from 'react';

const EmailTemplate = ({ formValues }) => {
	console.log(formValues);
	return (
		<div className="email-template-container">
			<p className="subject-top">Subject: {formValues.subject}</p>
			<p className="to">To: {formValues.recipients}</p>
			<div className="email-template">
				<header>
					<div className="email-header-container">
						<i className="material-icons star">star</i>
						<h2>Company Name</h2>
					</div>
				</header>
				<body>
					<h3>{formValues.body}</h3>
					<span className="btn green">YES</span>
					<span className="btn red">NO</span>
				</body>
				<footer>
					<p>Email sent by Email Blaster</p>
					<p>Copyright © 2018 Email Blaster</p>
				</footer>
			</div>
		</div>
	);
};

export default EmailTemplate;
