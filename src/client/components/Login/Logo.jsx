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
			       Pokemon Go Helper	
			</div>	
		);			
	}
}

export default Logo;
