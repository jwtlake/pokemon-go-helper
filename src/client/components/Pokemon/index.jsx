import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { browserHistory } from 'react-router';

import Detail from './Detail';
import OrderBy from '../../containers/OrderBy';

class Pokemon extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		//binds
		this.orderBy = this.orderBy.bind(this);
	}

	componentWillMount() {
		// redirect to login if not logged in	
		if(!this.props.app.loggedIn) {
			browserHistory.push('/login');
		}
	}

	render() {
		const {
			props: { options, pokemon, pokedex, proto } 
		} = this;
		
		// sort 
		const sortedPokemon = this.orderBy(pokemon, options.orderBy); 		
		
		return(
			<div className="pokemon">
				{sortedPokemon.map(aPokemon => {

					// get missing pokemon details	
					const PokemonId = aPokemon.pokemon_id.toString();
					aPokemon.name = proto.PokemonId[PokemonId];
					aPokemon.move_1_name = proto.PokemonMove[aPokemon.move_1.toString()];
					aPokemon.move_2_name = proto.PokemonMove[aPokemon.move_2.toString()];
					aPokemon.img = pokedex[PokemonId].img;

					// return	
					return(
						<Detail
							key={(aPokemon.id.low+aPokemon.id.low)}
							pokemon={aPokemon}
						/>
					);			
				})}

				<OrderBy page={'pokemon'} />	
			</div>

		);
	}

	orderBy(pokemon, orderBy) {
		
		switch(orderBy) {
			
			// order by perfectness (best possible iv stats)	
			case 'perfect':
				
				// sort by perfectness
				return pokemon.sort((a,b) => {
					const aPerf= (a.individual_attack + a.individual_defense + a.individual_stamina);
					const bPerf= (b.individual_attack + b.individual_defense + b.individual_stamina);
					return bPerf- aPerf;
				});	
				
			// order by combat power	
			case 'cp':
				return pokemon.sort((a,b) => {
					
					// sort by pokedex id first	
					const aCP= a.cp;
					const bCP= b.cp;	
					if(aCP !== bCP)
						return bCP - aCP;	
					
					// then sort by pokedex id 
					const aPokedexId = a.pokemon_id;
					const bPokedexId = b.pokemon_id;	
					if(aPokedexId !== bPokedexId)
						return aPokedexId - bPokedexId;	
						
					// then sort by perfectness
					const aPerf= (a.individual_attack + a.individual_defense + a.individual_stamina);
					const bPerf= (b.individual_attack + b.individual_defense + b.individual_stamina);
					return bPerf- aPerf;
				});	
			
			// order by pokedex id 
			case 'number':
				return pokemon.sort((a,b) => {
					
					// sort by pokedex id first	
					const aPokedexId = a.pokemon_id;
					const bPokedexId = b.pokemon_id;	
					if(aPokedexId !== bPokedexId)
						return aPokedexId - bPokedexId;	
					
					// then sort by perfectness
					const aPerf = (a.individual_attack + a.individual_defense + a.individual_stamina);
					const bPerf= (b.individual_attack + b.individual_defense + b.individual_stamina);
					return bPerf- aPerf;
				});	
			
			// else return unsorted	
			default:
				return pokemon;	
		}	
	}
}

Pokemon.Proptypes = {
	options: React.PropTypes.object.isRequired,
	pokedex: React.PropTypes.object.isRequired,
	pokemon: React.PropTypes.array.isRequired,
	proto: React.PropTypes.object.isRequired
}

export default Pokemon;
