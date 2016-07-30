import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { browserHistory } from 'react-router';

import Summary from './Summary';
import Detail from './Detail';
import OrderBy from '../../containers/OrderBy';

class LuckyEgg extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	
		// binds
		this.orderBy = this.orderBy.bind(this);
	}
	
	componentWillMount() {
		// redirect to login if not logged in	
		if(!this.props.app.loggedIn) {
			browserHistory.push('/login');
		}
	}

	render() {
		const {
			props: { options, proto, summary, detail } 
		} = this;

		// sort
		const sortedDetail = this.orderBy(detail, options.orderBy); 

		return(
			<div className="recommendation">
			
				<Summary
					useLuckyEgg={summary.useLuckyEgg}
					totalTime={summary.totalTime}
					totalExp={summary.totalExp}
					levelsGained={summary.levelsGained}
				/>
			
				<hr className="recommendation-hr"/>	
				
				<div className="recommendation-detail">	
					{sortedDetail.map(group => {
						return(
							<Detail
								key={group.pokemon.pokemonId}
								proto={proto}	
								pokemon={group.pokemon}
								inventory={group.inventory}
								outcome={group.outcome}	
							/>
						);			
					})}
				</div>

				<OrderBy page={'luckyegg'} />
			</div>	
		);
	}

	orderBy(detail, orderBy) {
		
		switch(orderBy) {
			
			// order by number of evolutions
			case 'evolutions':	
				return detail.sort((a,b) => {
					// sort by evolution count first	
					const evolutions = (b.outcome.numberOfEvolutions - a.outcome.numberOfEvolutions);
					if(evolutions !== 0) { return evolutions; }	
			
					// sort by pokemon to catch second	
					const toCatch = (a.outcome.toCatch - b.outcome.toCatch);
					if(toCatch !== 0) { return toCatch; }	
			
					// sort by candy needed thrid 
					const candyNeeded = (a.outcome.candyNeeded - b.outcome.candyNeeded);
					if(candyNeeded !== 0) { return candyNeeded; }	
			});
	
			// order by pokedex id
			case 'number':
				return detail.sort((a,b) => {
					
					// sort by pokedex id	
					const aPokedexId = a.pokemon.pokemonId;
					const bPokedexId = b.pokemon.pokemonId;
					return aPokedexId - bPokedexId;	
				});
			
			// order by pokedex id
			case 'transfers':
				return detail.sort((a,b) => {
					
					// sort by number of transfers first
					const transfers = (b.outcome.numberOfTransfers- a.outcome.numberOfTransfers);
					if(transfers !== 0) { return transfers; }	

					// then sort by evolution count
					const evolutions = (b.outcome.numberOfEvolutions - a.outcome.numberOfEvolutions);
					if(evolutions !== 0) { return evolutions; }	


				});
				
			// else return unsorted
			default:
				return detail;
		}

	}
}

LuckyEgg.defaultProps = {
	summary: { useLuckyEgg: false, totalTime: 0, totalExp: 0, levelsGained: 0 },
	detail: []
};

LuckyEgg.Proptypes = {
	options: React.PropTypes.object.isRequired,	
	summary: React.PropTypes.object.isRequired,
	detail: React.PropTypes.array.isRequired
}

export default LuckyEgg;
