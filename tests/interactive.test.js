/**
 * @jest-environment jsdom
 */
import dom from './dom.js';
import Task from '../src/modules/task.js';
import localStorageMock from './localstorage-mock.js';
import renderToDoList from '../src/modules/render.js';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

document.body.innerHTML = dom;

describe('Editing Task', () => {
  let tasks;
  beforeEach(() => {
    tasks = new Task();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should edit description of task', () => {
    const descriptions = ['test 1', 'test 2', 'test 3'];
    descriptions.forEach((description) => tasks.addTask(description));
    expect(tasks.getTasks().length).toBe(3);
    tasks.updateDescription('test 1 update', '1');
    renderToDoList(tasks);
    const listItems = document.querySelectorAll('.task-el');
    const currentTaskDescription = listItems[0].querySelector(
      '.task-description-el',
    ).value;
    expect(currentTaskDescription).not.toBe(descriptions[0]);
  });

  it('should update task completion state', () => {
    tasks.addTask('task 1');
    tasks.addTask('task 2');
    tasks.addTask('task 3');
    // act
    tasks.updateStatus('3');
    renderToDoList(tasks);
    // assert
    const listItems = document.querySelectorAll('.task-el');
    const currentTaskStatus = listItems[2].querySelector('.task-checkbox-el').checked;
    expect(currentTaskStatus).toBe(true);
  });

  it('should clear all completed tasks', () => {
    // arrange
    tasks.addTask('test 1');
    tasks.addTask('test 2');
    tasks.addTask('test 3');
    tasks.addTask('test 4');
    tasks.updateStatus('2');
    tasks.updateStatus('3');
    tasks.deleteAllCompleted();
    // assert
    expect(tasks.getTasks().length).toBe(2);
  });

  it('should select multiple tasks', () => {
    // arrange
    tasks.addTask('test 1');
    tasks.addTask('test 2');
    tasks.addTask('test 3');
    tasks.addTask('test 4');
    tasks.updateStatus('1');
    tasks.updateStatus('2');
    tasks.updateStatus('3');
    renderToDoList(tasks);
    // act
    const listItems = document.querySelectorAll('.task-el');
    const selectedTasks = [];
    for (let index = 0; index < listItems.length; index += 1) {
      if (
        listItems[index].querySelector('.task-checkbox-el').checked === true
      ) {
        selectedTasks.push(listItems[index]);
      }
    }
    // assert
    expect(selectedTasks.length).toBe(3);
  });
});
