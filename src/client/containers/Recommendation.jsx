import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import Recommendation from '../components/Recommendation';

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

class RecommendationContainer extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		const { 
			props: { summary, detail }
		} = this;
		
		return(
			<Recommendation summary={summary} detail={detail} />
		);	
	}
};

RecommendationContainer.propTypes = {
	summary: React.PropTypes.object.isRequired,	
	detail: React.PropTypes.array.isRequired	
};

RecommendationContainer.defaultProps = {
	summary: { useLuckyEgg: false, totalTime:0, totalExp:0, levelsGained:0 },
	detail: []
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecommendationContainer);

