import React from 'react';

class Logo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			props: { } 
		} = this;

		return(
			<div className="login-logo">
			       Pokémon Go Helper	
			</div>	
		);			
	}
}

export default Logo;
