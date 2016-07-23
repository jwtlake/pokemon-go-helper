import React from 'react';

class LoginButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hover: false }

		//binds	
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		console.log('click');
	}	

	render() {
		const {
			props: { type } 
		} = this;

		const isHover = this.state.hover;
		const text = (type === 'google') ? 'GOOGLE' : 'POKÉMON TRAINER CLUB';
		const style = (type === 'google') ? 'login-form-body-button-google' : 'login-form-body-button-ptc'; 	
		return(
			<div className={style} onClick={this.handleClick}>
				{text}	
			</div>	
		);			
	}
}

export default LoginButton;
