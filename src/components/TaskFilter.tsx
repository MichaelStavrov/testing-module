import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from 'src/store/configureStore';
import {
  hideCompletedTasks,
  filteredTasks,
  filterTaskSelector,
  nonCompletedTasks,
} from 'src/store/taskSlice';
import { loadState } from 'src/utils/persist';

export const TaskFilter = () => {
  const dispatch = useDispatch();
  const checked = useSelector(filterTaskSelector);
  const disabled = useSelector(nonCompletedTasks);

  const handleCheckboxChange = () => {
    dispatch(hideCompletedTasks());
  };

  return (
    <div
      className='task-filter-wrapper'
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <input
        type='checkbox'
        id='task-filter-checkbox'
        checked={checked}
        onChange={handleCheckboxChange}
        data-testid='task-filter-checkbox'
        disabled={disabled}
      />
      <label htmlFor='task-filter-checkbox'>Скрывать выполненные задачи</label>
    </div>
  );
};
