import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class OrderBy extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	
		//binds
		this.onOrderByClick = this.onOrderByClick.bind(this);
	}
	
	onOrderByClick() {
		const name = this.props.page;
		const options = this.props.options.orderBy;
		
		// switch options based on page #TODO make this less hacky	
		if(name === 'pokemon') {
			if(options === 'recent')	
				this.props.setOrderBy('pokemon','perfect');
			else if(options === 'perfect')	
				this.props.setOrderBy('pokemon','number');
			else if(options === 'number')	
				this.props.setOrderBy('pokemon','cp');
			else 
				this.props.setOrderBy('pokemon','recent');
		} else {
			// lucky egg page
			if(options === 'evolutions')	
				this.props.setOrderBy('luckyegg','transfers');
			else if(options === 'transfers')	
				this.props.setOrderBy('luckyegg','number');
			else 
				this.props.setOrderBy('luckyegg','evolutions');
		}	
	}	

	render() {
		const {
			props: { options, setOrderBy } 
		} = this;
		
		const orderBy = options.orderBy;
		let orderByText; 
		
		switch(orderBy) {
			case 'recent':
				orderByText = 'RC';
				break;
			case 'perfect':
				orderByText = '%';
				break;
			case 'number':
				orderByText = '#';
				break;
			case 'cp':
				orderByText = 'CP';
				break;
			case 'evolutions':
				orderByText = 'EVO';
				break;
			case 'transfers':
				orderByText = 'XFER';
				break;
			default:
				orderByText = 'error';	
		}

		return(
			<div className="order-by-button" onClick={this.onOrderByClick}>
				{orderByText}
			</div>
		);
	}
}

OrderBy.Proptypes = {
	page: React.PropTypes.string.isRequired,
	options: React.PropTypes.object.isRequired,
}

export default OrderBy;
