import React from 'react';
import EditEvent from './EditEvent';
import { EventData } from '@/app-types/types';

type Props = {
  event: EventData;
  handleEdit: React.MouseEventHandler<HTMLButtonElement>;
  funcUpdateClick: Function;
};

export default function CardManageEditMode({
  event,
  handleEdit,
  funcUpdateClick,
}: Props) {
  return (
    <section className="event-card">
      <EditEvent
        event={event}
        handleEdit={handleEdit}
        funcUpdateClick={funcUpdateClick}
      />
      <button
        onClick={handleEdit}
        className="navbar__button absolute-button-top-right"
      >
        cancel
      </button>
    </section>
  );
}
