import React, { Component } from 'react'

export default class Header extends Component {
  handleInputChange = (event) =>{
    console.log(event.target.value);
    
  }
  
  render() {
    const { filter } = this.props;

    return (
      <div>
        <input type="text" value={filter} onChange={this.handleInputChange}/>
        <span>Qnt de Países: </span>
        <span>| População total: </span>
      </div>
    )
  }
}
