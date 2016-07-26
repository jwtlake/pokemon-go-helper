import React from 'react';

class Summary extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { cp, stamina_max, move_1, move_2, height_m, weight_kg, individual_attack, individual_defense, individual_stamina, cp_multiplier, num_upgrades, additional_cp_multiplierier } 
		} = this;


		return(
			<div className="stats">
				
					<span className="stats-group">	
						<span className="stats-group-text">{cp}</span>
						<span className="stats-group-label">CP</span>
					</span>
					<span className="stats-group">	
						<span className="stats-group-text">{individual_attack}</span>
						<span className="stats-group-label">Attack</span>
					</span>
					<span className="stats-group">	
						<span className="stats-group-text">{individual_defense}</span>
						<span className="stats-group-label">Defense</span>
					</span>
					<span className="stats-group">	
						<span className="stats-group-text">{individual_stamina}</span>
						<span className="stats-group-label">Stamina</span>
					</span>
			</div>	
		);			
	}
}

Summary.Proptypes = {
	cp: React.PropTypes.number.isRequired,
	stamina_max: React.PropTypes.number.isRequired,
	move_1: React.PropTypes.number.isRequired,
	move_2: React.PropTypes.number.isRequired,
	height_m: React.PropTypes.number.isRequired,
	weight_kg: React.PropTypes.number.isRequired,
	individual_attack: React.PropTypes.number.isRequired,
	individual_defense: React.PropTypes.number.isRequired,
	individual_stamina: React.PropTypes.number.isRequired,
	cp_multiplier: React.PropTypes.number.isRequired,
	num_upgrades: React.PropTypes.number.isRequired,
	additional_cp_multiplier: React.PropTypes.number.isRequired
}

export default Summary;
