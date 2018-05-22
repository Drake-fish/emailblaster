import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import BarChart from './BarChart';
import DonutGraph from './DonutGraph';
class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}
	deleteSurvey(id) {
		console.log('deleting!');
		this.props.deleteSurvey({ surveyId: id });
		this.props.fetchSurveys();
	}
	renderSurveys() {
		return this.props.surveys

			.reverse()
			.map(
				({
					_id,
					title,
					body,
					dateSent,
					yes,
					no,
					lastResponded,
					recipients
				}) => {
					let last = lastResponded
						? new Date(lastResponded).toLocaleDateString()
						: 'N/A';

					let responded = yes + no;
					let totalSent = recipients.length - responded;
					let percentage = responded / recipients.length * 100;
					return (
						<div className="survey-card-container">
							<span className="left sent">
								Sent on: {new Date(dateSent).toLocaleDateString()}
							</span>
							<span
								className="right delete"
								onClick={() => this.deleteSurvey(_id)}>
								Delete
							</span>
							<div className="donut-graph-container">
								<DonutGraph
									data={[
										{
											value: responded,
											color: '#d6aa43',
											highlight: '#f1bf4b',
											label: 'Responded'
										},
										{
											value: totalSent,
											color: '#a5a3a3',
											highlight: '#bdbdbd',
											label: 'Pending'
										}
									]}
								/>
								<div className="percentage-container">
									<p className="percentage">{percentage}%</p>
									<p className="pie-title">Complete</p>
								</div>
							</div>
							<span className="left yes">YES:{yes}</span>
							<span className="right no">NO:{no}</span>
							<div className="survey-details-container">
								<h3 className="survey-title">{title}</h3>
								<span className="underline" />
								<p className="survey-question">{body}</p>
							</div>
						</div>

						// <div className="bar-graph-container">
						// 	<BarChart data={{ yes, no }} />
						// </div>
						// <div className="send-details-container">
						// 	<p>Sent On: {new Date(dateSent).toLocaleDateString()}</p>
						// 	<p>Last Responded: {last}</p>
						// </div>
					);
				}
			);
	}
	render() {
		return <div className="surveys-list">{this.renderSurveys()}</div>;
	}
}

function mapStateToProps({ surveys }) {
	return {
		surveys
	};
}
export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
	SurveyList
);
