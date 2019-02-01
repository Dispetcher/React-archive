import React from 'react';
import './App.css';
import Popup from './Popup/Popup';
import Registry from './Registry/Registry';
import PaginationBar from './PaginationBar/PaginationBar';

class App extends React.Component {
  
  constructor(props){
    super(props);  
    this.state = {
    	idAgent: [],
    	name: [],
    	details: [],
    	cOnPage: 20,/* кол-во компаний на странице*/
			pNums: 1,
			row: [],
			elmPages: 1,
			compShow: []
    }  
    this.popupEl = React.createRef();
  }

  componentDidMount(){
  	document.addEventListener('keydown', (e) =>{
    	if(e.keyCode === 27){
  			document.querySelector("#popup_table").style.display = "none";
  			this.clearDataToPopup();
  		}
    });
  }

  render(){
    return( <div>
              <Popup idAgent={this.state.idAgent} name={this.state.name} details={this.state.details} ref={this.popupEl} callbackFromAppClose={this.clearDataToPopup}/>
              <Registry callbackFromApp={this.passDataToPopup} callbackFromAppPag={this.getData}/>
              <PaginationBar pages={this.state.row} callbackFromAppChangePage={this.openMore} callbackFromAppRepaginate={this.repaginate}/>
            </div>
      );
  }

  passDataToPopup = (id, name, details) => {
  	this.setState({idAgent : id, name: name, details: details}); 
  	this.popupEl.current.toMergeCells();
  }

  clearDataToPopup = () =>{
  	this.setState({details:[]});
  }

  getData = (paginate, cLen) => {
  	if(paginate === true){
  			this.compLen(cLen); /* sub func for arrPages to get page numbers */
				this.arrPages(); /* add page numbers to array*/
				this.hideOrg();
				this.paginate(1, 0);
				this.setState({elmsOnPages : document.querySelectorAll('.item.body').length});
  	}
  }  

  repaginate = () =>{
  	this.arrPages(); /* add page numbers to array*/
		this.hideOrg();
		this.paginate(1, this.state.pNums);
  }

/**** Get number of pages ****/
/*===========================*/
	compLen = cl => {
		var cOnPage = this.state.cOnPage;
		var pNums;

		if (cl%cOnPage > 0){
			pNums = (cl - cl%cOnPage) / cOnPage + 1;
			this.setState({pNums: pNums});
		}else{
			pNums = (cl - cl%cOnPage) / cOnPage;
			this.setState({pNums: pNums});
		}
		/* In case a filter returns 0 companies*/
		if(cl === 0){
			this.setState({pNums: 1});
		}
	}
/*******(End of) Get number of pages *********************/

/**** Open next-prev page with companies ****/
/*===========================*/
	openMore = (num)=>{
		let pages = document.querySelectorAll('.btm_cell');
		let curr = parseInt(document.querySelector('.curr').innerText);
		let elms = document.querySelectorAll('.main tbody tr').length;
		let compShow = document.querySelectorAll('.item.body');
		this.setState({compShow: compShow});

	/*this.compLen(this.compShow);*/

		if(window.innerWidth > 1023){

			if(num === 'prev'){
				if(curr === 1){
					num = curr;
				}else{
					num = curr-1; 
				}
			}else if(num === 'empty'){
				return 1;
			}else if(num === '...'){
				return 1;
			}else if(num === 'next'){
				if(pages.length === 7 || pages.length === 8){
					if(curr === pages.length-5){
						num = curr;
					}else{
						num = curr+1;
					}
				}else{
					if(curr === pages.length-6){
						num = curr;
					}else{
						num = curr+1;
					}
				}
			}else if(num === 'max'){
				if(pages.length === 7 || pages.length === 8){
					num = pages.length-5;
				}else{
					num = pages.length-6;
				}

			}
		}
		
		let a = 0 + this.state.cOnPage*(num-1);
		let b = this.state.cOnPage -1 + this.state.cOnPage*(num-1);

		this.paginate(num, this.state.pNums);

		if(num){
			if(b >= elms){
				this.showmore(a, elms-1);
			}else{
				this.showmore(a, b);
			}
		}	
	}

/*******(End of) Open next-prev page with companies ******/

/************ Creating pagination ***************/
/********===========================*************/
paginate = (n, len_c) =>{
	var pgs = document.querySelectorAll('.btm_cell');
	var len = pgs.length;

	this.rmvclass(pgs, len);
	if(n === len_c){
		pgs[len-3].classList.add('curr');
	}else{
		pgs[n+2].classList.add('curr');
	}

	if(len_c === 0 || len_c === len-6 || len_c === len-5){
		if(window.innerWidth > 1023){
			if(n === 1){
				this.showAll(pgs);
				this.hideAfter(pgs,n);
				if(len_c === 1){/* if there is 1 page*/
					pgs[len-2].style.display =  'none';
					pgs[len-1].style.display =  'none';
				}else if(len_c === 2){ /* if there are 2 pages*/
					pgs[len-1].style.display =  'none';
				}
				pgs[0].style.display = 'none';
				pgs[1].style.display = 'none';
				pgs[2].style.display = 'none';
			}else if(n === 2){
				this.showAll(pgs);
				this.hideAfter(pgs,n);
				if(len_c === len-5){
					pgs[len-2].style.display =  'none';
					pgs[len-1].style.display =  'none';
				}				
				pgs[0].style.display = 'none';
				pgs[2].style.display = 'none';
			}else if(n === len-8){
				this.showAll(pgs);
				this.hideBefore(pgs,n);
				pgs[len-4].style.display = 'none';
			}else if(n === len-7){
				this.showAll(pgs);
				this.hideBefore(pgs,n);
				pgs[len-4].style.display = 'none';
				pgs[len-1].style.display = 'none';
			}else if(n === len-6){
				this.showAll(pgs);
				this.hideBefore(pgs,n);
				pgs[len-4].style.display =  'none';
				pgs[len-2].style.display =  'none';
				pgs[len-1].style.display =  'none';
			}else if(n === len-5){
				if(len_c === len-5){
					this.showAll(pgs);
					this.hideBefore(pgs,n);
					if(n === 2){
						pgs[len-4].style.display =  'none';
					}					
					pgs[len-2].style.display =  'none';
					pgs[len-1].style.display =  'none';
				}
			}else{
				this.showAll(pgs);
				this.hideBefore(pgs,n);
				this.hideAfter(pgs,n);
			}
		}else{
			this.showAll(pgs);
			pgs[0].style.display = 'none';
			pgs[1].style.display = 'none';
			pgs[2].style.display = 'none';
			pgs[len-4].style.display ='none';
			pgs[len-2].style.display ='none';
			pgs[len-1].style.display ='none';
		}
	}else{
		this.showAll(pgs);
		pgs[0].style.display = 'none';
		pgs[1].style.display = 'none';
		pgs[2].style.display = 'none';
		pgs[len-4].style.display = 'none';
		pgs[len-2].style.display = 'none';
		pgs[len-1].style.display = 'none';
		for(let i=len_c+3; i<len; i++){
			pgs[i].style.display = 'none';
		}
	}
}	

/******** Sub functions for pagination **********/
/********===========================*************/

	/************ Remove classNames **************/	
rmvclass(pgs, len){
	for(let i=0; i<len-1; i++){
		pgs[i].classList.remove('curr');
	}
}
	/************ Show All pages **************/

showAll(pgs){
	for (let i=0; i < pgs.length; i++){
		pgs[i].style.display = 'inline-block';
	}
}
	/************ Hide Before necessary page **************/

hideBefore(pgs, n){
	for (let i=3; i < n+1; i++){
		pgs[i].style.display = 'none';
	}
}
	/************ Hide After necessary page **************/

hideAfter(pgs, n){
	for (let i=n+4; i < pgs.length - 4; i++){
		pgs[i].style.display = 'none';
	}
}
/*******(End of) Sub functions for pagination ******/

/**** Adding array of page numbers and etc symbol (...) ****/
/*===========================*/
arrPages = () => {
	let arr = [];
	for (let i=1; i<=this.state.pNums; i++){
		if(this.state.pNums > 3){
			if(i === this.state.pNums){
				arr.push('...');
			}
		}		
		arr.push(i); 
	}
	this.setState({row: arr});
}
/*******(End of) Adding array of page numbers and etc symbol ******/

/**** Sub function to show next page -- of openMore func ****/
/*===========================*/
showmore(n_st, n_fin){
	let elm = document.querySelectorAll('.main tbody tr');
		
	for(let j=0; j < elm.length; j++){
		elm[j].style.display = 'none';
	}
	for(let j=n_st; j<=n_fin; j++){
		elm[j].style.display = 'table-row';
	}		
}
/*******(End of) Sub function to show next page ******/

/**** Sub function to hide companies -- of openMore func ****/
/*===========================*/
hideOrg = () => {
	var elmPages = document.querySelectorAll('.btm_cell').length;
	this.setState({elmPages: elmPages});
	let elms = document.querySelectorAll('.main tbody tr').length;

	if(elmPages > 5){
		if(elms > this.state.cOnPage-1){
			this.showmore(0, this.state.cOnPage-1);
		}else{
			this.showmore(0, elms-1);
		}
	}
}
/*******(End of) Sub function to hide companies ******/

/**** Sub function to hide companies -- of openMore func ****/
/*===========================*/
hideBtmCells = () => {

	var compShow = document.querySelectorAll(".item.body");
	this.setState({compShow: compShow});
	this.compLen(compShow);
	this.paginate(1, this.state.pNums);
}
/*******(End of) Sub function to hide companies ******/

}
export default App;
