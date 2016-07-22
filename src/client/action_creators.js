// action constants
export const LOAD = 'LOAD';
export const EVALUATE = 'EVALUATE'; 

// action creators
export function load(data) {
	return {
		type:LOAD,
		player: data.player,
		pokedex: data.pokedex,
		pokemon: data.pokemon	
	};
}

export function evaluate(state) {
	return {
		type: EVALUATE,
		player: state.player,
		pokedex: state.pokedex,
		pokemon: state.pokemon
	};
}
