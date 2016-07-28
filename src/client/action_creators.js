// action constants
export const LOGIN = 'LOGIN';
export const LOAD = 'LOAD';
export const FILTER = 'FILTER '; 

// login
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
			if(response.ok) { 
				return response.json(); 
			} 
			else { throw 'Incorrect username or password.'; } // TODO improve error handing
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

// filter recommendations
export function filter(by) {
	return {
		type: FILTER,
		by: by	
	};
}
