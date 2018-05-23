import { FETCH_SURVEYS, SEARCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
			break;
		case SEARCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
}
