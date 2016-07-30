import React from 'react';

import LuckyEggSection from './LuckyEggSection';
import ReportSection from './ReportSection';

class Summary extends React.Component {
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
			<div className="recommendation-summary">
				<LuckyEggSection useLuckyEgg={useLuckyEgg} totalTime={totalTime} />
				<ReportSection totalTime={totalTime} totalExp={totalExp} levelsGained={levelsGained} />
			</div>	
		);			
	}
}

Summary.Proptypes = {
	useLuckyEgg: React.PropTypes.bool.isRequired, 
	totalTime: React.PropTypes.number.isRequired, 
	totalExp: React.PropTypes.number.isRequired, 
	levelsGained: React.PropTypes.number.isRequired
}

export default Summary;
