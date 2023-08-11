'use client';
import { getAllUserEvents } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useState } from 'react';
import CardManageEvent from '../cardComponents/CardManageEvent';

export default function ManageEvent() {
  const [updateClick, setUpdateClick] = useState<boolean>(false);
  const { dbData } = useDbQuery(getAllUserEvents, null, updateClick);

  const handleUpdateClick = () => {
    setUpdateClick(!updateClick);
  };

  return (
    <>
      <h2>MANAGE</h2>
      {dbData &&
        dbData.map((event, index) => {
          return (
            <section className='event-card' key={`${index}_${event._id}`}>
              <CardManageEvent
                event={event}
                funcUpdateClick={handleUpdateClick}
              />
            </section>
          );
        })}
    </>
  );
}
