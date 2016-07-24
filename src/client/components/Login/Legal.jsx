import React from 'react';

class Legal extends React.Component {
	render() {
		return(
			<div className="login-legal">
				<div className="login-legal-text"><b>Use at your own risk!</b></div> 
				<div className="login-legal-text">This is a unofficial hobby project offered with no warranty of any kind.</div>
				<div className="login-legal-text">The unofficial API used to log into your account could result in a account ban.</div>
			</div>
		);
	}
}

export default Legal;
