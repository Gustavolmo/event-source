import React, { MouseEventHandler, useState } from 'react';

type Props = {
  handleDelete: MouseEventHandler<HTMLButtonElement>;
  mainText: string;
  toRight: boolean
};

export default function DeleteButton({ handleDelete, mainText, toRight }: Props) {
  const [showDelete, setShowDelete] = useState(false);

  const toggleCancel = () => {
    setShowDelete(!showDelete);
  };

  return (
    <>
      {!showDelete && (
        <>
          <button
            onClick={toggleCancel}
            className={toRight? 'navbar__button absolute-button-bottom-right' : "navbar__button absolute-button-bottom-left"}
          >
            {mainText}
          </button>
        </>
      )}

      {showDelete && (
        <>
          <button onClick={handleDelete} className={toRight? 'navbar__button absolute-button-bottom-right--second' : "navbar__button absolute-button-bottom-left--second"}>
            DELETE
          </button>

          <button onClick={toggleCancel} className={toRight? 'action-button absolute-button-bottom-right' : "action-button absolute-button-bottom-left"}>
            Cancel
          </button>
        </>
      )}
    </>
  );
}
