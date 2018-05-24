import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../actions';
import EmailTemplate from './EmailTemplate';

const SurveyFormReview = ({
	onCancel,
	formValues,
	submitSurveys,
	history,
	onComplete,
	onSendClick
}) => {
	const handleSubmit = function() {
		submitSurveys(formValues, history);
		onComplete();
		window.setTimeout(() => {
			onSendClick();
		}, 2000);
	};
	return (
		<div className="review-survey-container">
			<h5>Please Confirm Your Survey!</h5>
			<EmailTemplate formValues={formValues} />
			<button
				onClick={onCancel}
				className="yellow darken-3 white-text btn-flat">
				Back
			</button>
			<button
				onClick={() => handleSubmit()}
				className="green btn-flat right white-text">
				Send Emails!
				<i className="material-icons right">send</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
