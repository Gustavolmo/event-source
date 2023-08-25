'use client';
import { getAllUserEvents } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useEffect, useState } from 'react';
import Loading from '../loadingComponents/Loading';
import SortNewEvents from '../cardComponents/SortNewEvents';
import SortOldEvents from '../cardComponents/SortOldEvents';
import { getGoogleEventUpdate } from '@/app-library/GoogleCalendarControls/updateGoogleEvents';
import { useSession } from 'next-auth/react';
import { getGoogleEventUpdateInbound } from '@/app-library/GoogleCalendarControls/updateGoogleInbound';
import { getGoogleEventUpdateOutbound } from '@/app-library/GoogleCalendarControls/updateGoogleOutbound';

export default function ManageEvent() {
  const { data: session, status } = useSession();
  const [updateClick, setUpdateClick] = useState<boolean>(false);
  const { dbData, loading } = useDbQuery(getAllUserEvents, null, updateClick);
  const [doLoader, setDoLoader] = useState<boolean>(true);

  useEffect(() => {
    if (loading) return;
    if (dbData && dbData.length === 0) return;
    if (status !== 'authenticated') return;

    if (dbData && session.accessToken) {
      getGoogleEventUpdate(session?.accessToken, 'primary', dbData);
      getGoogleEventUpdateInbound(session?.accessToken, 'primary', dbData);
      getGoogleEventUpdateOutbound(session?.accessToken, 'primary', dbData);
    }
  }, [loading, session]);

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
      <SortNewEvents
        dbData={dbData}
        handleUpdateClick={handleUpdateClick}
        admin={true}
      />
      <SortOldEvents
        dbData={dbData}
        handleUpdateClick={handleUpdateClick}
        admin={true}
      />
    </>
  );
}
function getGoogleCalendarData() {
  throw new Error('Function not implemented.');
}
