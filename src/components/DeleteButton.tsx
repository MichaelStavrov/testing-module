import TrashIcon from '../icons/trash.png';

type Props = {
  onClick: () => void;
  disabled: boolean;
};
export const DeleteButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      className='button button-with-icon'
      onClick={onClick}
      disabled={disabled}
      data-alt='Удалить'
      data-testid='delete-button'
    >
      <img src={TrashIcon} alt='Удалить' />
    </button>
  );
};
