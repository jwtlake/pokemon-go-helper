import React from 'react';

class Summary extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { individual_attack, individual_defense, individual_stamina } 
		} = this;

		const maxPower = 45;
		const perfectLevel = (((individual_attack + individual_defense + individual_stamina) / maxPower) * 100).toFixed(0); 

		return(
			<div className="pokemon-detail-group-summary">
				
					<span className="outcome-group">	
						<span className="outcome-group-text">{perfectLevel}%</span>
						<span className="outcome-group-label">Perfect</span>
					</span>
			</div>	
		);			
	}
}

Summary.Proptypes = {
	individual_attack: React.PropTypes.number.isRequired,
	individual_defense: React.PropTypes.number.isRequired,
	individual_stamina: React.PropTypes.number.isRequired
}

export default Summary;
