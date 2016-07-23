import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import Login from '../components/Login';

const mapStateToProps = (state) => {
	return {
		app: state.app
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (user, pass, type) => {
			console.log(`Login: ${user} Pass: ${pass} Type: ${type}`);	
		}	
	};
};

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		const { 
			props: { app }
		} = this;
		
		return(
			<Login app={app} />
		);	
	}
};

LoginContainer.propTypes = {
	app: React.PropTypes.object.isRequired
};

LoginContainer.defaultProps = {
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer);

