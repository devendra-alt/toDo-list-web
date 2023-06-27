import renderToDoList from './render.js';

const initAddItemToList = (tasks) => {
  const addBtnEl = document.getElementById('add-task-input');
  addBtnEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      tasks.addTask(addBtnEl.value);
      addBtnEl.value = '';
      renderToDoList(tasks);
    }
  });
};
export default initAddItemToList;
