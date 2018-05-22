import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
	return (
		<div className="hero-container">
			<div className="hero-text-container">
				<h1>GET THE FEEDBACK YOU DESERVE</h1>
				<p>
					With Email Blaster you can finally get the feedback you deserve by
					blasting emails to each one of your users, and managing that feedback
					to make more money! This is the single best tool you need to get your
					business back on track!
				</p>
				<span className="hero-login">Login</span>
				<span className="hero-read">Read More</span>
			</div>
			<div className="hero-photo-container">
				<img
					className="app-photo"
					src={require('../../images/hero-photo.png')}
				/>
			</div>
		</div>
	);
};

export default Hero;
