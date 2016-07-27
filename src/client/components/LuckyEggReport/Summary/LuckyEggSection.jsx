import React from 'react';

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
				<div></div>		
				<span> You should {(useLuckyEgg) ? 'use a lucky egg' : 'not use a lucky egg.' } </span>
			</div>	
		);			
	}
}

export default LuckyEggSection;
