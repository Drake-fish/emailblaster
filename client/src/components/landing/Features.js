import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
	return (
		<div className="features">
			<h2 className="features-title">BEST FEATURES</h2>
			<div className="title-underline-container">
				<span className="title-underline" />
				<span className="title-underline-highlight" />
				<span className="title-underline" />
			</div>
			<ul id="more" className="features-list">
				<li>
					<i className="material-icons feature-icon">add</i>
					<h5>CREATE</h5>
					<p className="feature-subtext">
						Create campaigns to get feed back on your products and services.
						Customize your Messages to match your brand.
					</p>
				</li>
				<li>
					<i className="material-icons feature-icon">filter_drama</i>
					<h5>MANAGE</h5>
					<p className="feature-subtext">
						Manage results efficently with percise metrics, including
						visualizations, and sorted by campaign.
					</p>
				</li>
				<li>
					<i className="material-icons feature-icon">attach_money</i>
					<h5>ENJOY</h5>
					<p className="feature-subtext">
						Sit back and rake in the cash when you implement better products
						because your customers have told you exactly what they think!
					</p>
				</li>
			</ul>
		</div>
	);
};

export default Features;
