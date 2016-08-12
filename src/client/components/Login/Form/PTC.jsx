import React from 'react';
import { browserHistory } from 'react-router';

class PTC extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			geoAPI: true,	
			user: '',
			password: '',
			lat: '',
			lnd: '',
			alt: 0 ,
		}; 
	
		// binds
		this.handleUserChange = this.onHandleChange.bind(this, 'user');
		this.handlePasswordChange = this.onHandleChange.bind(this, 'password');
		this.handleLatChange = this.onHandleChange.bind(this, 'lat');
		this.handleLndChange = this.onHandleChange.bind(this, 'lnd');
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
  			default:
				break;
		}
	}

	onLoginClick(type){

		const {user} = this.state; 
		const {password} = this.state; 
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
			type : 'ptc' 
		}

		auth.user = user;
		auth.pass = password;

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
			state: { user, password, lat, lnd }
		} = this;

		return(
			<div className="login-form-body">
				<span className="login-form-header">
					Pokémon Trainer Club
				</span>	
				<input	
				        name="user"	
					className="login-form-body-input" 
					type="text" 
					placeholder="Username" 
					value={user} 
					onChange={this.handleUserChange} 
				/>
				<input 
					name="password"	
					className="login-form-body-input" 
					type="password" 
					placeholder="Password" 
					value={password} 
					onChange={this.handlePasswordChange} 
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
					Sign in	
				</button>	
			</div>
		);			
	}
}

export default PTC;
