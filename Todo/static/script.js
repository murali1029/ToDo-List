const list_box = document.querySelector(".list_box");
const input_box = document.querySelector(".input_list");
const button = document.querySelector(".button");
const myInput = document.querySelector(".edit_input")
const model = document.querySelector(".edit_box")
const submit = document.querySelector(".submit_button")
let tasks = [];
let html;
let checkedTasks = [];
let checkBox;
list_box.innerHTML = "";
let position;
let editor;
let life;
let checktrick = true;
// delete function
const deletefunction = function (e) {
  let id = +e.target.closest('.list_delete').id;
  tasks.splice(id, 1);
  checkedTasks.splice(id, 1);
  updateUI();
}

// check box function
const checkBoxFunction = function () {
  checkBox = document.querySelectorAll(".checkboxUI");
  checkBox.forEach((el) => {
    el.addEventListener("click", function (e) {
    console.log(el);
     checktrick = false;
      let id = +e.target.closest('.checkboxUI').id;
      let text = tasks[id];
      let result = text;
        if(!checkedTasks[id]){
          checkedTasks[id] = true;
          tasks[id] = result;
        }else{
          checkedTasks[id] = false;
          tasks[id] = result;
        }
     
     
      updateUI();
    });
  });
};

// edit function
const editFunction = function (e) {
  editor = document.querySelectorAll(".list_edit");
  checktrick = false;
  editor.forEach((list) => {
    list.addEventListener("click", function (e) {
      let id = +e.target.closest('.list_edit').id;
      model.style.visibility = "visible";
      position = id;
      submitEvent(e);
    })
  })
}

// submiteventt
const submitEvent = function(e){
  submit.addEventListener("click", function (){
    let text = myInput.value;
    if(!text){
      updateUI();
      model.style.visibility="hidden";
      return;
    }
    tasks[position] = text;
    myInput.value = "";
    model.style.visibility="hidden";
    updateUI();
  })
}

// update the givin task
const updateUI = function () {
  list_box.innerHTML = "";
  console.log(life);
  console.log(checktrick);
  tasks.forEach((task, i) => {
    html = `
    <div class="list_item ${checktrick && i ===life ? 'trying' : ''}">
               
    <p class="list_name">${checkedTasks[i] ?task.strike() : task } </p>
    <div>
        <button  id = ${i} class="checkboxUI"  ><i class="fas fa-check ${checkedTasks[i] ? 'green' : ''}"></i></button> 
        <button id = ${i} class = "list_edit"><i class="far fa-edit"></i></button>
        <button id = ${i} class="list_delete"><i class="far fa-trash-alt "></i></button>
    </div>
   
  </div>`;
    if (task != "") {
      list_box.insertAdjacentHTML("beforeend", html);
    }
  });
  checkBoxFunction();
  editFunction();
  delete_list = document.querySelectorAll(".list_delete");
  delete_list.forEach((list) => {
    list.addEventListener("click", function (e) {
      deletefunction(e);
    });
  });
};


button.addEventListener("click", function (e) {
  const text = input_box.value;
  if(input_box.value != ""){
    tasks.push(text);
    checktrick = true;
    life = tasks.length-1;
  }
  // tasks.push(text);
  checkedTasks.push(false);
  input_box.value = "";
  updateUI();
});
