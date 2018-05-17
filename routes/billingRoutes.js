const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	console.log('stripe key on vbackend', stripe);
	//post to the stripe servers
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});
		//add 5 credits to our user then send it back to the client
		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};
