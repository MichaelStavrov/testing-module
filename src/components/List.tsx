import { limitTasks } from 'src/utils/helpers';
import { Item } from './Item';

type Props = {
  items: Task[];
  onDelete: (id: Task['id']) => void;
  onToggle: (id: Task['id']) => void;
  limitUncompleted?: number;
};

export const List = ({
  items,
  onDelete,
  onToggle,
  limitUncompleted,
}: Props) => {
  const limitedItems = limitUncompleted
    ? limitTasks(items, limitUncompleted)
    : items;

  return (
    <ul className='task-list tasks'>
      {limitedItems.map((item) => (
        <Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
};
