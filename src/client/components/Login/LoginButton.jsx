import React from 'react';

class LoginButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hover: false }
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		console.log('click');
	}	

	render() {
		const {
			props: { } 
		} = this;

		const isHover = this.state.hover;
		return(
			<div className="login-form-button" onClick={this.handleClick}>
				POKÉMON TRAINER CLUB	
			</div>	
		);			
	}
}

export default LoginButton;
