import React from 'react';
import DonutGraph from './DonutGraph';
const SurveyDashboardSummary = () => {
	return (
		<div className="summary-container">
			<div className="summary-graph-container">
				<DonutGraph
					data={[
						{
							value: 23,
							color: 'black',
							highlight: 'black',
							label: 'Completed'
						},
						{
							value: 10,
							color: '#a5a3a3',
							highlight: '#bdbdbd',
							label: 'Not Complete'
						}
					]}
				/>
			</div>
		</div>
	);
};

export default SurveyDashboardSummary;
