const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//takes an object and spits out a mailer. Class of mailer is now tied to helper.Mail.
class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		super();
		//sends to sendgrid api with key and it returns a response.
		this.sgApi = sendgrid(keys.sendGridKey);
		//who this email is sent from sendgrid helper function!!
		this.from_email = new helper.Email('no-reply@emailblaster.com');
		//add the subject
		this.subject = subject;
		//the content of the email, text/html tells it that it's html.
		this.body = new helper.Content('text/html', content);
		//list of recipients List right now is an array of objects. We must format that for sendgrid, only email addresses
		this.recipients = this.formatAddresses(recipients);

		//adds body to the content. THIS IS A BUILT IN FUNCTION FOR sendgrid
		this.addContent(this.body);
		//enable click tracking inside of our email we will define this function.
		this.addClickTracking();
		//add recipients another function I will be defining to take and process list of recipients
		this.addRecipients();
	}
	//have to have () with destructoring and arrow functions!! we pull off the email and format it with sendgrid helper
	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}
	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}
	//defined personalized varialbe iterated over list of recipients for each one
	// take them and add them to the personalize object, after they have been added call this.addPersonalization and add the entire personalize object.
	addRecipients() {
		const personalize = new helper.Personalization();
		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});
		this.addPersonalization(personalize);
	}
	//send to sendgrid!
	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});
		//actually sends all the emails to sendgrid
		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
