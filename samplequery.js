//go through the entire survey collection find the ID with surveyId, then go into that surveyId's recipients properites
// should be an array of records, then find one element that matches email, and responded false.
//not only find it but update it at the same time!
email = 'a@a.com';
choice = 'yes' || 'no';
Survey.updateOne(
	{
		id: surveyId,
		recipients: {
			//will match the requirements
			$elemMatch: { email: email, responded: false }
		}
	},
	{
		//increment property in mongo that will find the choice and increment it by one
		//[choice] is key interperalation it will add the [choice] as yes or no.
		$inc: { [choice]: 1 },
		//updates one of the recipients properties in the subdocument collection, $ matches the exact one we are looking for
		//look a the responded property and change that property to true.
		$set: { 'recipients.$.responded': true }
	}
	//executes the query!
).exec();

//when we issue this query from finding the survey and updating the survey happens in our database!
//we will never see this query on our server.
