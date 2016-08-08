import * as types from '../action_creators.js';

const initialState = { loggedIn: false, pokemon: { orderBy: 'recent' }, luckyegg: { orderBy: 'evolutions' } };

function app(state = initialState, action) {
	switch (action.type) {
		
		case types.LOAD:
			return Object.assign({}, state, { loggedIn: true });	
		
		case types.ORDERBY:
			return Object.assign({}, state, { [action.page]: { orderBy: action.by } });	
		
		default: // default return on unknown action type
			return state;
	}
}

export default app;
