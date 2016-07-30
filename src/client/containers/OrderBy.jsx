import React from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { orderBy } from '../action_creators.js';

import OrderBy from '../components/shared/OrderBy';

const mapStateToProps = (state, ownProps) => {
	return {
		options: state.app[ownProps.page],
		page: ownProps.page 
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
)(OrderBy);

