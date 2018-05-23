import React from 'react';
import { Link } from 'react-router-dom';
const SurveyComplete = () => {
	return (
		<div className="completion-container">
			<div className="completion-details">
				<i className="material-icons complete-thumb">thumb_up</i>
				<h3>Surveys Have Been Sent!</h3>
				<p>Track your Progress on the dashboard!</p>
				<Link className="btn green" to="/surveys">
					Dashboard
				</Link>
			</div>
		</div>
	);
};

export default SurveyComplete;
