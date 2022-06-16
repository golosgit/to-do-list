{
  const taskList = [
    {
      task: "zadanie 1",
      status: true,
    },
    {
      task: "zadanie 2",
      status: false,
    },
    {
      task: "zadanie 3",
      status: true,
    },
  ];

  const render = () => {
    let htmlListString = "";

    for (const task of taskList) {
      htmlListString += `<li>${task.task}</li>`;
    }
    document.querySelector(".js-taskList").innerHTML = htmlListString;
  };

  const init = () => {
    render();
  };

  init();
}
