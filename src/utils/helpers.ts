export const MAX_HEADER_LENGTH = 32;
export const MIN_HEADER_LENGTH = 1;
export const HEADER_LENGTH_ERROR_MESSAGE =
  'Длина заголовка не должна превышать 32 символа';

export const validateHeaderMax = (text: string) => {
  return text.length <= MAX_HEADER_LENGTH;
};

export const validateHeaderMin = (text: string) => {
  return text.length >= MIN_HEADER_LENGTH;
};

export const sayHi = () => 'Hello!';

export const headerFieldOptions = {
  maxLength: MAX_HEADER_LENGTH,
  message: HEADER_LENGTH_ERROR_MESSAGE,
};

export const limitTasks = (items: Task[], limitUncompleted: number) => {
  const tasks = [];
  let count = 0;

  for (let i = 0; i < items.length; i++) {
    if (count === limitUncompleted) {
      break;
    }

    if (!items[i].done) {
      count++;
    }

    tasks.push(items[i]);
  }

  return tasks;
};
