import React from 'react';


import Logo from './Logo.jsx';
import LoginForm from './LoginForm';
import Legal from './Legal';

export default class Login extends React.Component {
	render() {
		return(
			<div className="login">
				<Logo />
				<LoginForm />
				<Legal />	
			</div>
		);
	}
};
