import React from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import { filter } from '../action_creators.js';
import LuckyEggReport from '../components/LuckyEggReport';

const mapStateToProps = (state) => {
	return {
		app: state.app,	
		proto: state.proto,	
		summary: state.luckyEggReport.summary,
		detail: state.luckyEggReport.detail
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
)(LuckyEggReport);
