const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//get the users model from mongoose
const User = mongoose.model('users');

//serialize user get their user id
passport.serializeUser((user, done) => {
	done(null, user.id);
});
//deserialize user for logout process
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

//create a new strategy for google oauth.
passport.use(
	new GoogleStrategy(
		//configure it
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		//async callback functions to swap keys with Google and then save the keys on our
		//mongoDB user table.
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
		}
	)
);
