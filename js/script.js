{
  let taskList = [];
  let visibilityOfFinishedTasks = true;

  const clearInputElement = () => {
    document.querySelector(".js-newEntry").value = "";
  };

  const setFocus = (newTaskListEntry) => {
    newTaskListEntry.focus();
  };

  const addNewTask = (newTaskListEntry) => {
    taskList = [...taskList, { content: newTaskListEntry.value.trim(), status: false }];

    clearInputElement();
    setFocus(newTaskListEntry);
    render();
  };

  const removeTask = (taskIndex) => {
    taskList = [...taskList.slice(0, taskIndex), ...taskList.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskStatus = (taskIndex) => {
    taskList = [
      ...taskList.slice(0, taskIndex),
      { ...taskList[taskIndex], status: !taskList[taskIndex].status },
      ...taskList.slice(taskIndex + 1),
    ];
    render();
  };

  const checkStatusOfAllTasks = () => {
    return taskList.every(({ status }) => status);
  };

  const markAllTasksDone = () => {
    taskList = taskList.map(({ content }) => ({ content, status: true }));
    render();
  };

  const toggleVisibilityOfFinishedTasks = () => {
    visibilityOfFinishedTasks = !visibilityOfFinishedTasks;
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
    const toggleTaskStatusButtons = document.querySelectorAll(".js-done");

    toggleTaskStatusButtons.forEach((toggleTaskStatusButton, taskIndex) => {
      toggleTaskStatusButton.addEventListener("click", () => {
        changeTaskState(taskIndex);
      });
    });
  };

  const bindMarkAllTasksDoneEvent = () => {
    const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDoneButton");

    if (markAllTasksDoneButton) {
      markAllTasksDoneButton.addEventListener("click", () => {
        markAllTasksDone();
      });
    }
  };

  const bindToggleVisibilityOfFinishedTasksEvent = () => {
    const toggleVisibilityOfFinishedTasksButton = document.querySelector(".js-toggleVisibilityOfFinishedTasksButton");

    if (toggleVisibilityOfFinishedTasksButton) {
      toggleVisibilityOfFinishedTasksButton.addEventListener("click", () => {
        toggleVisibilityOfFinishedTasks();
      });
    }
  };

  const renderTaskList = () => {
    let htmlString = "";

    for (const task of taskList) {
      htmlString += `
      <li class="list__item ${task.status && !visibilityOfFinishedTasks ? "list__item--hidden" : ""}">
        <button class="list__button list__button--toggleTask js-done">${task.status ? "✓" : ""}</button>
          <span ${task.status ? "class=list__textLineThrough" : ""}>${task.content}</span>
        <button class="list__button list__button--remove js-removeEntry">🗑</button>
      </li>`;
    }

    document.querySelector(".js-taskList").innerHTML = htmlString;
  };

  const renderFinishAllTasksButton = () => {
    let htmlString = "";

    if (taskList.length === 0) {
      document.querySelector(".js-markAllTasksDone").innerHTML = htmlString;
      return;
    }

    htmlString = `
      <button 
        class="secondaryHeader__hideAndFinishButtons js-markAllTasksDoneButton" 
        ${checkStatusOfAllTasks() ? " disabled" : ""}>Ukończ wszystkie
      </button>
    `;
    document.querySelector(".js-markAllTasksDone").innerHTML = htmlString;
  };

  const renderToggleVisibilityOfFinishedTasksButton = () => {
    let htmlString = "";

    if (taskList.length === 0) {
      document.querySelector(".js-toggleFinishedTasks").innerHTML = htmlString;
      return;
    }

    htmlString = `
      <button class="secondaryHeader__hideAndFinishButtons js-toggleVisibilityOfFinishedTasksButton">
      ${visibilityOfFinishedTasks ? "Ukryj" : "Pokaż"} ukończone</button>
    `;
    document.querySelector(".js-toggleFinishedTasks").innerHTML = htmlString;
  };

  const render = () => {
    renderToggleVisibilityOfFinishedTasksButton();
    renderFinishAllTasksButton();
    renderTaskList();

    bindRemoveEvent();
    bindToggleEvent();
    bindMarkAllTasksDoneEvent();
    bindToggleVisibilityOfFinishedTasksEvent();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
