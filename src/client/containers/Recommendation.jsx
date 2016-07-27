import React from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import { filter } from '../action_creators.js';
import Recommendation from '../components/Recommendation';

const mapStateToProps = (state) => {
	return {
		proto: state.proto,	
		summary: state.recommendation.summary,
		detail: state.recommendation.detail
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		filter: filter
	}, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Recommendation);
