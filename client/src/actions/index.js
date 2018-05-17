import axios from 'axios';
import { FETCH_USER } from './types';

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

export const handleToken = token => async dispatch => {
	console.log('TOKEN', token);
	const res = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: res.data });
};
