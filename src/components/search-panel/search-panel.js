import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
    }

    onTermUpdate = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onTermUpdate(term);
    }

    render(){
        return (
            <input type="text"
                    value={this.state.term}
                    onChange={this.onTermUpdate}
                    className="form-control search-input"
                    placeholder="Найти сотрудника"/>
        )
    }
}

export default SearchPanel;