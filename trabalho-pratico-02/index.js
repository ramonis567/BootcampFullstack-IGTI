import {promises as fs} from "fs";

init();

async function init(){
  await initData();
  await statesWithMoreandLessCities();
  await citiesWithTheLongestandSmallerName();
  await getTheLongestandSmallerName();

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

async function citiesWithTheLongestandSmallerName(){
  const states = JSON.parse(await fs.readFile("./OriginalFiles/Estados.json"));
  const resultList1 = [];
  const resultList2 = [];
  let state;

  for(state of states){
    const city1 = await getLongestName(state.Sigla);
    const city2 = await getSmallerName(state.Sigla);
    resultList1.push(state.Sigla + ": " + city1.Nome);
    resultList2.push(state.Sigla + ": " + city2.Nome);
  }
  console.log("-- MAIORES NOMES EM CADA ESTADO");
  console.log(resultList1);

  console.log("-- MENORES NOMES EM CADA ESTADO");
  console.log(resultList2);
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

async function getSmallerName(uf){
  const cities = JSON.parse(await fs.readFile(`./Estados/${uf}.json`));

  let smallerCity;

  cities.forEach(city => {
    if(!smallerCity){
      smallerCity = city;
    }else if(city.Nome.length < smallerCity.Nome.length){
      smallerCity = city;
    }else if(city.Nome.length === smallerCity.Nome.length){
      if(city.Nome.toLowerCase() < smallerCity.Nome.toLowerCase()){   //Compara ordem alfabetica
        smallerCity = city;
      }
    }
  });

  return smallerCity;
}

async function getTheLongestandSmallerName(){
  const states = JSON.parse(await fs.readFile("./OriginalFiles/Estados.json"));
  let state;
  let resultList1 = [];
  let resultList2 = [];

  for(state of states){
    const city1 = await getLongestName(state.Sigla);
    const city2 = await getSmallerName(state.Sigla);
    resultList1.push({"Name": city1.Nome, "Size": city1.Nome.length, "UF": state.Sigla});
    resultList2.push({"Name": city2.Nome, "Size": city2.Nome.length, "UF": state.Sigla});
  }

  resultList1.sort((a,b) => b.Size - a.Size);
  resultList2.sort((a,b) => a.Size - b.Size);

  let largestCity = resultList1[0];
  let smallerCity = resultList2[0];

  for(let i = 0; i < resultList1.length; i++){
    if(resultList1[i].Size === largestCity.Size){
      if(resultList1[i].Name.toLowerCase() < largestCity.Name.toLowerCase()){   //Compara ordem alfabetica
        largestCity = resultList1[i];
      }
    }
    if(resultList2[i].Size === smallerCity.Size){
      if(resultList2[i].Name.toLowerCase() < smallerCity.Name.toLowerCase()){   //Compara ordem alfabetica
        smallerCity = resultList2[i];
      }
    }
  }

  console.log("-- MAIOR NOME ENTRE TODOS OS ESTADOS");
  console.log(largestCity.UF + " - " + largestCity.Name);

  console.log("-- MENOR NOME ENTRE TODOS OS ESTADOS");
  console.log(smallerCity.UF + " - " + smallerCity.Name); 
}