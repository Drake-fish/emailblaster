import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	state = { mobileNav: false };
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			default:
				return [
					<li key="payments">
						<Payments />
					</li>,
					<li key="credits">Credits: {this.props.auth.credits}</li>,
					<li key="logout">
						<a href="/api/logout">Logout</a>
					</li>
				];
		}
	}

	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper">
						<Link
							to={this.props.auth ? '/surveys' : '/'}
							className="left brand-logo">
							<i style={{ marginRight: '4px' }} className="material-icons">
								whatshot
							</i>
							Email Blaster
						</Link>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							{this.renderContent()}
						</ul>

						<a
							className="hide-on-large-only"
							onClick={() =>
								this.setState({ mobileNav: !this.state.mobileNav })
							}>
							<i
								style={{ marginRight: '14px', fontSize: '2rem' }}
								className="material-icons right">
								menu
							</i>
						</a>
					</div>
				</nav>
				<ul
					className={
						!this.state.mobileNav ? 'nav-closed' : 'nav-closed nav-open'
					}>
					{this.renderContent()}
				</ul>
				<div
					onClick={() => this.setState({ mobileNav: !this.state.mobileNav })}
					className={
						!this.state.mobileNav
							? 'nav-modal-closed'
							: 'nav-modal-closed nav-modal-open'
					}
				/>
			</div>
		);
	}
}
function mapStateToProps(state) {
	console.log(state);
	return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
