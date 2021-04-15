const toDOForm = document.querySelector(".js-toDoForm");
const toDoInput = toDOForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function deleteToDos(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id)
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  //한번 더 확인
}

function paintToDos(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "Done";
  delBtn.addEventListener("click", deleteToDos);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();  // 한번 더 확인
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDos(currentValue);
  toDoInput.value = "";
}


function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
      paintToDos(toDo.text);
    });
  }
}

function init(){
  loadToDos();
  toDOForm.addEventListener("submit", handleSubmit)
}

init()