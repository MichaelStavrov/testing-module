import { render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { JestStoreProvider } from '../utils/JestStoreProvider';
import { Input } from 'src/components/Input';
import { HEADER_LENGTH_ERROR_MESSAGE } from 'src/utils/helpers';
import { NewTaskBar } from 'src/modules/NewTaskBar';
import { List } from 'src/components/List';

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Элемент списка задач', () => {
  it('название не должно быть больше 32 символов', async () => {
    const onChange = jest.fn();

    render(
      <Input
        value='длина этого значения больше 32 символов'
        onChange={onChange}
      />
    );

    const hint = screen.getByTestId('input-hint-text');

    expect(hint).toHaveTextContent(HEADER_LENGTH_ERROR_MESSAGE);
  });

  it('название не должно быть пустым', () => {
    render(<NewTaskBar />, {
      wrapper: JestStoreProvider,
    });

    const addButton = screen.getByTestId('add-task-button');
    const inputField = screen.getByTestId('input-field');

    expect(inputField).toHaveValue('');
    expect(addButton).toBeDisabled();
  });

  it('нельзя удалять невыполненные задачи', () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    const items: Task[] = [
      {
        id: '1',
        header: 'купить хлеб',
        done: false,
      },
    ];

    render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

    const deleteButton = screen.getByTestId('delete-button');

    expect(deleteButton).toBeDisabled();
  });

  it('можно удалять выполненные задачи', async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    const items: Task[] = [
      {
        id: '1',
        header: 'купить хлеб',
        done: true,
      },
    ];

    render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

    const deleteButton = screen.getByTestId('delete-button');

    expect(deleteButton).not.toBeDisabled();
  });

  it('можно переключать выполнение задачи', async () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    const items: Task[] = [
      {
        id: '1',
        header: 'купить хлеб',
        done: false,
      },
    ];

    render(<List items={items} onToggle={onToggle} onDelete={onDelete} />);

    const checkbox = screen.getByTestId('task-item-checkbox', {
      exact: false,
    });
    const deleteButton = screen.getByTestId('delete-button');

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
