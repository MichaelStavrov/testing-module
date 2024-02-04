import { prettyDOM, render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { JestStoreProvider } from '../utils/JestStoreProvider';
import { App } from 'src/App';

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Список задач', () => {
  it('чекбокс фильтрации задизейблин, если нет завершенных задач', async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const checkbox = screen.getByTestId('task-filter-checkbox');
    const inputField = screen.getByTestId('input-field');
    const addTaskButton = screen.getByTestId('add-task-button');

    await userEvent.type(inputField, 'first task');
    await userEvent.click(addTaskButton);

    await userEvent.type(inputField, 'second task');
    await userEvent.click(addTaskButton);

    await userEvent.type(inputField, 'third task');
    await userEvent.click(addTaskButton);

    expect(checkbox).toBeDisabled();
  });

  it('с включенным фильтром', async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const checkbox = screen.getByTestId('task-filter-checkbox');
    const tasks = screen.queryAllByTestId('task-item-checkbox', {
      exact: false,
    });

    await userEvent.click(tasks[0]);
    await userEvent.click(tasks[2]);
    await userEvent.click(checkbox);

    const taskLabel = screen.getByText('second task');

    const newTasks = screen.queryAllByTestId('task-item-checkbox', {
      exact: false,
    });

    expect(taskLabel).toBeInTheDocument();
    expect(newTasks.length).toEqual(1);
  });

  it('с выключенным фильтром', async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const checkbox = screen.getByTestId('task-filter-checkbox');

    await userEvent.click(checkbox);

    const newTasks = screen.queryAllByTestId('task-item-checkbox', {
      exact: false,
    });

    expect(newTasks.length).toEqual(3);
  });
});
