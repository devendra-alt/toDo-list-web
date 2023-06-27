class Task {
  #tasks;

  constructor() {
    this.#tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  getTasks() {
    console.log(this.#tasks);
    return this.#tasks;
  }

  setTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addTask(description) {
    const newTask = {
      index: this.#tasks.length + 1,
      description: description,
      completed: false,
    };
    this.#tasks.push(newTask);
    this.setTasks(this.#tasks);
  }
}

export default Task;
