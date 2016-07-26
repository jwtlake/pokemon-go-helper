import React from 'react';

import Logo from './Logo.jsx';
import LoginForm from './LoginForm';
import Legal from './Legal';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			props: { app, login }
		} = this;
	
		return(
			<div className="login">
				<Logo />
				<LoginForm login={login} />
				<Legal />
			</div>
		);
	}
}

export default Login;
