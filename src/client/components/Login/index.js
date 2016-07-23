import React from 'react';


import Logo from './Logo.jsx';
import LoginButton from './LoginButton.jsx';

export default class Login extends React.Component {
	render() {
		return(
			<div className="login">
				<Logo />	
				<LoginButton />
			</div>
		);
	}
};
