import Task from './modules/task.js';
import './style/reset.css';
import './style/style.css';
import renderToDoList from './modules/render.js';
import initAddItemToList from './modules/add.js';
import initTaskStatus from './modules/status.js';
import initClearCompletedBtn from './modules/clear.js';
import initDeleteTaskEl from './modules/delete.js';
import initUpdateTaskDescription from './modules/update.js';

const tasklist = new Task();
renderToDoList(tasklist);
initAddItemToList(tasklist);
initTaskStatus(tasklist);
initClearCompletedBtn(tasklist);
initDeleteTaskEl(tasklist);
initUpdateTaskDescription(tasklist);
