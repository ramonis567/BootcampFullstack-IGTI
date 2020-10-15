let inputSearch = null;
let buttonSearch = null;
let divUsers = null;
let divStats = null;
let users = [];
let divHidden = null;
let divAguarde = null;

window.addEventListener("load", async () => {
  mapElements();
  await fetchUsers();
  addEvents();
  showHidden();
});

function mapElements(){
  inputSearch = document.querySelector("#inputSearch");
  buttonSearch = document.querySelector("#buttonSearch");
  divUsers = document.querySelector("#divUsers");
  divStats = document.querySelector("#divStats");
  divAguarde = document.querySelector("#divAguarde");
  divHidden = document.querySelector("#divHidden");
}

async function fetchUsers(){
  const res = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");
  const json = await res.json();
  users = json.results.map(user => {
    const fullName = `${user.name.first} ${user.name.last}`;

    return {
      image: user.picture.medium,
      id: user.login.uuid,
      name: fullName,
      nameLowerCase: fullName.toLowerCase(),
      age: user.dob.age,
      gender: user.gender
    }
  }).sort((a,b) =>{
    return a.name.localeCompare(b.name);
  });
}

function showHidden(){
  setTimeout(() => {
    divAguarde.classList.add("hidden");
    divHidden.classList.remove("hidden");
  }, 7500);
  
}

function addEvents(){
  inputSearch.addEventListener('keyup', handleKeyUp);
}

function handleKeyUp(event){
  if(event.key !== "Enter"){
    return;
  }else{
    const filterText = event.target.value;
    if(filterText.trim() !== ""){
      filterUsers(filterText);
    }
  }
}

function filterUsers(filterText){
  const filterTextLowerCase = filterText.toLowerCase();
  const filteredUsers = users.filter(user => {
    return user.nameLowerCase.includes(filterTextLowerCase);
  });

  renderUsers(filteredUsers);
  renderStats(filteredUsers);
}

function renderUsers(users){
  divUsers.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = `${users.length} usuário(s) encontrado(s)!`;

  const ul = document.createElement("ul");
  users.forEach(user => {
    const li = document.createElement("li");
    li.classList.add("flex-row");
    li.classList.add("li-style");

    const img = `<img src="${user.image}" alt="${user.name}" style="border-radius: 50%;"></img>`;
    const userData = `<span>${user.name}, ${user.age} anos</span>`;

    li.innerHTML = `${img}${userData}`;

    ul.appendChild(li);
  });

  divUsers.appendChild(h2);
  divUsers.appendChild(ul);
}

function renderStats(users){
  const countMale = users.filter(user => user.gender === "male").length;
  const countFemale = users.filter(user => user.gender === "female").length;
  const sumAges = users.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);
  const averageAges = sumAges/users.length || 0;

  divStats.innerHTML = 
  `
    <h2>Estatísticas</h2>
    <ul>
      <li>Sexo Masculino: ${countMale}</li>
      <li>Sexo Feminino: ${countFemale}</li>
      <li>Soma das idades: ${sumAges}</li>
      <li>Média das idades: ${averageAges.toFixed(3).replace('.',',')}</li>
    </ul>

  `;
}