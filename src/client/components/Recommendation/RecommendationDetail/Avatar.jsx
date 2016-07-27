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
		
		// gender check
		let finalName = name;	
		if(name.substr(name.length - 7) === '_FEMALE')
			finalName = name.split('_FEMALE').join('♀');
		if(name.substr(name.length - 5) === '_MALE')
			finalName = name.split('_MALE').join('♂'); 
		
		return(
			<div className="avatar">
				<img className="avatar-image" src={img} />
				<span className="avatar-text-name">{finalName}</span>	
			</div>	
		);			
	}
}

Avatar.Proptypes = {
	name: React.PropTypes.string.isRequired,
	img: React.PropTypes.string.isRequired
} 

export default Avatar;  
