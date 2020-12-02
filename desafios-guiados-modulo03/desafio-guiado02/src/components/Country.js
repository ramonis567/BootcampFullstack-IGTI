import React, { Component } from 'react';
import css from "./countries.module.css";

export default class Country extends Component {
  render() {
    const {country} = this.props;

    return (
      <div className={`${css.country}`}>
        <img 
          src={country.flag} 
          className={css.flagStyle} 
          alt={`${country.name} flag`}>
        </img>
        <span>{country.name}</span>
      </div>
    );
  }
}
