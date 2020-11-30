import React, { Component } from 'react';
import Countries from './components/Countries.js';
import Header from './components/Header.js';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filter: ""
    };
  }

  async componentDidMount() {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const json = await res.json();

    const allCountries = json.map(({name, numericCode, flag, population}) => {
      return {
        id: numericCode,
        name,
        flag,
        population
      }
    });

    this.setState({
      allCountries: allCountries,
      filteredCountries: allCountries
    });
  }

  handleChangeFilter = (newFilter) =>{
    console.log(newFilter);

    this.setState({
      filter: newFilter,
    });
  }
  
  render() {
    const { allCountries, filter } = this.state;

    return (
      <div className="container">
        <h1>React Countries</h1>
        <Header filter={filter} onChangeFilter={this.handleChangeFilter}/>
        <Countries countries={allCountries}/>
      </div>
    );
  }
}
