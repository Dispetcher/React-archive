import React from 'react';

class CloseWindow extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
				<div>
	        <span className="close" onClick={this.hide}></span>
        </div>
			);
	}

	hide = ()=>{
		document.querySelector('#popup_table').style.display ='none';
		this.props.callbackFromPopup();
	}

}

export default CloseWindow;