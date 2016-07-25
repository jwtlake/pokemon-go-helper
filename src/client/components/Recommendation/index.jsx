import React from 'react';

import RecommendationSummary from './RecommendationSummary';
import RecommendationDetail from './RecommendationDetail';

class Recommendation extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { summary, detail } 
		} = this;

		return(
			<div className="recommendation">
			
				<RecommendationSummary
					useLuckyEgg={summary.useLuckyEgg}
					totalTime={summary.totalTime}
					totalExp={summary.totalExp}
					levelsGained={summary.levelsGained}
				/>
			
				<hr className="recommendation-hr"/>	
				
				<div className="recommendation-detail">	
					{detail.map(group => {
						return(
							<RecommendationDetail
								key={group.pokemon.PokemonId}
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

Recommendation.Proptypes = {
	summary: React.PropTypes.object.isRequired,
	detail: React.PropTypes.array.isRequired
}

export default Recommendation;
