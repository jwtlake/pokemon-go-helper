import * as types from '../action_creators.js';

const initialState = {};

function pokedex(state = initialState, action) {
	switch (action.type) {
		case types.LOAD:
			return action.pokedex.reduce((map, pokemon) => {
				map[pokemon.PokedexEntryNumber.toString()] = pokemon;
				return map;	
			},{});
        	default: // default return on unknown action type
			return state;
	}
}

export default pokedex;
