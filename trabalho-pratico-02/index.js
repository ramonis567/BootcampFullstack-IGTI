import {promises as fs} from "fs";

init();

async function init(){
  await initData();
  await statesWithMoreandLessCities();
  await citiesWithTheLongestName();

}

async function initData(){
  let dataStates = await fs.readFile("./OriginalFiles/Estados.json");
  const states = JSON.parse(dataStates);

  let dataCities = await fs.readFile("./OriginalFiles/Cidades.json");
  const cities = JSON.parse(dataCities);

  states.forEach(state => {
    const stateCities = cities.filter(city => city.Estado === state.ID);
    fs.writeFile(`./Estados/${state.Sigla}.json`, JSON.stringify(stateCities));
  });
}

async function countCitiesPerState(uf){
  const data = await fs.readFile(`./Estados/${uf}.json`);
  const cities = JSON.parse(data)
  return cities.length;
}

async function statesWithMoreandLessCities(){
  const states = JSON.parse(await fs.readFile(`./OriginalFiles/Estados.json`));
  const list = [];
  let state;

  for(state of states){
    const count = await countCitiesPerState(state.Sigla);
    list.push({uf: state.Sigla, count});
  }

  list.sort((a, b) => b.count - a.count);

  const result1 = [];
  list.slice(0, 5).forEach(item => result1.push(item.uf + " - " + item.count));

  console.log("--- MAIS CIDADES:");
  console.log(result1);

  list.sort((a, b) => a.count - b.count);

  const result2 = [];
  list.slice(0, 5).forEach(item => result2.push(item.uf + " - " + item.count));

  console.log("--- MENOS CIDADES");
  console.log(result2)
}

async function citiesWithTheLongestName(){

}

async function getLongestName(uf){
  const cities = JSON.parse(await fs.readFile(`./Estados/${uf}.json`));

  let longestSize = 0;
  let longestCity;

  cities.forEach(city => {
    if(city.Nome.length > longestSize){
      longestSize = city.Nome.length;
      longestCity = city;
    }else if(city.Nome.length === longestSize){
      if(city.Nome.toLowerCase() < longestCity.Nome.toLowerCase()){   //Compara ordem alfabetica
        longestCity = city;
      }
    }
  });

  return longestCity;
}