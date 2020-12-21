import React, { Component } from 'react'

export default class proportionBar extends Component {
  render() {
    const {
      inss, irpf, netSalary
    } = this.props;

    return (
      <div style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
      }}>
        <div style={{
          backgroundColor: 'maroon',
          width: inss + '%',
          height: '30px',
        }}/>
        <div style={{
          backgroundColor: 'orange',
          width: irpf + '%',
          height: '30px',
        }}/>
        <div style={{
          backgroundColor: 'forestgreen',
          width: netSalary + '%',
          height: '30px',
        }}/>
      </div>
    )
  }
}
