// action constants
export const LOGIN = 'LOGIN';
export const LOAD = 'LOAD';
export const EVALUATE = 'EVALUATE'; 

// action creators


// login
import fetch from 'isomorphic-fetch'; //require('es6-promise').polyfill();

export function login(user,password,type) {
	return function(dispatch) {
	
		const apiCall = '/api/login';
		return fetch(apiCall).then(
			response => response.json(),
			error => console.log('error' + error)
		).then(
			json => dispatch(load(json))	
		);
	}
}

// load pokemon data
export function load(data) {
	return {
		type:LOAD,
		player: data.player,
		pokedex: data.pokedex,
		pokemon: data.pokemon	
	};
}

// make recommendation
export function evaluate(state) {
	return {
		type: EVALUATE,
		player: state.player,
		pokedex: state.pokedex,
		pokemon: state.pokemon
	};
}
