import { User } from '@/app-types/types';
import React from 'react';

type Props = {
  handleChoice: React.MouseEventHandler<HTMLButtonElement>,
  listChoice: string[]
  userEmail: User['email']
  text: string
}

export default function AnswerInvitationButton({
  handleChoice,
  listChoice,
  userEmail,
  text
}: Props) {
  return (
    <button
      onClick={handleChoice}
      className={
        listChoice.includes(String(userEmail))
          ? 'navbar__button--disabled'
          : 'action-button'
      }
    >
      {text}{listChoice.includes(String(userEmail))? '' : '?'}
    </button>
  );
}
