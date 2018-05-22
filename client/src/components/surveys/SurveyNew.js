import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import SurveyComplete from './SurveyComplete';
import SurveyTracker from './SurveyTracker';

class SurveyNew extends Component {
	state = {
		showReview: false,
		reviewComplete: false,
		sendComplete: false,
		createActive: true,
		reviewActive: false,
		sendActive: false
	};
	renderContent() {
		if (this.state.showReview && !this.state.sendComplete) {
			return (
				<SurveyFormReview
					onCancel={() =>
						this.setState({
							showReview: false,
							createActive: true,
							reviewActive: false
						})
					}
					formValues={this.props.formValues}
					onComplete={() =>
						this.setState({
							reviewComplete: true,
							reviewActive: false,
							sendActive: true
						})
					}
					onSendClick={() => {
						this.setState({
							sendActive: false,
							sendComplete: true
						});
					}}
				/>
			);
		} else if (this.state.showReview && this.state.sendComplete) {
			return <SurveyComplete />;
		}
		return (
			<SurveyForm
				onSurveySubmit={() =>
					this.setState({
						showReview: true,
						reviewActive: true,
						createActive: false
					})
				}
			/>
		);
	}
	render() {
		return (
			<div>
				<SurveyTracker
					createComplete={this.state.showReview}
					reviewComplete={this.state.reviewComplete}
					sendComplete={this.state.sendComplete}
					createActive={this.state.createActive}
					reviewActive={this.state.reviewActive}
					sendActive={this.state.sendActive}
				/>
				{this.renderContent()}
			</div>
		);
	}
}

export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);
