import React from 'react';

class Avatar extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { name, imageURL }
		} = this;

		return(
			<div className="avatar">
				<img className="avatar-image" src={imageURL} />
				<span className="avatar-text">{name}</span>	
			</div>	
		);			
	}
}

Avatar.Proptypes = {
	name: React.PropTypes.string.isRequired,
	imageURL: React.PropTypes.string.isRequired
} 

export default Avatar;  
