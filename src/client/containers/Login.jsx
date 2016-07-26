import React from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { login } from '../action_creators.js';

import Login from '../components/Login';

const mapStateToProps = (state) => {
	return {
		app: state.app
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		login: login
	}, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

