import React from 'react';

class RecommendationSummary extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}
	render() {
		const {
			props: { useLuckyEgg, totalTime, totalExp, levelsGained }
		} = this;
		
		const evolutionTimeInMin = (totalTime / 60);
		
		return(
			<div>
				<span> You should {(useLuckyEgg) ? 'use a lucky egg' : 'not use a lucky egg.' } </span>
				<span> EXP Gain: {totalExp} </span>
				<span> Time Evolving: {evolutionTimeInMin} Min. </span>
				<span> Level Gain: {levelsGained} </span>
			</div>	
		);			
	}
}

export default RecommendationSummary;
