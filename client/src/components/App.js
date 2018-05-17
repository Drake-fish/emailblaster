import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
const DASHBOARD = () => <h2>DASHBOARD</h2>;
const SURVEYNEW = () => <h2>SURVEYNEW</h2>;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route path="/" component={Landing} exact />
						<Route path="/surveys" component={DASHBOARD} exact />
						<Route path="/surveys/new" component={SURVEYNEW} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
