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
		
		const expK = (experienceGained / 1000)	
		const override = {
			transfer: true,
			evolutions: true,
			exp: true,
			catch: false	
		};

		return(
			<div className="outcome">
				
				{(numberOfTransfers !== 0 || override.transfer === true) ?	
					<span className="outcome-group">	
						<span className="outcome-group-text">{numberOfTransfers}</span>
						<span className="outcome-group-label">Transfer</span>
					</span>
					:
					<span/>	
				}

				{(numberOfEvolutions !== 0 || override.evolutions === true) ? 
					<span className="outcome-group">	
						<span className="outcome-group-text">{numberOfEvolutions}</span>
						<span className="outcome-group-label">Evolve</span>
					</span>
					:
					<span/> 	
				}	

				{(expK !== 0 || override.exp === true) ? 
					<span className="outcome-group">	
						<span className="outcome-group-text">{expK}{(expK !== 0) ? 'K' : ''}</span>
						<span className="outcome-group-label">EXP</span>
					</span>	
					:
					<span/>
				}

				{(toCatch !== 0 || override.catch === true) ? 
					<span className="outcome-group">
						<span className="outcome-group-text-catch">{toCatch}</span>
						<span className="outcome-group-label">Catch</span>
					</span>
					:	
					<span/>	
				}	
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
