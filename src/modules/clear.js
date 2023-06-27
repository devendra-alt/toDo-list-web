import renderToDoList from './render.js';

const clearCompletedBtn = document.getElementById('clear-completed-btn');

const initClearCompletedBtn = (tasks) => {
  clearCompletedBtn.addEventListener('click', () => {
    tasks.deleteAllCompleted();
    renderToDoList(tasks);
  });
};

export default initClearCompletedBtn;
