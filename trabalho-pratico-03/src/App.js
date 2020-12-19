import React, { Component } from 'react';
import InputFullSalary from "./components/inputFullSalary";
import InputReadOnly from './components/inputReadOnly';
import { calculateSalaryFrom } from "./helpers/salary.js";

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      fullSalary: 1000,
    };
  }

  handleFullSalaryChange = (newValue) =>{
    this.setState({
      fullSalary: newValue,
    })
  }

  render() {
    const { fullSalary } = this.state;
    const salaryObj = calculateSalaryFrom(fullSalary);

    return (
      <div className="container">
        <h1 style={styles.title}>React - Cálculo Salário</h1>

        <div className="row">
          <InputFullSalary 
            currentValue={fullSalary} 
            onSalaryChange={this.handleFullSalaryChange}
          />
        </div>

        <div className="row">
          <InputReadOnly label="Base INSS" value={salaryObj.baseINSS}/>
          <InputReadOnly label="Desconto INSS" value={salaryObj.discountINSS} percentage={salaryObj.percentINSS} />
          <InputReadOnly label="Base IRPF" value={salaryObj.baseIRPF}/>
          <InputReadOnly label="Desconto IRPF" value={salaryObj.discountIRPF} percentage={salaryObj.percentIRPF} />
          <InputReadOnly label="Salário Líquido" value={salaryObj.netSalary} percentage={salaryObj.percentNetSalary} />
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    textAlign: "center",
  },
}
