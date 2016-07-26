import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
	render() {
		return(
			<div className="app">
				<div className="app-header">
					<Link to={'/login'}>Login</Link>
					<Link to={'/pokemon'}>Pokemon</Link>
					<Link to={'/recommendation'}>Recommendation</Link>
				</div>	
				{this.props.children}
			</div>
		);
	}
};
