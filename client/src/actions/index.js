import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, SEARCH_SURVEYS } from './types';

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//     .get('/api/current_user')
//     .then(res=>dispatch({type:FETCH_USER, payload:res}))
//   }
// }

//SAME THING ABOVE BELOW IS REFACTORED
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteSurvey = surveyId => async dispatch => {
	const res = await axios.post('/api/surveys/delete', surveyId);
};

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurveys = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	// history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};
export const searchSurveys = query => async dispatch => {
	let res;
	if (query.query !== '') {
		res = await axios.post('/api/search', query);
	} else {
		res = await axios.get('/api/surveys');
	}

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');
	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
