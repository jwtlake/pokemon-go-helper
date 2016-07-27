import * as types from '../action_creators.js';

const initialState = {};

function candy(state = initialState, action) {
	switch (action.type) {
		case types.LOAD:
			return action.candy;
        	default: // default return on unknown action type
			return state;
	}
}

export default candy;
