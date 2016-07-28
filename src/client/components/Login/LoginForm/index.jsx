import React from 'react';
import { browserHistory } from 'react-router';

import LoginButton from './LoginButton.jsx';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			password: '',
			type: '',
			lat: 45.523062,
			lnd: -122.676482,
			alt: 0

		}; // TODO Stop hard coding	
	
		//binds
		this.handleUserChange = this.handleChange.bind(this,'user');
		this.handlePasswordChange = this.handleChange.bind(this,'password');
	
		this.loginWithGoogle = this.onLoginClick.bind(this,'google');
		this.loginWithPTC = this.onLoginClick.bind(this,'ptc');
	}
	
	handleChange(type, event) {
		if(type === 'user') {	
			this.setState({user: event.target.value});
		}
		if(type === 'password')	{
			this.setState({password: event.target.value});
		}
	}

	onLoginClick(type){
		const user = this.state.user; 
		const pass = this.state.password; 
		//const type = this.state.type;  
		const lat = this.state.lat; 
		const lnd = this.state.lnd; 
		const alt = this.state.alt;

		// login	
		this.props.login(user,pass,type,lat,lnd,alt)
		.then(() => { 
			browserHistory.push('/pokemon'); 
		})
		.catch((e) => { 
			alert('ERROR: ' + e); 
		});
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
					<LoginButton type={'google'} click={this.loginWithGoogle} />	
					<LoginButton type={'ptc'} click={this.loginWithPTC} />
				</div>
			</div>	
		);			
	}
}

export default LoginForm;
