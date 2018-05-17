import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		console.log('stripeKey', process.env.REACT_APP_STRIPE_KEY);
		return (
			<StripeCheckout
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
				name="EMAIL BLASTER"
				description="$5 for 5 Campaigns! Give me money!">
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);
