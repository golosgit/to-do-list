{
  let taskList = [];

  const clearInputElement = () => {
    document.querySelector(".js-newEntry").value = "";
  };

  const setFocus = (newTaskListEntry) => {
    newTaskListEntry.focus();
  };

  const addNewTask = (newTaskListEntry) => {
    taskList = [
      ...taskList,
      {content: newTaskListEntry.value.trim(), status: false},
    ];

    clearInputElement();
    setFocus(newTaskListEntry);
    render(); 
  };

  const removeTask = (taskIndex) => {
    taskList = [
      ...taskList.slice(0, taskIndex),
      ...taskList.slice(taskIndex + 1),
    ];
    render();
  };

  const changeTaskState = (taskIndex) => {
    taskList = [
      ...taskList.slice(0, taskIndex),
      {...taskList[taskIndex], status: !taskList[taskIndex].status},
      ...taskList.slice(taskIndex + 1),
    ];
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskListEntry = document.querySelector(".js-newEntry");

    if (newTaskListEntry.value.trim() === "") {
      setFocus(newTaskListEntry);
      return;
    }

    addNewTask(newTaskListEntry);
  };

  const bindRemoveEvent = () => {
    const removeButtons = document.querySelectorAll(".js-removeEntry");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleEvent = () => {
    const changeTaskStateButtons = document.querySelectorAll(".js-done");

    changeTaskStateButtons.forEach((changeTaskStateButton, taskIndex) => {
      changeTaskStateButton.addEventListener("click", () => {
        changeTaskState(taskIndex);
      });
    });
  };

  const render = () => {
    let htmlListString = "";

    for (const task of taskList) {
      htmlListString += `
      <li class="list__item">
        <button class="list__button list__button--toggleTask js-done">${task.status ? "✓" : ""}</button>
        <span ${task.status ? "class=list__textLineThrough" : ""}>${task.content}</span>
        <button class="list__button list__button--remove js-removeEntry">🗑</button>
      </li>`;
    }

    document.querySelector(".js-taskList").innerHTML = htmlListString;

    bindRemoveEvent();
    bindToggleEvent();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
