import React from 'react';
import { browserHistory } from 'react-router';

import LoginButton from './LoginButton.jsx';
const GOOGLE_AUTH_PATH =  "https://accounts.google.com/o/oauth2/auth?client_id=848232511240-73ri3t7plvk96pj4f85uj8otdat2alem.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=openid%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email";
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
			alt: 0 ,
			isGoogleLogin : false
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


	handleCheckboxChange(type , event){
		switch (type) {
			case "google":
				this.setState({ isGoogleLogin: event.target.checked });
					break;
			case "ptc" :
				this.setState({ isGoogleLogin: !event.target.checked });
					break;
			default:
				break;
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

	handleGoogleAuthButtonClicked(){
		window.open(GOOGLE_AUTH_PATH);
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
			props: { app },
			state: { isGoogleLogin }
		} = this;

		return(
			<div className="login-form">	
				<span className="login-form-header">Sign in with</span>
				<div className="login-form-body" >
					<div>
						<input type="checkbox" checked={isGoogleLogin} onChange={this.handleCheckboxChange.bind(this ,"google")} /><span>Google</span>
						<input type="checkbox" checked={!isGoogleLogin} onChange={this.handleCheckboxChange.bind(this , "ptc")} /><span>PTC</span>
					</div>
					{isGoogleLogin? '' : <input className="login-form-body-input" type="text" placeholder="Username" value={this.state.user} onChange={this.handleUserChange} />}
					{isGoogleLogin? '' : <input className="login-form-body-input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />}
					{isGoogleLogin? <input className="login-form-body-input" type="token" placeholder="Authorization code" value={this.state.token} onChange={this.handleTokenChange} /> : ''}
					{(this.state.geoAPI) ? '' : <input className="login-form-body-input" type="text" placeholder="Latitude" value={this.state.lat} onChange={this.handleLatChange} />}	
					{(this.state.geoAPI) ? '' : <input className="login-form-body-input" type="text" placeholder="Longitude" value={this.state.lnd} onChange={this.handleLndChange} />}
					{isGoogleLogin ? <button className="login-form-body-button-ptc" onClick={this.handleGoogleAuthButtonClicked}>Google Authenticate</button> : ''}
					{isGoogleLogin ? <LoginButton type={'google'} click={this.loginWithGoogle} /> : ''}
					{isGoogleLogin ? '' : <LoginButton type={'ptc'} click={this.loginWithPTC} />}
				</div>
			</div>	
		);			
	}
}

export default Form;
