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
			props: { pokemon, pokedex} 
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
					aPokemon.name = pokedex[PokemonId].name;
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
	pokemon: React.PropTypes.array.isRequired
}

export default Pokemon;
