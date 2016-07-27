import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PokemonDetail from './PokemonDetail';

class Pokemon extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		// binds
	}

	render() {
		const {
			props: { pokemon, pokedex, proto } 
		} = this;
		
		// sum specs and sort by most powerful
		const sortedByPower = pokemon.sort((a,b) => {
			const aPower = (a.individual_attack + a.individual_defense + a.individual_stamina);
			const bPower = (b.individual_attack + b.individual_defense + b.individual_stamina);
			return bPower - aPower;
		}); 

		return(
			<div className="pokemon">
				{sortedByPower.map(aPokemon => {

					// get missing pokemon details	
					const PokemonId = aPokemon.pokemon_id.toString();
					aPokemon.name = proto.PokemonId[PokemonId];
					aPokemon.move_1_name = proto.PokemonMove[aPokemon.move_1.toString()];
					aPokemon.move_2_name = proto.PokemonMove[aPokemon.move_2.toString()];
					aPokemon.img = pokedex[PokemonId].img;

					// return	
					return(
						<PokemonDetail
							key={(aPokemon.id.low+aPokemon.id.low)}
							pokemon={aPokemon}
						/>
					);			
				})}
			</div>	
		);
	}
}

Pokemon.Proptypes = {
	pokedex: React.PropTypes.object.isRequired,
	pokemon: React.PropTypes.array.isRequired,
	proto: React.PropTypes.object.isRequired
}

export default Pokemon;
