import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
        {name:'Muhammad Tojibayev', salary: 500, increase: true, raise: false, id: 1},
        {name:'Dilshod Allaberganov', salary: 950, increase: false, raise: true, id: 2},
        {name:'Nikita Strelkov', salary: 2550, increase: false, raise: false, id: 3}
      ],

      term: '',
      filter: 'all'
    }

    this.maxId = 4;
  }

  deleteItem = (id) =>{
    this.setState(({data}) => {
      return {data:data.filter(item => item.id !== id)}
    })
  }

  addItem = (name, salary) =>{
    const newItem = {
      name,
      salary,
      increase: false,
      raise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return{
        data: newArr
      }
    })
  }

  onToggleProp = (id, props) => {
    this.setState(({data}) => ({
      data: data.map(item =>{
        if(item.id === id){
          return {...item, [props]: !item[props]}
        }
        return item;
      })
    }))
  }

  searchEmp = (items, term) => {
    if(term.length === 0){
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    })
  }

  onTermUpdate = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch (filter){
      case 'rise':
        return items.filter(item => item.raise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    return (
      <div className="app">
          <AppInfo 
          employees={employees}
          increased={increased}
          />
  
          <div className="search-panel">
              <SearchPanel onTermUpdate={this.onTermUpdate}/>
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList 
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
