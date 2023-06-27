import Task from './modules/task.js';
import './style/reset.css';
import './style/style.css';
import renderToDoList from './modules/render.js';
import initAddItemToList from './modules/add.js';
const tasklist = new Task();
renderToDoList(tasklist);
initAddItemToList(tasklist);
