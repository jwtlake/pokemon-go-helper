// action constants
export const LOGIN = 'LOGIN';
export const LOAD = 'LOAD';
export const FILTER = 'FILTER '; 

// login
import { browserHistory } from 'react-router'
export function login(user,pass,type,lat,lnd,alt) {
	return function(dispatch) {

		// create payload		
		const payload = {
			user:user,
			pass:pass,
			type:type,
			lat,lat,
			lnd:lnd,
			alt:alt	
		}

		// make request
		return fetch('/api/login',
			{ method: 'POST', body: JSON.stringify(payload) }
		)
		.then((response) => { 
			if(response.ok) { return response.json(); } //TODO handle this better  
			else { return null; } 
		})
		.then((data) => { 	
			if(data){
				browserHistory.push('/recommendation');	
				return dispatch(load(data)); 
			}//TODO handle this better	
			else { return null; }	
		})
	}
}

// load pokemon data
export function load(data) {
	return {
		type: LOAD,
		player: data.player,
		pokedex: data.pokedex,
		pokemon: data.pokemon	
	};
}

// filter recommendations
export function filter(by) {
	return {
		type: FILTER,
		by: by	
	};
}
