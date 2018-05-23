import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return formFields.map(field => {
			return (
				<Field
					key={field.label}
					label={field.label}
					type="text"
					name={field.name}
					component={SurveyField}
				/>
			);
		});
	}
	//keep render functions simple with helper functions!
	render() {
		return (
			<div>
				<form
					className="create-form"
					onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
					<Link to="/surveys" className="red btn-flat left white-text">
						Cancel
					</Link>
				</form>
			</div>
		);
	}
}
//values is an object of all the values in our form.
function validate(values) {
	const errors = {};

	//make the email property on the errors object equal to the validation logic on all emails.
	errors.recipients = validateEmails(values.recipients || '');

	formFields.forEach(({ name }) => {
		//values[name] figures out a dynamic property like values.email, or values.body
		if (!values[name]) {
			errors[name] = 'You must provide a value!';
		}
	});

	return errors;
}
export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
