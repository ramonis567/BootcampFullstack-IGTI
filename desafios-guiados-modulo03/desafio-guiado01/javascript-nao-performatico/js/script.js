const clickArray = [];

window.addEventListener("load", () => {

  const button = document.querySelector("#addButton");
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(){
  clickArray.push(getNewTimestamp());
  document.title = clickArray.length;
  render();
}

function render(){
  const ul = document.querySelector("#list");
  ul.innerHTML = "";
  let li = '';

  clickArray.map((item) => {
    li += `<li>${item}</li>`;
  });

  ul.innerHTML = li;
}
