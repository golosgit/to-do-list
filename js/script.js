{
  const taskList = [
    {
      job: "test",
      status: true,
    },
    {
      job: "zadanie 2",
      status: false,
    },
    {
      job: "zadanie 3",
      status: true,
    },
  ];

  const clearInputElement = () => {
    document.querySelector(".js-newJob").value = "";
  };

  const setFocus = (newTaskListJob) => {
    newTaskListJob.focus();
  };

  const addNewJob = (newTaskListJob) => {
    taskList.push({
      job: newTaskListJob.value.trim(),
    });
    clearInputElement();
    setFocus(newTaskListJob);
    render();
  };

  const removeJob = (jobIndex) => {
    taskList.splice(jobIndex, 1);
    render();
  };

  const changeJobState = (jobIndex) => {
    taskList[jobIndex].status = !taskList[jobIndex].status;
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskListJob = document.querySelector(".js-newJob");

    if (newTaskListJob.value.trim() === "") {
      setFocus(newTaskListJob);
      return;
    }

    addNewJob(newTaskListJob);
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-removeJob");
    const changeJobStateButtons = document.querySelectorAll(".js-done");

    removeButtons.forEach((removeButton, jobIndex) => {
      removeButton.addEventListener("click", () => {
        removeJob(jobIndex);
      });
    });

    changeJobStateButtons.forEach((changeJobStateButton, jobIndex) => {
      changeJobStateButton.addEventListener("click", () => {
        changeJobState(jobIndex);
      });
    });
  };

  const render = () => {
    let htmlListString = "";

    for (const task of taskList) {
      htmlListString += `<li  class="list__item">
      <button class="list__button list__button--toggle js-done">${task.status ? "✓" : ""}</button>
      <span class="list__text ${task.status ? 'list__text--lineThrough"' : '"'
      }>${task.job}</span>
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
