import React from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import { orderBy } from '../action_creators.js';
import LuckyEgg from '../components/LuckyEgg';

const mapStateToProps = (state) => {
	return {
		app: state.app,
		options: state.app.luckyegg,	
		summary: state.luckyEggReport.summary,
		detail: state.luckyEggReport.detail
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		setOrderBy: orderBy 
	}, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LuckyEgg);
