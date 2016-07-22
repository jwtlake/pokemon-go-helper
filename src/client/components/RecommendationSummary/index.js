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

		return(
			<div>
				<span> You should {(useLuckyEgg) ? 'not use a lucky egg.' : 'use a lucky egg'} </span>
				<span> EXP Gain: {totalExp} </span>
				<span> Time Evolving: {totalTime} </span>
				<span> Level Gain: {levelsGained} </span>
			</div>	
		);			
	}
}

export default RecommendationSummary;
