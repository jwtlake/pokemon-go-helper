import React from 'react';

class Moves extends React.Component {
	constructor(props) {
		super(props);

		// binds
	}

	render() {
		const {
			props: { move_1, move_2 } 
		} = this;



		const moveOneSimple = move_1.split('_FAST').join('+').split('_').join('');
		const moveTwoSimple = move_2.split('_FAST').join('+').split('_').join('');

		const moveOneFull = move_1.split('_').join(''); //TODO show this as an alt 
		const moveTwoFull = move_2.split('_').join(''); //TODO show this as an alt 

		return(
			<div className="moves">
				<span className="moves-text">{moveOneSimple}</span>
				<span className="moves-text">{moveTwoSimple}</span>
			</div>	
		);			
	}
}

Moves.Proptypes = {
	move_1: React.PropTypes.string.isRequired,
	move_2: React.PropTypes.string.isRequired,
}

export default Moves;
