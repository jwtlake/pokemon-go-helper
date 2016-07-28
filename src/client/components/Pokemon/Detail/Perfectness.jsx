import React from 'react';

class Perfectness extends React.Component {
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
			<div className="perfectness">
				
					<span className="perfectness-group">	
						<span className="perfectness-group-text">{perfectLevel}%</span>
						<span className="perfectness-group-label">Perfect</span>
					</span>
			</div>	
		);			
	}
}

Perfectness.Proptypes = {
	individual_attack: React.PropTypes.number.isRequired,
	individual_defense: React.PropTypes.number.isRequired,
	individual_stamina: React.PropTypes.number.isRequired
}

export default Perfectness;
