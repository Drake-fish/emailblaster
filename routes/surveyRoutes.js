const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const enoughCredits = require('../middlewares/enoughCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates');
const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});
	//write this route very defensively so we don't get an junk data.
	app.post('/api/surveys/webhooks', (req, res) => {
		//pull of just the survey id and choice
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body)
			//iterate over the req.body
			.map(({ email, url }) => {
				// new URL(url).pathname;) extracts just the route
				//returns an object from all the variables we extracted off in the last step, or null if it can't find anything
				const match = p.test(new URL(url).pathname);
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			//filter out the undefined events
			.compact()
			//get only the unique events from email or survey id.
			.uniqBy('email', 'surveyId')
			//return the value of the chain
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							//will find the exact email, and responsed false
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						//increment property in mongo that will find the choice and increment it by one
						//[choice] is key interperalation it will add the [choice] as yes or no.
						$inc: { [choice]: 1 },
						//updates one of the recipients properties in the subdocument collection, $ matches the exact one we are looking for
						//look a the responded property and change that property to true.
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
				).exec();
			})
			.value();
		res.send({});
	});

	//return a list of surveys for a specifc user tell mongo not to return the long list of recipients
	// app.get('/api/surveys', requireLogin, async (req, res) => {
	// 	const surveys = await Survey.find({
	// 		_user: req.user.id
	// 	}).select({
	// 		recipients: false
	// 	});
	// 	res.send(surveys);
	// });

	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({
			_user: req.user.id
		});
		res.send(surveys);
	});

	//delete one of the campaigns
	app.post('/api/surveys/delete', requireLogin, async (req, res) => {
		const { surveyId } = req.body;
		const surveys = await Survey.remove({
			_id: surveyId
		}).exec();
	});
	//search Surveys!
	app.post('/api/search', requireLogin, async (req, res) => {
		const surveys = await Survey.find({
			_user: req.user.id,
			$text: { $search: req.body.query }
		});
		console.log(surveys);
		res.send(surveys);
	});

	//Create our survey instance and send out a big email!
	app.post('/api/surveys', requireLogin, enoughCredits, async (req, res) => {
		const { title, body, subject, recipients } = req.body;

		const survey = new Survey({
			title,
			body,
			subject,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});
		//Great place to send an email!
		const mailer = new Mailer(survey, surveyTemplate(survey));
		//error handling
		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
