import { User } from '@/app-types/types';
import React, { useEffect, useState } from 'react';

type Props = {
  handleChoice: Function;
  listChoice: string[];
  userEmail: User['email'];
  text: string;
  buttonType: string;
};

export default function AnswerInvitationButton({
  handleChoice,
  listChoice,
  userEmail,
  text,
  buttonType,
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

  const handleButtonClick = () => {
    handleChoice();
    handleSpinner();
  };

  return (
    <button
      onClick={handleButtonClick}
      className={
        listChoice.includes(String(userEmail))
          ? 'navbar__button--disabled'
          : buttonType
      }
    >
      {spinner && <div className="spinner"></div>}
      {!spinner && text}
    </button>
  );
}
