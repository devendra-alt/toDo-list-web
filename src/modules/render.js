import deleteSvg from '../assets/delete.png';
import menuSvg from '../assets/menu.png';

const createTaskItemEl = (task) => {
  const taskEl = document.createElement('li');
  const checkBoxEl = document.createElement('input');
  const taskDescriptionEl = document.createElement('input');
  const deleteImg = document.createElement('img');
  const menuImg = document.createElement('img');

  checkBoxEl.setAttribute('type', 'checkbox');

  if (task.completed) {
    checkBoxEl.checked = true;
    taskDescriptionEl.classList.add('completed-task-description');
  } else {
    checkBoxEl.checked = false;
    taskDescriptionEl.classList.remove('completed-task-description');
  }

  taskDescriptionEl.value = task.description;

  deleteImg.src = deleteSvg;
  menuImg.src = menuSvg;

  taskEl.classList.add('task-el');
  checkBoxEl.classList.add('task-checkbox-el');
  taskDescriptionEl.classList.add('task-description-el');
  deleteImg.classList.add('delete-img-el');
  menuImg.classList.add('menu-img-el');

  checkBoxEl.setAttribute('data-todo-Id', task.index);
  taskDescriptionEl.setAttribute('data-todo-Id', task.index);
  deleteImg.setAttribute('data-todo-Id', task.index);
  menuImg.setAttribute('data-todo-Id', task.index);

  taskEl.appendChild(checkBoxEl);
  taskEl.appendChild(taskDescriptionEl);
  taskEl.appendChild(deleteImg);
  taskEl.appendChild(menuImg);

  return taskEl;
};
const renderToDoList = (tasks) => {
  const todoListEl = document.getElementById('todo-list');
  todoListEl.innerHTML = '';
  tasks.getTasks().forEach((task) => {
    todoListEl.appendChild(createTaskItemEl(task));
  });
};

export default renderToDoList;
