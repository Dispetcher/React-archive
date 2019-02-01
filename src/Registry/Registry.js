import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class Registry extends React.Component{

	constructor(props){
		super(props);
		this.name = "Реестр организаций";
		this.state = {
			numR: [],
			status:[],
			name:[],
			inn:[],
			ogrn:[]
		}
	}

	passDataToApp = (id, name, details) => {
		this.props.callbackFromApp(id, name, details);
	}

	passDataToAppPag = ( paginate, cLen) => {
		this.props.callbackFromAppPag(paginate, cLen);
	}

	passDataToTableBodyNumR = val => {this.setState({numR: val})}

	passDataToTableBodyStatus = val => {this.setState({status: val})}

	passDataToTableBodyName = val => {this.setState({name: val})}

	passDataToTableBodyInn = val => {this.setState({inn: val})}

	passDataToTableBodyOgrn = val => {this.setState({ogrn: val})}

	render(){
		return(
			<div>
				<h4 className="table_header">{this.name}</h4>
				<table className="main">
					<TableHeader callbackFromRegistryFilterNumR={this.passDataToTableBodyNumR} callbackFromRegistryFilterStatus={this.passDataToTableBodyStatus}
					callbackFromRegistryFilterName={this.passDataToTableBodyName} callbackFromRegistryFilterInn={this.passDataToTableBodyInn} callbackFromRegistryFilterOgrn={this.passDataToTableBodyOgrn}/>
					<TableBody callbackFromRegistry={this.passDataToApp} callbackFromRegistryPag={this.passDataToAppPag} filterNumR={this.state.numR}
					filterStatus={this.state.status} filterName={this.state.name} filterInn={this.state.inn} filterOgrn={this.state.ogrn}/>
		    </table>
			</div>
			);
	}


}

export default Registry;