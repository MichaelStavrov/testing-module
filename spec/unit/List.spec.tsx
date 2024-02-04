import { render, screen } from '@testing-library/react';
import { List } from 'src/components/List';

it('отображение списка задач', () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: '1',
      header: 'купить хлеб',
      done: false,
    },
    {
      id: '2',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '3',
      header: 'выгулять собаку',
      done: true,
    },
  ];

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it.only('Список содержит не больше 10 невыполненных задач', () => {
  const items: Task[] = [
    {
      id: '1',
      header: 'купить хлеб',
      done: false,
    },
    {
      id: '2',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '3',
      header: 'выгулять собаку',
      done: false,
    },
    {
      id: '4',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '5',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '6',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '7',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '8',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '9',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '10',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '11',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '12',
      header: 'купить молоко',
      done: false,
    },
  ];

  const onDelete = jest.fn();
  const onToggle = jest.fn();

  render(
    <List
      items={items}
      onDelete={onDelete}
      onToggle={onToggle}
      limitUncompleted={10}
    />
  );

  const tasks = screen.getAllByTestId('task-item-checkbox', {
    exact: false,
  });

  expect(tasks.length).toEqual(10);
});
