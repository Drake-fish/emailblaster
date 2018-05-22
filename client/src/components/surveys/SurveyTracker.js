import React from 'react';

import TrackerIcon from './TrackerIcon';
const SurveyTracker = ({
	createComplete,
	reviewComplete,
	sendComplete,
	createActive,
	reviewActive,
	sendActive
}) => {
	return (
		<div className="survey-tracker-container">
			<span className="path-line" />
			<div className="tracks-container">
				<TrackerIcon
					active={createActive}
					complete={createComplete}
					iconName={'create'}
					name="CREATE"
				/>
				<TrackerIcon
					active={reviewActive}
					complete={reviewComplete}
					iconName={'poll'}
					name="REVIEW"
				/>
				<TrackerIcon
					active={sendActive}
					complete={sendComplete}
					iconName={'filter_drama'}
					name="COMPLETE"
				/>
			</div>
		</div>
	);
};

export default SurveyTracker;
