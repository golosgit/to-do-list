{
  const taskList = [];

  const clearInputElement = () => {
    document.querySelector(".js-newJob").value = "";
  };

  const setFocus = (newTaskListJob) => {
    newTaskListJob.focus();
  };

  const addNewTask = (newTaskListJob) => {
    taskList.push({
      content: newTaskListJob.value.trim(),
      status: false,
    });
    clearInputElement();
    setFocus(newTaskListJob);
    render();
  };

  const removeTask = (taskIndex) => {
    taskList.splice(taskIndex, 1);
    render();
  };

  const changeTaskState = (taskIndex) => {
    taskList[taskIndex].status = !taskList[taskIndex].status;
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskListJob = document.querySelector(".js-newJob");

    if (newTaskListJob.value.trim() === "") {
      setFocus(newTaskListJob);
      return;
    }

    addNewTask(newTaskListJob);
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-removeJob");
    const changeTaskStateButtons = document.querySelectorAll(".js-done");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

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
        <button class="list__button list__button--remove js-removeJob">🗑</button>
      </li>`;
    }

    document.querySelector(".js-taskList").innerHTML = htmlListString;

    bindEvents();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
