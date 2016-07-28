import React from 'react';

class ProgressBar extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { totalTime }
		} = this;
		
		const completed = (((totalTime / 60) / 30) * 100).toFixed();
		console.log(completed);	
		var style = {
			width: completed + '%',
		};      
		
		return(
			<div className="progress-bar">
				<div style={style}></div>	
			</div>	
		);			
	}
}

ProgressBar.Proptypes = {
	totalTime: React.PropTypes.number.isRequired, 
}

export default ProgressBar;
