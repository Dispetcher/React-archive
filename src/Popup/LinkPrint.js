import React from 'react';

class LinkPrint extends React.Component{
	src = "https://www.metrotunnel.ru/wp-content/plugins/sro-registry/img/printer_icon.png";
	alt = "Print Version";
	printVer = "Версия для печати";

	constructor(props){
		super(props);
		/*this.src = "https://www.metrotunnel.ru/wp-content/plugins/sro-registry/img/printer_icon.png";
		this.alt = "Print Version";
		this.printVer = "Версия для печати";*/
	}

	render(){
		return(
			<div className="lnkprint">
        <span onClick={this.openPrintVer}>
        	<img src={this.src} alt={this.alt}/>
        	<span id="linkprint">{this.printVer}</span>
        </span>
      </div>
		);
	}

}
export default LinkPrint;