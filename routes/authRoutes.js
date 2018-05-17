const passport = require('passport');

module.exports = app => {
	//route to get to Google oauth
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);
	//log the user in then redirect them to the surveys page
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);
	//log the user out and redirect them to the home page
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
	//get the xcurrent user for testing..
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
