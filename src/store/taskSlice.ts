import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './configureStore';
import { loadState } from 'src/utils/persist';

export interface TaskFilters {
  hideCompleted: boolean;
}

export interface taskListState {
  list: Task[];
  notification: string;
  filters: TaskFilters;
}

const initialState: taskListState = {
  list: [],
  notification: '',
  filters: {
    hideCompleted: loadState()?.taskList.filters.hideCompleted ?? false,
  },
};

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task['header']>) => {
      state.list.push({
        id: crypto.randomUUID(),
        header: action.payload,
        done: false,
      });
    },
    completeTask: (state, action: PayloadAction<Task['id']>) => {
      const task = state.list.find((x) => x.id === action.payload);

      if (task) {
        task.done = true;
      }
    },
    toggleTask: (state, action: PayloadAction<Task['id']>) => {
      const task = state.list.find((x) => x.id === action.payload);

      if (task) {
        task.done = !task.done;

        if (task.done) {
          state.notification = `Задача "${task.header}" завершена`;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<Task['id']>) => {
      state.list = state.list.filter((x) => x.id !== action.payload);
    },
    setNotification: (state, action: PayloadAction<Task['header']>) => {
      state.notification = `Задача "${action.payload}" завершена`;
    },
    clearNotification: (state) => {
      state.notification = '';
    },
    hideCompletedTasks: (state) => {
      state.filters.hideCompleted = !state.filters.hideCompleted;
    },
  },
});

export const {
  addTask,
  completeTask,
  deleteTask,
  toggleTask,
  clearNotification,
  hideCompletedTasks,
} = taskListSlice.actions;

export default taskListSlice.reducer;

export const tasksSelector = (state: RootState) => state.taskList.list;

export const fullCount = (state: RootState) => state.taskList.list.length;

export const nonCompletedTasks = (state: RootState) =>
  state.taskList.list.every((x) => !x.done);

export const completeCount = (state: RootState) =>
  state.taskList.list.filter((x) => x.done).length;

export const uncompleteCount = (state: RootState) =>
  state.taskList.list.filter((x) => !x.done).length;

export const getNotification = (state: RootState) =>
  state.taskList.notification;

export const filterTaskSelector = (state: RootState) =>
  state.taskList.filters.hideCompleted;

export const filteredTasks = (state: RootState) => {
  const { hideCompleted } = state.taskList.filters;

  if (hideCompleted) {
    return state.taskList.list.filter((x) => x.done !== hideCompleted);
  }

  return state.taskList.list;
};
