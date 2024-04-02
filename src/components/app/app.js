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
      ]
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

  onToggleIncrease = (id) => {
    this.setState(({data}) => ({
      data: data.map(item =>{
        if(item.id === id){
          return {...item, increase: !item.increase}
        }
        return item;
      })
    }))
  }

  onToggleRise = (id) => {
    this.setState(({data}) => ({
      data: data.map(item =>{
        if(item.id === id){
          return {...item, raise: !item.raise}
        }
        return item;
      })
    }))
  }

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    return (
      <div className="app">
          <AppInfo 
          employees={employees}
          increased={increased}
          />
  
          <div className="search-panel">
              <SearchPanel/>
              <AppFilter/>
          </div>
          
          <EmployeesList 
            data={this.state.data}
            onDelete={this.deleteItem}
            onToggleIncrease={this.onToggleIncrease}
            onToggleRise={this.onToggleRise}/>
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    )
  }
}

export default App;
