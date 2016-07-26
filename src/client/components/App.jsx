import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
	render() {
		const {
			props: { app }
		} = this;
		
		const isLoggedIn = app.loggedIn;

		return(
			<div className="app">
				<div className="app-header">
					{(isLoggedIn) ?
					       	<div>	
						<Link to={'/pokemon'}>Pokemon</Link>
						<Link to={'/recommendation'}>Recommendation</Link>
						</div>
						:
						<Link to={'/login'}>Login</Link>
					}	
					
				</div>	
				{this.props.children}
			</div>
		);
	}
};
