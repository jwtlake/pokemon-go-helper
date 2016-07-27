import React from 'react';

class ReportSection extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}
	render() {
		const {
			props: { totalTime, totalExp, levelsGained }
		} = this;
		
		const evolutionTimeInMin = (totalTime / 60);
		
		return(
			<div className="recommendation-summary-report">
				<hr className="recommendation-summary-report-section-hr" />	
				<div className="recommendation-summary-report-section">
					<span>Evolutions</span>
					<span className="recommendation-summary-report-text-red">{totalExp} XP</span>	
				</div>
				<div className="recommendation-summary-report-section">
					<span>Time</span>
					<span className="recommendation-summary-report-text-red">{evolutionTimeInMin} Min</span>	
				</div>
			</div>	
		);			
	}
}

export default ReportSection;
