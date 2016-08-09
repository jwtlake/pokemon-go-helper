// action constants
export const LOGIN = 'LOGIN';
export const LOAD = 'LOAD';
export const ORDERBY = 'ORDERBY'; 

// login
import 'whatwg-fetch'; //polyfill for safari
export function login(auth,lat,lnd,alt) {
	return function(dispatch) {

		// create payload		
		const payload = {
			auth: auth,
			lat:lat,
			lnd:lnd,
			alt:alt	
		}

		// make request
		return fetch('/api/login', 
			{ 
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},	
				body: JSON.stringify(payload) }
		)
		.then((response) => { 
			if(response.ok) { 
				return response.json(); 
			} 
			else { throw `${response.status} ${response.statusText}` } // TODO improve error handing  'Incorrect username or password.'
		})
		.then((data) => { 	
			if(data){ 
				return dispatch(load(data));
			}
			else { throw 'Error loading response data.'; }	
		})
	}
}

// load pokemon data
export function load(data) {
	return {
		type: LOAD,
		player: data.player,
		pokedex: data.pokedex,
		pokemon: data.pokemon,
		candy: data.candy,
		proto: data.proto	
	};
}

// sort list 
export function orderBy(page,by) {
	return {
		type: ORDERBY,
		page: page,	
		by: by 
	};
}
