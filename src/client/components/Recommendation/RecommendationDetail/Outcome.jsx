import React from 'react';

class Outcome extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { numberOfEvolutions, numberOfTransfers, experienceGained, timeEvolving, candieLeft, pokemonLeft, toCatch, candyNeeded } 
		} = this;
		
		const expK = (experienceGained / 1000)	
		const override = {
			transfer: false,
			evolutions: false,
			exp: false,
			catch: false,
			candy: false	
		};

		return(
			<div className="outcome">
				
				{(numberOfTransfers !== 0 || override.transfer === true) ?	
					<span className="outcome-group">	
						<span className="outcome-group-text">{numberOfTransfers}</span>
						<span className="outcome-group-label">Transfer</span>
					</span>
					:
					''	
				}

				{(numberOfEvolutions !== 0 || override.evolutions === true) ? 
					<span className="outcome-group">	
						<span className="outcome-group-text">{numberOfEvolutions}</span>
						<span className="outcome-group-label">Evolve</span>
					</span>
					:
					''	
				}	

				{(expK !== 0 || override.exp === true) ? 
					<span className="outcome-group">	
						<span className="outcome-group-text">{expK}{(expK !== 0) ? 'K' : ''}</span>
						<span className="outcome-group-label">EXP</span>
					</span>	
					:
					''	
				}

				{(toCatch !== 0 || override.catch === true) ? 
					<span className="outcome-group">
						<span className="outcome-group-text-needed">{toCatch}</span>
						<span className="outcome-group-label">Catch</span>
					</span>
					:
					''	
				}
				{(candyNeeded !== 0 || override.candy === true) ? 
					<span className="outcome-group">
						<span className="outcome-group-text-needed">{candyNeeded}</span>
						<span className="outcome-group-label">Candy</span>
					</span>
					:
					''	
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
	toCatch: React.PropTypes.number.isRequired,
	candyNeeded: React.PropTypes.number.isRequired
}

export default Outcome;
