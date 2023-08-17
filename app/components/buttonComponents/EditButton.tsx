import React from 'react';

type Props = {
  seeEdit: boolean;
  toggleEdit: React.MouseEventHandler<HTMLButtonElement>;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
};

export default function EditButton({
  seeEdit,
  toggleEdit,
  handleSubmit,
}: Props) {
  return (
    <>
      <button
        className={
          seeEdit
            ? 'navbar__button absolute-button-top-right'
            : 'action-button absolute-button-top-right'
        }
        onClick={toggleEdit}
      >
        {seeEdit ? 'Cancel' : 'Edit'}
      </button>

      {seeEdit && (
        <button
          onClick={handleSubmit}
          className="action-button absolute-button-top-right--second"
        >
          Update
        </button>
      )}
    </>
  );
}
