'use client';
import { getAllUserEvents } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useState } from 'react';
import CardManageEvent from '../cardComponents/CardManageEvent';
import Loading from '../loadingComponents/Loading';
import { EventData } from '@/app-types/types';

export default function ManageEvent() {
  const [updateClick, setUpdateClick] = useState<boolean>(false);
  const { dbData, loading } = useDbQuery(getAllUserEvents, null, updateClick);
  const [doLoader, setDoLoader] = useState<boolean>(true);

  const getEventExpiryDate = (event: EventData) => {
    const dayInMiliSec = 24 * 60 * 60 * 1000;
    let returnDate: number = new Date(event.returnDate).getTime() || 0;
    let eventEndDate: number = new Date(event.eventEndDate).getTime() || 0;
    let eventDate: number = new Date(event.eventDate).getTime() || 0;
    const datesForCompare = [
      returnDate + dayInMiliSec,
      eventEndDate + dayInMiliSec,
      eventDate + dayInMiliSec,
    ];
    return Math.max(...datesForCompare);
  };

  const handleUpdateClick = () => {
    setDoLoader(false);
    setUpdateClick(!updateClick);
  };

  if (loading && doLoader) {
    return <Loading />;
  }

  if (dbData?.length === 0) {
    return (
      <section className="--centered-text">
        <h2>You have no events</h2>
      </section>
    );
  }

  return (
    <>
      <h2 className="promo-image">MANAGE EVENTS</h2>
      {dbData &&
        dbData
          .slice()
          .reverse()
          .map((event, index) => {
            const lastDay = getEventExpiryDate(event);
            if (lastDay > new Date().getTime()) {
              return (
                <span key={`${index}__${event._id}`}>
                  <section key={`${index}_${event._id}`}>
                    <CardManageEvent
                      event={event}
                      funcUpdateClick={handleUpdateClick}
                    />
                  </section>
                  <div className="--spacer-60px"></div>
                  {/* <DotsDivider key={`${index}${event._id}`} /> */}
                </span>
              );
            }
          })}

      {dbData &&
        dbData
          .slice()
          .reverse()
          .map((event, index) => {
            const lastDay = getEventExpiryDate(event);
            if (lastDay < new Date().getTime()) {
              return (
                <span key={`${index}__${event._id}`}>
                  <section key={`${index}_${event._id}`} className='--high-opacity'>
                    <CardManageEvent
                      event={event}
                      funcUpdateClick={handleUpdateClick}
                    />
                  </section>
                  <div className="--spacer-60px"></div>
                  {/* <DotsDivider key={`${index}${event._id}`} /> */}
                </span>
              );
            }
          })}
    </>
  );
}
