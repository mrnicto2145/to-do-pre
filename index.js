let items = loadTasks();

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

items.forEach(function (x) {
  const block = createItem(x);
  listElement.append(block);
});

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const newToDo = createItem(inputElement.value);
  listElement.prepend(newToDo);
  items = getTasksFromDOM();
  saveTasks(items);
  inputElement.value = "";
});

function loadTasks() {
  const userTasks = localStorage.getItem("userTasks");
  let tasks;
  if (userTasks === null) {
    tasks = [
      "Сделать проектную работу",
      "Полить цветы",
      "Пройти туториал по Реакту",
      "Сделать фронт для своего проекта",
      "Прогуляться по улице в солнечный день",
      "Помыть посуду",
    ];
  } else {
    tasks = JSON.parse(userTasks);
  }
  return tasks;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  textElement.textContent = item;

  deleteButton.addEventListener("click", (evt) => {
    clone.remove();
    items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener("click", (evt) => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener("click", (evt) => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", (evt) => {
    textElement.setAttribute("contenteditable", "false");
    saveTasks(getTasksFromDOM());
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  let tasks = [];
  itemsNamesElements.forEach((task) => tasks.push(task.textContent));
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("userTasks", JSON.stringify(tasks));
}
