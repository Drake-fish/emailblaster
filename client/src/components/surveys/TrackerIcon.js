import React from 'react';

const SurveyTracker = ({ active, complete, iconName, name }) => {
	const status = function() {
		if (active && !complete) {
			return 'material-icons track-icon active';
		} else if (!active && complete) {
			return 'material-icons track-icon complete';
		} else {
			return 'material-icons track-icon';
		}
	};
	return (
		<div className="track">
			<i className={status()}>{complete ? 'check' : iconName}</i>
			<span className="tracker-sub">{name}</span>
		</div>
	);
};

export default SurveyTracker;
