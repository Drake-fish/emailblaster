//middleware for checking if the user is logged in or not.
module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		return res
			.status(403)
			.send({ error: 'You are going to need to pay more money!' });
	}
	next();
};
