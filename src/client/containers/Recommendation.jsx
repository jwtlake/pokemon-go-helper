import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import RecommendationSummary from '../components/RecommendationSummary';
import RecommendationDetail  from '../components/RecommendationDetail';

const mapStateToProps = (state) => {
	return {
		summary: state.recommendation.summary,
		detail: state.recommendation.detail
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDetails: (pokedexId) => {
			console.log('getDetails: ' + pokedexId);	
		}	
	};
};

class Recommendation extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		const { 
			props: { summary, detail }
		} = this;
		
		return(
			<div>
				<div className="summary">
					<RecommendationSummary
						useLuckyEgg={summary.useLuckyEgg}
						totalTime={summary.totalTime}
						totalExp={summary.totalExp}
						levelsGained={summary.levelsGained}
					/>
				</div>
				<div className="recommendation">	
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
};

Recommendation.propTypes = {
	summary: React.PropTypes.object.isRequired,	
	detail: React.PropTypes.array.isRequired	
};

Recommendation.defaultProps = {
	summary: { useLuckyEgg: false, totalTime:0, totalExp:0, levelsGained:0 },
	detail: []
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Recommendation);
