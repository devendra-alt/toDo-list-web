import renderToDoList from './render.js';

const todoListEl = document.getElementById('todo-list');

const initTaskStatus = (tasks) => {
  todoListEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-checkbox-el')) {
      tasks.updateStatus(e.target.dataset.todoId);
      renderToDoList(tasks);
    }
  });
};

export default initTaskStatus;
