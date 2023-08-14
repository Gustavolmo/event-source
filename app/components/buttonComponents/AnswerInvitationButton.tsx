import { User } from '@/app-types/types';
import React, { useEffect, useState } from 'react';

type Props = {
  handleChoice: React.MouseEventHandler<HTMLButtonElement>;
  listChoice: string[];
  userEmail: User['email'];
  text: string;
};

export default function AnswerInvitationButton({
  handleChoice,
  listChoice,
  userEmail,
  text,
}: Props) {
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(false);
  }, [listChoice]);

  const handleSpinner = () => {
    listChoice.includes(String(userEmail))
      ? setSpinner(false)
      : setSpinner(true);
  };

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    handleChoice(e);
    handleSpinner();
  };

  return (
    <button
      onClick={handleButtonClick}
      className={
        listChoice.includes(String(userEmail))
          ? 'navbar__button--disabled'
          : 'action-button'
      }
    >
      {spinner && <div className="spinner"></div>}
      {!spinner && text}
    </button>
  );
}
