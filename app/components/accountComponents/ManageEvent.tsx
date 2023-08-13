'use client';
import { getAllUserEvents } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useEffect, useState } from 'react';
import CardManageEvent from '../cardComponents/CardManageEvent';
import DotsDivider from '../DotsDivider';
import Loading from '../Loading';

export default function ManageEvent() {
  const [updateClick, setUpdateClick] = useState<boolean>(false);
  const { dbData, loading } = useDbQuery(getAllUserEvents, null, updateClick);
  const [doLoader, setDoLoader] = useState<boolean>(true);

  const handleUpdateClick = () => {
    setDoLoader(false)
    setUpdateClick(!updateClick);
  };

  if (loading && doLoader) {
    return <Loading />
  }

  return (
    <>
      <h2>MANAGE</h2>
      {dbData &&
        dbData.map((event, index) => {
          return (
            <span key={`${index}__${event._id}`}>
              <section className="event-card" key={`${index}_${event._id}`}>
                <CardManageEvent
                  event={event}
                  funcUpdateClick={handleUpdateClick}
                />
              </section>
              <DotsDivider key={`${index}${event._id}`} />
            </span>
          );
        })}
    </>
  );
}
