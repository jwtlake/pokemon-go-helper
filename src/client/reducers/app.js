import * as types from '../action_creators.js';

const initialState = { loggedIn: false };

function app(state = initialState, action) {
	switch (action.type) {
		case types.LOAD:
			return Object.assign({}, state, { loggedIn: true });	
		default: // default return on unknown action type
			return state;
	}
}

export default app;
