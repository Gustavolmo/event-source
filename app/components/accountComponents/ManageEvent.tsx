'use client';
import { getAllUserEvents } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useState } from 'react';
import CardManageEvent from '../cardComponents/CardManageEvent';
// import DotsDivider from '../DotsDivider';
import Loading from '../Loading';

type Props = {
  handleUpdateCount: Function
}

export default function ManageEvent({handleUpdateCount: handleUpdateSentCount}: Props) {
  const [updateClick, setUpdateClick] = useState<boolean>(false);
  const { dbData, loading } = useDbQuery(getAllUserEvents, null, updateClick);
  const [doLoader, setDoLoader] = useState<boolean>(true);

  const handleUpdateClick = () => {
    setDoLoader(false);
    handleUpdateSentCount()
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
      <h2 className='promo-image'>MANAGE EVENTS</h2>
        {dbData &&
          dbData.slice().reverse().map((event, index) => {
            return (
              <span key={`${index}__${event._id}`}>
                <section key={`${index}_${event._id}`}>
                  <CardManageEvent
                    event={event}
                    funcUpdateClick={handleUpdateClick}
                  />
                </section>
                <div className='--spacer-60px'></div>
                {/* <DotsDivider key={`${index}${event._id}`} /> */}
              </span>
            );
          })}
    </>
  );
}
