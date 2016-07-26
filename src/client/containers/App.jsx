import React from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = (state) => {
	return {
		app: state.app
	};
};
/*
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		login: login
	}, dispatch);
};
*/
export default connect(
	mapStateToProps//,
	//	mapDispatchToProps
)(App);

