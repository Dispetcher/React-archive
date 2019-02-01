import React from 'react';
import CloseWindow from './CloseWindow';
import LinkPrint from './LinkPrint';
import PopupTable from './PopupTable';

class Popup extends React.Component{

	constructor(props){
		super(props);	
		this.popupTableEl = React.createRef();
	}

	render(){
		return(
		  <div id="popup_table">
   			<div className="popup">
  		  <CloseWindow callbackFromPopup={this.clearDetails}/>
          <LinkPrint />
          <PopupTable idAgent={this.props.idAgent} name={this.props.name} details={this.props.details} ref={this.popupTableEl}/>
   		 	</div>   
    		<div className="backgr"></div>
	    </div>
		)
	}

	toMergeCells(){
		this.popupTableEl.current.mergeCells();
	}

	clearDetails = () =>{
		this.props.callbackFromAppClose();
	}

} 
export default Popup;