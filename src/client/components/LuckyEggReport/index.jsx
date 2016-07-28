import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { browserHistory } from 'react-router';

import Summary from './Summary';
import Detail from './Detail';

class LuckyEggReport extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	
		// binds
	}
	
	componentWillMount() {
		// redirect to login if not logged in	
		if(!this.props.app.loggedIn) {
			browserHistory.push('/login');
		}
	}

	render() {
		const {
			props: { proto, summary, detail } 
		} = this;

		const sortedDetail = detail.sort((a,b) => {
			
			// sort by evolution count first	
			var evolutions = (b.outcome.numberOfEvolutions - a.outcome.numberOfEvolutions);
			if(evolutions !== 0) { return evolutions; }	
			
			// sort by pokemon to catch second	
			var toCatch = (a.outcome.toCatch - b.outcome.toCatch);
			if(toCatch !== 0) { return toCatch; }	
			

			// sort by candy needed thrid 
			var candyNeeded = (a.outcome.candyNeeded - b.outcome.candyNeeded);
			if(candyNeeded !== 0) { return candyNeeded; }	
		});

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
			</div>	
		);
	}
}

LuckyEggReport.defaultProps = {
	summary: { useLuckyEgg: false, totalTime:0, totalExp:0, levelsGained:0 },
	detail: []
};

LuckyEggReport.Proptypes = {
	summary: React.PropTypes.object.isRequired,
	detail: React.PropTypes.array.isRequired
}

export default LuckyEggReport;
