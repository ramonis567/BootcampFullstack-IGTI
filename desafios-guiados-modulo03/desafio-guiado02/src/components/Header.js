import React, { Component } from 'react';
import { formatNumber } from "../helpers/formatHelpers.js";
import css from "./header.module.css";

export default class Header extends Component {
  handleInputChange = (event) =>{
    const newText = event.target.value;
    this.props.onChangeFilter(newText);    
  }
  
  render() {
    const { filter, countryCount, totalPopulation } = this.props;

    return (
      <div className={css.flexRow}>
        <input 
          style={ { width: "50%" } } 
          type="text" value={filter} 
          onChange={this.handleInputChange}
          placeholder="Filtro"
        />
        <span><h6>|  Países: <b>{countryCount}</b></h6></span>
        <span><h6>  |  População total: <b>{formatNumber(totalPopulation)}</b></h6></span>
      </div>
    )
  }
}
