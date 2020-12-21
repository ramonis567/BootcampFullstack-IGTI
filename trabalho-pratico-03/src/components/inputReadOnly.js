import React, { Component } from 'react';
import { formatMoney, formatPercent} from '../helpers/formatters.js';

export default class InputReadOnly extends Component {
  render() {
    const { color = "black", value, percentage = 0, label } = this.props;
    const formattedPercentage = (percentage > 0) ? `(${formatPercent(percentage)})` : "";
    const formattedValue = `${formatMoney(value)} ${formattedPercentage}`;

    return (
      <div className="input-field col s12 m6 l3">
        <input
          className="cyan lighten-5"
          value={formattedValue}
          readOnly
          style={{color, fontWeight: "bolder"}}
        />
        <label className="active" htmlFor="inputReadOnly">{label}</label>
      </div>
    );
  }
}
