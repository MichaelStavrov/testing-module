import { render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { App } from 'src/App';
import { JestStoreProvider } from '../utils/JestStoreProvider';

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

jest.useFakeTimers();

describe('Оповещение при выполнении задачи', () => {
  it('появляется и содержит заголовок задачи', async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const taskTitle = 'first task';
    const inputField = screen.getByTestId('input-field');
    const addTaskButton = screen.getByTestId('add-task-button');

    await userEvent.type(inputField, taskTitle);
    await userEvent.click(addTaskButton);

    const firstTaskCheckbox = screen.getByTestId('task-item-checkbox', {
      exact: false,
    });
    await userEvent.click(firstTaskCheckbox);

    const notifier = screen.getByText(`Задача "${taskTitle}" завершена`);

    expect(notifier).toBeInTheDocument();
  });

  it('одновременно может отображаться только одно', async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const taskTitle = 'second task';
    const taskTitle2 = 'third task';
    const inputField = screen.getByTestId('input-field');
    const addTaskButton = screen.getByTestId('add-task-button');

    await userEvent.type(inputField, taskTitle);
    await userEvent.click(addTaskButton);

    await userEvent.type(inputField, taskTitle2);
    await userEvent.click(addTaskButton);

    const tasksCheckbox = screen.getAllByTestId('task-item-checkbox', {
      exact: false,
    });
    await userEvent.click(tasksCheckbox[1]);
    const notifier1 = screen.getByText(`Задача "${taskTitle}" завершена`);
    expect(notifier1).toHaveTextContent(taskTitle);

    await userEvent.click(tasksCheckbox[2]);
    const notifier2 = screen.getByText(`Задача "${taskTitle2}" завершена`);

    expect(notifier2).toHaveTextContent(taskTitle2);
    expect(notifier1).not.toHaveTextContent(taskTitle);
  });
});
