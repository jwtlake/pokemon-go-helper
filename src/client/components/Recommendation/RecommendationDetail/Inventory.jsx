import React from 'react';

class Inventory extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { numberOfPokemon, numberOfCandies }
		} = this;

		return(
			<div className="inventory">
				
				<div className="inventory-group">
					<span className="inventory-group-text">{numberOfPokemon}</span>
					<span className="inventory-group-label">Pokémon</span>	
				</div>	
				
				<div className="inventory-group">
					<span className="inventory-group-text">{numberOfCandies}</span>
					<span className="inventory-group-label">Candy</span>	
				</div>	
				
			</div>	
		);			
	}
}

Inventory.Proptypes = {
	numberOfPokemon: React.PropTypes.number.isRequired,
	numberOfCandies: React.PropTypes.number.isRequired
} 

export default Inventory;  
