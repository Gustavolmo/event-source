'use client';
import { getAllUserEvents } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useState } from 'react';
import Loading from '../loadingComponents/Loading';
import SortNewEvents from '../cardComponents/SortNewEvents';
import SortOldEvents from '../cardComponents/SortOldEvents';

export default function ManageEvent() {
  const [updateClick, setUpdateClick] = useState<boolean>(false);
  const { dbData, loading } = useDbQuery(getAllUserEvents, null, updateClick);
  const [doLoader, setDoLoader] = useState<boolean>(true);

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
      <SortNewEvents dbData={dbData} handleUpdateClick={handleUpdateClick} admin={true}/>
      <SortOldEvents dbData={dbData} handleUpdateClick={handleUpdateClick} admin={true}/>
    </>
  );
}
