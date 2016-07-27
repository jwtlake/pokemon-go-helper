import React from 'react';

import Avatar from './Avatar';
import Inventory from './Inventory';
import Outcome from './Outcome';

class RecommendationDetail extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { pokemon, inventory, outcome }
		} = this;

		return(
			<div className="recommendation-detail-group">
				<Avatar
					name={pokemon.name}
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
				/>
			</div>	
		);			
	}
}

RecommendationDetail.Proptypes = {
	pokemon: React.PropTypes.object.isRequired,
	inventory: React.PropTypes.object.isRequired,
	outcome: React.PropTypes.object.isRequired
} 

export default RecommendationDetail; 
