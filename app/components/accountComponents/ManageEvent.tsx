'use client';
import { getAllMyEvents } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React from 'react';
import CardManageEvent from '../cardComponents/CardManageEvent';

export default function ManageEvent() {
  const [dbData] = useDbQuery(getAllMyEvents)

  return (
    <>
      <h2>Manage Event</h2>
      {dbData && dbData.map((event, index) => {
        return (
          <div key={`${index}_${event._id}`}>
            <CardManageEvent event={event}/>
          </div>
        )
      })}
    </>
  );
}
