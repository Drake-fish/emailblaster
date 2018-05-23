import React, { Component } from 'react';

// class SurveySearch extends Component {
// 	handleSearch(e) {
// 		console.log(e.target.value);
// 	}
// 	render() {
//
// 	}
// }
const SurveySearch = ({ search, surveyList }) => {
	const handleSearch = function(e) {
		let searchTerm = document.getElementById('search').value;
		search({ query: searchTerm });
	};
	return (
		<div className="search-container">
			<form className="search-form">
				<i className="material-icons search-icon">search</i>
				<input
					id="search"
					onKeyUp={() => handleSearch()}
					type="text"
					placeholder="Search"
				/>
			</form>
		</div>
	);
};

export default SurveySearch;
