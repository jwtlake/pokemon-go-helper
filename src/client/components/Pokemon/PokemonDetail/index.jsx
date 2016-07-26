import React from 'react';

import Avatar from './Avatar';
import Stats from './Stats';
import Perfectness from './Perfectness';

class PokemonDetail extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { pokemon }
		} = this;

		return(
			<div className="pokemon-detail-group">
				<Avatar
					name={pokemon.name} 
					img={pokemon.img}
					cp={pokemon.cp}
				/>
			
				<div className="divider" />
				
				<Stats
					cp={pokemon.cp}  
					stamina_max={pokemon.stamina_max}  
					move_1={pokemon.move_1}  
					move_2={pokemon.move_2}  
					height_m={pokemon.height_m}  
					weight_kg={pokemon.weight_kg} 										 
					individual_attack={pokemon.individual_attack}  
					individual_defense={pokemon.individual_defense}  
					individual_stamina={pokemon.individual_stamina}  
					cp_multiplier={pokemon.cp_multiplier}  
					num_upgrades={pokemon.num_upgrades}  
					additional_cp_multiplier={pokemon.additional_cp_multiplier}  		
				/> 
			
				<div className="divider" />
				
				<Perfectness
					individual_attack={pokemon.individual_attack}  
					individual_defense={pokemon.individual_defense}  
					individual_stamina={pokemon.individual_stamina}  
				/>
			</div>	
		);			
	}
}

PokemonDetail.Proptypes = {
	pokemon: React.PropTypes.object.isRequired,
} 

export default PokemonDetail; 
