import React from 'react';
import { browserHistory } from 'react-router';

import LoginButton from './LoginButton.jsx';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			geoAPI: true,	
			user: '',
			token: '',
			password: '',
			type: '',
			lat: '',
			lnd: '',
			alt: 0 
		}; 
	
		//binds
		this.handleUserChange = this.handleChange.bind(this,'user');
		this.handlePasswordChange = this.handleChange.bind(this,'password');
		this.handleLatChange = this.handleChange.bind(this,'lat');
		this.handleLndChange = this.handleChange.bind(this,'lnd');
		this.handleTokenChange = this.handleChange.bind(this , 'token');

		this.loginWithGoogle = this.onLoginClick.bind(this,'google');
		this.loginWithPTC = this.onLoginClick.bind(this,'ptc');
	}

	componentWillMount() {
		
		// check for geolocation api	
		if ("geolocation" in navigator) {
			// try to get geolocation	
			navigator.geolocation.getCurrentPosition((position) => {
				const lat = position.coords.latitude;
				const lnd = position.coords.longitude;
				
				if(lat && lnd) {
					this.setState({ geoAPI: true, lat: lat, lnd, lnd });	
				} else {
					this.setState({ geoAPI: false });
				}	
			});
		
		} else {
			this.setState({ geoAPI: false });
		}		
	}
	
	handleChange(type, event) {

		// handle change	
		switch (type) {
  			case 'user':
				this.setState({ user: event.target.value });
    				break;
			case 'password':
				this.setState({ password: event.target.value });
    				break;
			case 'lat':
				this.setState({ lat: event.target.value });
    				break;
			case 'lnd':
				this.setState({ lnd: event.target.value });
    				break;
			case 'token':
				this.setState({token : event.target.value});
					break;
  			default:
				break;
		}
	}

	onLoginClick(type){
			
		const user = this.state.user; 
		const pass = this.state.password; 
		const {token} = this.state;
		const lat = this.state.lat; 
		const lnd = this.state.lnd; 
		const alt = this.state.alt;

		// try to get geolocation
		if(lat === '' || lnd === '') {
			this.setState({ geoAPI: false });
			alert('Unable to get geolocation.');
			return;
		} 

		var auth = {
			type : type
		}

		auth.user = user;
		auth.pass = pass;
		auth.token = token;

		// login	
		this.props.login(auth,lat,lnd,alt)
		.then(() => { 
			browserHistory.push('/pokemon'); 
		})
		.catch((e) => { 
			console.dir(e);	
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
					<input className="login-form-body-input" type="token" placeholder="Google Token" value={this.state.token} onChange={this.handleTokenChange} />
					{(this.state.geoAPI) ? '' : <input className="login-form-body-input" type="text" placeholder="Latitude" value={this.state.lat} onChange={this.handleLatChange} />}	
					{(this.state.geoAPI) ? '' : <input className="login-form-body-input" type="text" placeholder="Longitude" value={this.state.lnd} onChange={this.handleLndChange} />}
					<LoginButton type={'google'} click={this.loginWithGoogle} />	
					<LoginButton type={'ptc'} click={this.loginWithPTC} />
				</div>
			</div>	
		);			
	}
}

export default Form;
