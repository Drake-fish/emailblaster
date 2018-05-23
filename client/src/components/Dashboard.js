import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SurveyList from './surveys/SurveyList';
import Error from './Error';

class Dashboard extends Component {
	state = {
		error: false
	};
	cancelError = () => {
		this.setState({ error: false });
	};
	handleRedirect = () => {
		if (this.props.user.credits !== 0) {
			this.props.history.push('/surveys/new');
		} else {
			console.log('setting error to true');
			this.setState({ error: true });
		}
	};
	renderDashboard() {
		if (this.state.error) {
			return (
				<div>
					<Error cancel={this.cancelError} />
					<div className="fixed-action-btn">
						<a onClick={this.handleRedirect} className="btn-floating btn-large">
							<i className="material-icons">add</i>
						</a>
					</div>
					<SurveyList />
				</div>
			);
		} else {
			return (
				<div>
					<div className="fixed-action-btn">
						<a onClick={this.handleRedirect} className="btn-floating btn-large">
							<i className="material-icons">add</i>
						</a>
					</div>
					<SurveyList />
				</div>
			);
		}
	}
	render() {
		console.log(this.state);
		return <div>{this.renderDashboard()}</div>;
	}
}
function mapStateToProps(state) {
	return {
		user: state.auth
	};
}
export default connect(mapStateToProps)(withRouter(Dashboard));
