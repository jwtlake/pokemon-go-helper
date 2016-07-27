import React from 'react';

class Avatar extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { name, img, cp }
		} = this;
	
		// gender check
		let finalName = name;	
		if(name.substr(name.length - 7) === '_FEMALE')
			finalName = name.split('_FEMALE').join('♀');
		if(name.substr(name.length - 5) === '_MALE')
			finalName = name.split('_MALE').join('♂'); 

		return(
			<div className="avatar">
				{(false) ? <span className="avatar-text-cp">{cp}</span> : <span/> /* didn't look so good holding for now*/ }	
				<img className="avatar-image" src={img} />
				<span className="avatar-text-name">{finalName}</span>	
			</div>	
		);			
	}
}

Avatar.Proptypes = {
	name: React.PropTypes.string.isRequired,
	img: React.PropTypes.string.isRequired,
	cp: React.PropTypes.string.isRequired
} 

export default Avatar;  
