{
  const taskList = [
    {
      job: "zadanie 1",
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

  const addNewJob = (newTaskListJob) => {
    taskList.push({
      job: newTaskListJob,
    });
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskListJob = document.querySelector(".js-newJob").value.trim();

    if (newTaskListJob === "") {
      return;
    }

    addNewJob(newTaskListJob);
  };

  const render = () => {
    let htmlListString = "";

    for (const task of taskList) {
      htmlListString += `<li 
      ${task.status ? 'class="list__itemLineThrough"' : ""}>${task.job}</li>`;
    }
    document.querySelector(".js-taskList").innerHTML = htmlListString;
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
