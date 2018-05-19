import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurveys, history }) => {
	const reviewFields = formFields.map(({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});
	return (
		<div>
			<h5>Please Confirm Your Survey!</h5>
			{reviewFields}
			<button
				onClick={onCancel}
				className="yellow darken-3 white-text btn-flat">
				Back
			</button>
			<button
				onClick={() => submitSurveys(formValues, history)}
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
