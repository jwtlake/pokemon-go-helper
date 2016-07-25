import React from 'react';

import LoginButton from './LoginButton.jsx';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user: '', password: ''};	
		
		//binds
		this.handleUserChange = this.handleChange.bind(this,'user');
		this.handlePasswordChange = this.handleChange.bind(this,'password');
		this.handleLoginClickGoogle = this.handleChange.bind(this,'google');
		this.handleLoginClickPTC = this.handleChange.bind(this,'ptc');
	}
	
	handleChange(type, event) {
		if(type === 'user') {	
			this.setState({user: event.target.value});
		}
		if(type === 'password')	{
			this.setState({password: event.target.value});
		}
	}

	handleLoginClick(type, event) {
		console.log(`User:${this.state.user} Pass:${this.state.password} Type:${type}`);	
	}

	render() {
		const {
			props: { app }
		} = this;

		return(
			<div className="login-form">	
				<span className="login-form-header">Sign in with</span>
				<div className="login-form-body" >
					<input className="login-form-body-input" type="text" placeholder="Username" value={this.state.user} onChange={this.handleUserChange} />
					<input className="login-form-body-input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
					<LoginButton type={'google'} onClick={this.handleLoginClickGoogle}/>	
					<LoginButton type={'ptc'} onClick={this.handleLoginClickPTC}/>	
				</div>
			</div>	
		);			
	}
}

export default LoginForm;
