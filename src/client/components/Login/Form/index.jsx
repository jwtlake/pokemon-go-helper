import React from 'react';

import Google from './Google.jsx';
import PTC from './PTC.jsx';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
		}; 
	
		// binds
		this.loginWithGoogle = this.onLoginWithClick.bind(this,'google');
		this.loginWithPTC = this.onLoginWithClick.bind(this,'ptc');
	}

	onLoginWithClick(type){
		this.setState({ type: type});	
	}

	render() {
		const {
			props: { app, login },
			state: { type }
		} = this;

		return(
			<div className="login-form">	
				{(type === '') ?
					<div className="login-form-body">	
					<span className="login-form-header">Sign in with</span>
					<button className="login-form-body-button-google" onClick={this.loginWithGoogle}>
						GOOGLE
					</button>
					<button className="login-form-body-button-ptc" onClick={this.loginWithPTC}>
						POKÉMON TRAINER CLUB
					</button>
					</div>
					: ''
				}
				{(type === 'google') ? <Google login={login} /> : ''}	
				{(type === 'ptc') ? <PTC login={login} /> : ''}	
			</div>	
		);			
	}
}

export default Form;
