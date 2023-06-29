  it('should edit description of task', () => {
    let descriptions = ['test 1', 'test 2', 'test 3'];
    descriptions.forEach((description) => tasks.addTask(description));
    expect(tasks.getTasks().length).toBe(3);
    tasks.updateDescription('test 1 update', '1');
    renderToDoList(tasks);
    const listItems = document.querySelectorAll('.task-el');
    let currentTaskDescription = listItems[0].querySelector(
      '.task-description-el'
    ).value;
    expect(currentTaskDescription).not.toBe(descriptions[0]);
  });
