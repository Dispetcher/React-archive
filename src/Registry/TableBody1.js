import React from 'react';

class TableBody extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			companies: [],
			filteredArr: [],
			paginate: false,
			cLen: null,
			filtered: []
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

	/*static getDerivedStateFromProps(props, state){
		if(state.companies !== state.prevPropsList || state.prevFilteredArr !== state.filteredArr){
			return {
			prevPropsList: state.companies,
			prevFilteredArr: state.filteredArr,
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
			}
		}
	}

	/*componentDidUpdate(){
		const res = this.state.filteredArr.map( c => {
			return(<tr className="item body" key={c.ID_AGENT} onClick={ e => this.openUp(c.ID_AGENT, c.MEMBERNAME)}>
            	<td className="agent_id">{c.ID_AGENT}</td>
            	<td>{c.REESTR_NUM}</td>
            	<td className="orgstatus">{c.AGENTSTATUSE}</td>
            	<td>{c.MEMBERNAME}</td>
            	<td>{c.INN}</td>
           		<td>{c.OGRN}</td>
        		</tr>
        	)
		});	

		this.setState({res:res, cLen:res.length});
		this.props.callbackFromRegistryPag(true, this.state.cLen);

	}*/

	render(){
		const arr = this.state;
		
		return (
			<tbody>{arr.companies}</tbody>
		);		
	}

	rePaginate = (res) => {
		let len = res.length;
		this.props.callbackFromRegistryPag(true, len);
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
