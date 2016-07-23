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
				
				<div className="inventory-pokemon">
					<span className="inventory-pokemon-text">{numberOfPokemon}</span>
					<span className="inventory-label">Pokemon</span>	
				</div>	
				
				<div className="inventory-candy">
					<span className="inventory-candy-text">{numberOfCandies}</span>
					<span className="inventory-label">Candy</span>	
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
