import {promises as fs} from "fs";

initData();

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