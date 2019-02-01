import React from 'react';

class PopupTable extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			details: [],
		};
	}

	componentDidMount(){
		this.mergeCells();
	}



	render(){
		const cInfo = this.state;

		/*if(this.props.idAgent > 0){
			this.fetchData();
		}*/

		return(
			<table>
        <caption className="header_name">{this.props.name}</caption> 
        	<tbody> 
        	{ this.props.details.map( (cd, index) => 
        		<tr key={index.toString()+'det'}>
          		<td className="form_col_ext">{cd.COLNAME}</td>
          		<td className="form_col_hide">{cd.COLVALUE}</td>
        		</tr>
        )}
        	</tbody>               
      </table>
    	);

	}

	fetchData = ()=>{
		/*this.setState({id: this.props.idAgent, name: this.props.name});*/
		if(this.props.idAgent && this.props.name){

			fetch('http://db/compinfo.php', {
				method: 'POST',
				headers: {'content-type': 'application/json'}, 
				body: JSON.stringify({
					'id': this.props.idAgent
				})
			}).then( response => response.json())
			.then( data => {
				this.setState({details: data});
				this.mergeCells();
				console.log(data);
			})
		}
	}

	mergeCells = () =>{
	 /*List of elements for categorizing */
	
	let col_ext = document.querySelectorAll(".form_col_ext");
	let col_hide = document.querySelectorAll(".form_col_hide");
	let arr = [2, 8, 11, 16, 19, 21, 24, 27, 35, 38, 42, 46];

	if(this.props.details.length > 1){


	for(let j = 0; j < col_ext.length; j++){
		if(col_ext[j].innerText === 'Сведения о приостановлении, о возобновлении, об отказе в возобновлении права осуществлять строительство, реконструкцию, капитальный ремонт объектов капитального строительства'){
			arr.push(j);
		}else if(col_ext[j].innerText === 'Сведения о прекращении членства в Ассоциации'){
			arr.push(j);
		}else if(col_ext[j].innerText === 'Ранее выданные свидетельства о допуске/праве'){
			arr.push(j);
		}else if(col_ext[j].innerText === 'Сведения о проведенных проверках'){
			arr.push(j);
		}else if(col_ext[j].innerText === 'Факты применения мер дисциплинарного воздействия'){
			arr.push(j);
		}
	}
		
	arr.forEach( (i, array) => {
		if(col_ext[i]){/* Checking- is the element in a DOM tree?*/
			col_ext[i].style.fontWeight ='600';
			col_ext[i].classList.add('popup_header');
			col_ext[i].setAttribute('colspan', '2');
		}

		if(col_hide[i]){/* Checking- is the element in a DOM tree?*/
			col_hide[i].style.display = 'none';
		}
	});	
	}
	}

}

export default PopupTable;