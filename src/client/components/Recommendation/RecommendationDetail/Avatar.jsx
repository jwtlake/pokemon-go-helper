import React from 'react';

class Avatar extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { name, img }
		} = this;

		return(
			<div className="avatar">
				<img className="avatar-image" src={img} />
				<span className="avatar-text-name">{name}</span>	
			</div>	
		);			
	}
}

Avatar.Proptypes = {
	name: React.PropTypes.string.isRequired,
	img: React.PropTypes.string.isRequired
} 

export default Avatar;  
