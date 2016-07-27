import * as types from '../action_creators.js';

const initialState = {};

function proto(state = initialState, action) {
	switch (action.type) {
		case types.LOAD:
			return action.proto;
        	default: // default return on unknown action type
			return state;
	}
}

export default proto;
