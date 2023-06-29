import renderToDoList from './render.js';

const todoListEl = document.getElementById('todo-list');

const initUpdateTaskDescription = (tasks) => {
  todoListEl.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
    if (e.target.classList.contains('task-description-el')) {
      tasks.updateDescription(e.target.value, e.target.dataset.todoId);
      renderToDoList(tasks);
      }
    }
  });
};

export default initUpdateTaskDescription;
