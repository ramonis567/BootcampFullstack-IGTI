const clickArray = [];

window.addEventListener("load", () => {

  const button = document.querySelector("#addButton");
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(){
  const item = getNewTimestamp();
  clickArray.push(item);
  document.title = clickArray.length;
  render(item);
}

function render(item){
  const ul = document.querySelector("#list");
  const li = document.createElement('li');
  li.textContent = item;

  ul.appendChild(li);


  /*
  ul.innerHTML = "";
  let li = '';

  clickArray.map((item) => {
    li += `<li>${item}</li>`;
  });

  ul.innerHTML = li;
  */
}
