import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Avatar from './Avatar';
import Inventory from './Inventory';
import Outcome from './Outcome';

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		
		// binds
	}

	render() {
		const {
			props: { pokemon, proto, inventory, outcome }
		} = this;
		
		return(
			<div className="recommendation-detail-group">
				<Avatar
					name={proto.PokemonId[pokemon.pokemonId]}
					img={pokemon.img}
				/>
			
				<div className="divider" />
				
				<Inventory
					numberOfPokemon={inventory.numberOfPokemon} 
					numberOfCandies={inventory.numberOfCandies} 
				/> 
			
				<div className="divider" />
				
				<Outcome 
					numberOfEvolutions={outcome.numberOfEvolutions} 
					numberOfTransfers={outcome.numberOfTransfers} 
					experienceGained={outcome.experienceGained} 
					timeEvolving={outcome.timeEvolving} 
					candieLeft={outcome.candieLeft} 
					pokemonLeft={outcome.pokemonLeft} 
					toCatch={outcome.toCatch} 
					candyNeeded={outcome.candyNeeded} 
				/>
			</div>	
		);			
	}
}

Detail.Proptypes = {
	pokemon: React.PropTypes.object.isRequired,
	proto: React.PropTypes.object.isRequired,
	inventory: React.PropTypes.object.isRequired,
	outcome: React.PropTypes.object.isRequired
} 

export default Detail; 
