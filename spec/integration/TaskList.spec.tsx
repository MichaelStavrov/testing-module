import { render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { JestStoreProvider } from '../utils/JestStoreProvider';
import { App } from 'src/App';

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Ограничение по добавлению новых задач в список', () => {
  it('поле ввода дизейблится, если в списке уже есть 10 невыполненных задач', async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const inputField = screen.getByTestId('input-field');
    const addTaskButton = screen.getByTestId('add-task-button');

    for (let i = 1; i <= 10; i++) {
      await userEvent.type(inputField, `${i} task`);
      await userEvent.click(addTaskButton);
    }

    expect(inputField).toBeDisabled();
  });

  it('после выполнения первой задачи, можно добавить еще одну в список', async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const inputField = screen.getByTestId('input-field');
    const addTaskButton = screen.getByTestId('add-task-button');

    const tasks = screen.getAllByTestId('task-item-checkbox', {
      exact: false,
    });

    await userEvent.click(tasks[0]);

    await userEvent.type(inputField, 'new task');
    await userEvent.click(addTaskButton);

    const newTasks = screen.getAllByTestId('task-item-checkbox', {
      exact: false,
    });

    const newTask = screen.getByText('new task');

    expect(newTasks.length).toEqual(11);
    expect(newTask).toBeInTheDocument();
  });

  it('если первую задачу сделать снова невыполненной, то в списке не будет задачи с названием "new task"', async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const tasks = screen.getAllByTestId('task-item-checkbox', {
      exact: false,
    });

    expect(tasks.length).toEqual(11);

    await userEvent.click(tasks[0]);

    const newTasks = screen.getAllByTestId('task-item-checkbox', {
      exact: false,
    });

    const newTask = screen.queryByText('new task');

    expect(newTask).not.toBeInTheDocument();
    expect(newTasks.length).toEqual(10);
  });
});
