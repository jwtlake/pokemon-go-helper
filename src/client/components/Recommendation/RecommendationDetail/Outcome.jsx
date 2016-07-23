import React from 'react';

class Outcome extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { numberOfEvolutions, numberOfTransfers, experienceGained, timeEvolving, candieLeft, pokemonLeft, toCatch } 
		} = this;
		return(
			<div className="outcome">
				<span className="outcome-group">	
					<span className="outcome-text">{numberOfTransfers}</span>
					<span className="outcome-label">Transfer</span>
				</span>		

				<span className="outcome-group">	
					<span className="outcome-text">{numberOfEvolutions}</span>
					<span className="outcome-label">Evolve</span>
				</span>		
						
				<span className="outcome-group">	
					<span className="outcome-text">{experienceGained}</span>
					<span className="outcome-label">EXP</span>
				</span>	
				
				<span className="outcome-group">
					<span className="outcome-text-catch">{toCatch}</span>
					<span className="outcome-label">Catch</span>
				</span>	


			</div>	
		);			
	}
}

Outcome.Proptypes = {
	numberOfEvolutions: React.PropTypes.number.isRequired,
	numberOfTransfers: React.PropTypes.number.isRequired,
	experienceGained: React.PropTypes.number.isRequired,
	timeEvolving: React.PropTypes.number.isRequired,
	candieLeft: React.PropTypes.number.isRequired,
	pokemonLeft: React.PropTypes.number.isRequired,
	toCatch: React.PropTypes.number.isRequired
}

export default Outcome;
