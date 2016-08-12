import React from 'react';
import { browserHistory } from 'react-router';

const GOOGLE_AUTH_PATH =  "https://accounts.google.com/o/oauth2/auth?client_id=848232511240-73ri3t7plvk96pj4f85uj8otdat2alem.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=openid%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email";

class Google extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			geoAPI: true,	
			token: '',
			lat: '',
			lnd: '',
			alt: 0 ,
		}; 
	
		// binds
		this.handleLatChange = this.onHandleChange.bind(this, 'lat');
		this.handleLndChange = this.onHandleChange.bind(this, 'lnd');
		this.handleTokenChange = this.onHandleChange.bind(this, 'token');
		this.handleAuthClick = this.onAuthClick.bind(this);
		this.handleLoginClick = this.onLoginClick.bind(this);
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

	onHandleChange(type, event) {

		// handle change	
		switch (type) {
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

	onAuthClick(){
		window.open(GOOGLE_AUTH_PATH);
	}

	onLoginClick(type){
			
		const {token} = this.state;
		const {lat} = this.state; 
		const {lnd} = this.state; 
		const {alt} = this.state;

		// try to get geolocation
		if(lat === '' || lnd === '') {
			this.setState({ geoAPI: false });
			alert('Unable to get geolocation.');
			return;
		} 

		// create auth object
		let auth = {
			type : 'google' 
		}
		
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
			state: { token, lat, lnd }
		} = this;

		return(
			<div className="login-form-body" >
				<span className="login-form-header">
					Google
				</span>
				<button className="login-form-body-button-google" onClick={this.handleAuthClick}>
					Get Auth Token
				</button>
				<input 
					name="token"	
					className="login-form-body-input" 
					type="token" 
					placeholder="Auth Token Code" 
					value={token} 
					onChange={this.handleTokenChange} 
				/>
				{(this.state.geoAPI) ? '' 
					: <input 
						className="login-form-body-input" 
						type="text" 
						placeholder="Latitude" 
						value={lat} 
						onChange={this.handleLatChange} 
					/>
				}	
				{(this.state.geoAPI) ? '' 
					: <input 
						className="login-form-body-input" 
						type="text" 
						placeholder="Longitude" 
						value={lnd} 
						onChange={this.handleLndChange} 
					/>
				}
				
				<button className="login-form-body-button-ptc" onClick={this.handleLoginClick}>
					Login	
				</button>
			</div>
		);			
	}
}

export default Google;
