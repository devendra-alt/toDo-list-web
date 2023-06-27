import renderToDoList from './render.js';

const todoListEl = document.getElementById('todo-list');

const initDeleteTaskEl = (task) => {
  todoListEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-img-el')) {
      task.deleteTask(e.target.dataset.todoId);
      renderToDoList(task);
    }
  });
};

export default initDeleteTaskEl;
