import React from 'react';
/*import Popup from '../Popup/Popup'; */

class TableBody extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			companies: [],
			filteredArr: [],
			prevCompaniesList: [],
			prevFilterNumR: [],
			prevFilterStatus: [],
			prevFilterName: [],
			prevFilterInn: [],
			prevFilterOgrn: [],
			paginate: false,
			cLen: null,
			stopCheck: 0
		}
	}

	componentDidMount(){
		fetch('http://db/compslist.php')
		.then( response => response.json())
		.then( data => {
			var len = data.length;
			this.setState({companies:data, paginate:true, cLen:len});
			this.props.callbackFromRegistryPag(this.state.paginate, this.state.cLen);
		});
	}


	componentWillUnmout(){
		this.props.callbackFromRegistryPag(this.state.paginate,this.state.filteredArr.length);
	}

	static getDerivedStateFromProps = (props, state) => {
		if(state.companies.length !== state.prevCompaniesList.length || state.prevFilterNumR.length !== props.filterNumR.length 
			|| state.prevFilterStatus.length !== props.filterStatus.length || state.prevFilterName.length !== props.filterName.length 
			|| state.prevFilterInn.length !== props.filterInn.length
			|| state.prevFilterOgrn.length !== props.filterOgrn.length){
			return({
				stopCheck: 1,
				prevCompaniesList: state.companies,
				prevFilterNumR: props.filterNumR,
				prevFilterStatus: props.filterStatus,
				prevFilterName: props.filterName,
				prevFilterInn: props.filterInn,
				prevFilterOgrn: props.filterOgrn,
				filteredArr: state.companies.filter(c=>{
					if(props.filterNumR.length === 0 || c.REESTR_NUM.toString().indexOf(props.filterNumR.toString()) !== -1){
						return c;
					}					
				}).filter(c=>{
					if(props.filterStatus.length === 0 || c.AGENTSTATUSE.toLowerCase().indexOf(props.filterStatus) !== -1){
						return c;
					}
				}).filter(c=>{
				if(props.filterName.length === 0 || c.MEMBERNAME.toLowerCase().indexOf(props.filterName) !== -1){
					return c;
					}
				}).filter(c=>{
				if(props.filterInn.length === 0 || c.INN.toString().indexOf(props.filterInn) !== -1){
					return c;
				}
				}).filter(c=>{
				if(props.filterOgrn.length === 0 || c.OGRN.toString().indexOf(props.filterOgrn) !== -1){
					return c;
				}
				})
			});	
		}else{
			return({
				filteredArr: state.filteredArr
			})
		}
	}


	render(){
		const arr = this.state;
		
		if(arr.stopCheck < 4){
			this.props.callbackFromRegistryPag(this.state.paginate,this.state.filteredArr.length);
			this.toBreak();
		}

		return(
			<tbody>
				{arr.filteredArr.map( c => 
					<tr className="item body" key={c.ID_AGENT} onClick={ e => this.openUp(c.ID_AGENT, c.MEMBERNAME)}>
            <td className="agent_id">{c.ID_AGENT}</td>
            <td>{c.REESTR_NUM}</td>
            <td className="orgstatus">{c.AGENTSTATUSE}</td>
            <td>{c.MEMBERNAME}</td>
            <td>{c.INN}</td>
            <td>{c.OGRN}</td>
        	</tr>
				)}        
      </tbody>
		);
	}

	toBreak = () => {
		this.setState({stopCheck:parseInt(this.state.stopCheck)+1});
	}


	openUp(id, name){
		document.querySelector("#popup_table").style.display = "block";

		fetch('http://db/compinfo.php', {
				method: 'POST',
				headers: {'content-type': 'application/json'}, 
				body: JSON.stringify({
					'id': id
				})
			}).then( response => response.json())
			.then( data => {
				this.props.callbackFromRegistry(id, name, data);
			});
	}

}


export default TableBody;
