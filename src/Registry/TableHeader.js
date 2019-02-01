import React from 'react';

class TableHeader extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            val:[]
        };
    }

    render(){
        const numR = this.props;
        const status = this.props;
        const name = this.props;
        const inn = this.props;
        const ogrn = this.props;

        return(
          <thead>
            <tr className="item head">
                <td className="agent_id">Agent ID</td>
                <td>№ в реестре</td>
                <td>Статус члена</td>
                <td>Наименование организации</td>
                <td>ИНН</td>
                <td>ОГРН</td>
            </tr>
            <tr className="item">
                <td className="agent_id"><input type='text' id="agentId"/></td>
                <td><input type="search" className="small num_r" value={this.state.numR} onChange = {this.filterForNumR}/></td>
                <td><select name="status" value={this.state.status} onChange = {this.filterForStatus}>
                    <option value="Все члены">Все члены СРО</option>
                    <option value="Член СРО">Член СРО</option>
                    <option value="Исключен">Исключен</option>
                </select></td>
                <td><input type="search" className="big" value={this.state.name} onChange = {this.filterForName}/></td>
                <td><input type="search" className="small inn" value={this.state.inn} onChange = {this.filterForInn}/></td>
                <td><input type="search" className="small ogrn" value={this.state.ogrn} onChange = {this.filterForOgrn}/></td>
            </tr>
          </thead>
        );
    }

    filterForNumR = e => {
        this.props.callbackFromRegistryFilterNumR(e.target.value);
    }
    filterForStatus = e => {
        this.props.callbackFromRegistryFilterStatus(e.target.value);
    }
    filterForName = e => {
        this.props.callbackFromRegistryFilterName(e.target.value);
    }
    filterForInn = e => {
        this.props.callbackFromRegistryFilterInn(e.target.value);
    }
    filterForOgrn = e => {
        this.props.callbackFromRegistryFilterOgrn(e.target.value);
    }
}

export default TableHeader;
