const keys = require('../config/keys');
module.exports = survey => {
	return `
          <html>
					<header>
						<div className="email-header-container">
							<i className="material-icons star">star</i>
							<h2>Company Name</h2>
						</div>
					</header>
					<body>
						<h3>${survey.body}</h3>
						<a href="${keys.redirectDomain}/api/surveys/${
		survey.id
	}/yes" className="btn green">YES</a>
						<a href="${keys.redirectDomain}/api/surveys/${
		survey.id
	}/no" className="btn red">NO</a>
					</body>
					<footer>
						<p>Email sent by Email Blaster</p>
						<p>Copyright © 2018 Email Blaster</p>
					</footer>
          </html>
          `;
};
