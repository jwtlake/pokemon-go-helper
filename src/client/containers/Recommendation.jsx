import React from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import { evaluate } from '../action_creators.js';
import Recommendation from '../components/Recommendation';

const mapStateToProps = (state) => {
	return {
		summary: state.recommendation.summary,
		detail: state.recommendation.detail
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		evaluate: evaluate
	}, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Recommendation);
