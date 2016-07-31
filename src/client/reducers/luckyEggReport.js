import * as types from '../action_creators.js';

// static config
const expPerEvolution = 1000;
const avgEvolutionTime = 30; //in seconds
const luckyEggDuration = 1800; //in seconds

const initialState = {};

function luckyEggReport(state = initialState, action) {
	switch (action.type) {
		case types.LOAD:
			const player = action.player;
			const pokemon = action.pokemon;
			const pokedex = action.pokedex;	
			const candy = action.candy;
			const moves = action.proto.pokemonMove;
				
			// group by pokemon
			const pokemonGroups = pokemon.reduce((map,aPokemon) => {
				const PokemonId = aPokemon.pokemon_id.toString();
				
				if(!map.hasOwnProperty(PokemonId)) { 
					map[PokemonId] = []; 
				}
				map[PokemonId].push(aPokemon);
				return map; 
			},{});			
			
			// flatten map
			const pokemonGroupsFlat = Object.keys(pokemonGroups).map(key => pokemonGroups[key]);

			// remove pokemon without evolutions
			const pokemonGroupsFiltered = pokemonGroupsFlat.filter(group => {
				const PokemonId = group[0].pokemon_id;
				if(pokedex[PokemonId] && pokedex[PokemonId].candyToEvolve !== null) { return true; }
				else { return false; }
			});
			
			// calculate detail	
			const detail = pokemonGroupsFiltered.map((group) => {
				const PokemonId = group[0].pokemon_id;	
					
				// data points
				const numberOfPokemon = group.length;
				const numberOfCandies = candy[pokedex[PokemonId].family_id].candy;
				const candiesToEvolve = pokedex[PokemonId].candyToEvolve;
					
				// calc points
				let pokemonLeft = numberOfPokemon;
				let candiesLeft = numberOfCandies;	
			        let evolutionCount = 0;
				let transferCount = 0;
				let numberToCatch = 0;	
				let numberCandyNeeded = 0;

				// start evolution calculations	
				for(let i = numberOfPokemon; i > 0; i--) {
					// try to evolve	
					if(candiesLeft >= candiesToEvolve) {
						evolutionCount++;	
						pokemonLeft--;
						candiesLeft -= (candiesToEvolve - 1); // evolving gets you one candy	
					} // check if evolution is possible through trading
					else if((candiesLeft + (pokemonLeft - 1)) >= candiesToEvolve) { 
						transferCount++;	
						pokemonLeft--;
						candiesLeft++;	
					}
				}
				
				// check for unused candy
				if(pokemonLeft === 0 && candiesLeft >= candiesToEvolve) {
					// figure out how many pokemon you need to use remaining candy
					numberToCatch = Math.floor(candiesLeft / candiesToEvolve); 
				} 
				else if (pokemonLeft === 0 && candiesLeft > 0) {
					
					// every pokemon catch is 2 candy. (catch 1 + trade 1)
					// add 1 because you need a pokemon to evolve
					numberToCatch = (Math.floor((candiesToEvolve - candiesLeft) / 2) + 1); 
				}

				// check for candy needed
				if(pokemonLeft !== 0) {
					numberCandyNeeded = (candiesToEvolve - (candiesLeft + (pokemonLeft - 1)));
				}
				
				// create report for the pokemon group	
				return {
					pokemon: {
						pokemonId: PokemonId,
						img: pokedex[PokemonId].img,
						candiesToEvolve: candiesToEvolve,	
					},
					inventory: {
						numberOfCandies: numberOfCandies,
						numberOfPokemon: numberOfPokemon,
					},
					outcome: {
						numberOfEvolutions: evolutionCount,
						numberOfTransfers: transferCount,
						experienceGained: (evolutionCount * expPerEvolution),
						timeEvolving: (evolutionCount * avgEvolutionTime),  
						candieLeft: candiesLeft, 
						pokemonLeft: pokemonLeft,	
						toCatch: numberToCatch,
						candyNeeded: numberCandyNeeded
					}
				};
			});

			// calculate summary
			const summary = detail.reduce((map,group) => {	
				
				// add to totals
				map.totalTime += group.outcome.timeEvolving;
				map.totalExp += group.outcome.experienceGained;
				//map.levelsGained //TODO
				
				// check if its worth doing a lucky egg	
				if(map.totalTime >= luckyEggDuration) { map.useLuckyEgg = true; } 
				return map;

			},{ useLuckyEgg:false, totalTime:0, totalExp:0, levelsGained:0 });
			
			// return final report
			return {
				summary: summary,
				detail: detail
			};	
		default: // default return on unknown action type
			return state;
	}
}

export default luckyEggReport;
