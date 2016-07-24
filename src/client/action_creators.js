// action constants
export const LOGIN = 'LOGIN';
export const LOAD = 'LOAD';
export const EVALUATE = 'EVALUATE'; 

// action creators
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
		var data = new FormData();
		data.append( "json", JSON.stringify( payload ) );

		// make request
		return fetch('/api/login',
			{ method:'POST', body:data }
		)
		.then((response) => { return response.json(); })
		.then((data) => { return dispatch(load(data)); })	
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
