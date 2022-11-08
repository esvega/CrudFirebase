import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
    <h3 class="h5">${task.name}</h3>
    <h3 class="h5">${task.lastname}</h3>
    <h3 class="h5">${task.position}</h3>
    <p>${task.description}</p>
    <div>
      <button class="btn btn-danger btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-primary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-name"].value = task.name;
          taskForm["task-lastname"].value = task.lastname;
          taskForm["task-position"].value = task.position;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = taskForm["task-name"];
  const lastname = taskForm["task-lastname"];
  const position = taskForm["task-position"];
  const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      await saveTask(name.value, lastname.value, position.value, description.value);
    } else {
      await updateTask(id, {
        name: name.value,
        lastname:lastname.value,
        position:position.value,
        description: description.value,
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    name.focus();
    lastname.focus();
    position.focus();
  } catch (error) {
    console.log(error);
  }
});
