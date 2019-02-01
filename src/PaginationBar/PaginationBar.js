import React from 'react';

class PaginationBar extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			pages: [],
			start: 0
		}
	}

	static getDerivedStateFromProps = (props, state) => {
		if(!props.pages){
			return({
				pages: []
			})
		}else if(state.pages.length !== props.pages.length){
			return({
				pages: props.pages,
				start: 1
			})
		}
	}

	render(){

		if(this.state.start < 4 && this.state.start > 0){
			this.props.callbackFromAppRepaginate();
			this.toBreak();
		}

		return(
			<div className="bottom_table">
  			<div className="btm_cell serv_cells tostart" onClick={ e => this.openMore(1)}> в начало </div>
  			<div className="btm_cell serv_cells" onClick={e => this.openMore('prev')}> предыдущая </div>
 				<div className="btm_cell serv_cells" onClick={e => this.openMore('empty')}> .. </div>
 				
 				{this.props.pages.map( (num, index) =>
 					<div className="btm_cell" key={index.toString()+'pag'} onClick={e => this.openMore(num)}>{num}</div>
 				)}	

 				<div className="btm_cell serv_cells" onClick={e => this.openMore('next')}> следующая </div>
  			<div className="btm_cell serv_cells toend" onClick={e => this.openMore('max')}> в конец </div>
			</div>

			);
	}

	openMore(n){
		this.props.callbackFromAppChangePage(n);
	}

	toBreak = () => {
		this.setState({start:parseInt(this.state.start)+1});
	}
}

export default PaginationBar;