import React from 'react';

import ProgressBar from './ProgressBar';

class LuckyEggSection extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}
	render() {
		const {
			props: { useLuckyEgg, totalTime }
		} = this;
		
		const evolutionTimeInMin = (totalTime / 60);
		
		return(
			<div className="recommendation-summary-egg">
				<img src="https://fevgames.net/wp-content/uploads/2016/07/luckyegg.png" height="50" width="50" />	
				<span> You should {(useLuckyEgg) ? 'use a lucky egg' : 'not use a lucky egg.' } </span>
				<ProgressBar totalTime={totalTime} />
			</div>	
		);			
	}
}

LuckyEggSection.Proptypes = {
	useLuckyEgg: React.PropTypes.bool.isRequired, 
	totalTime: React.PropTypes.number.isRequired, 
}

export default LuckyEggSection;
