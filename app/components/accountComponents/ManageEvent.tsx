'use client';
import { getAllUserEvents } from '@/app-library/DbControls/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useEffect, useState } from 'react';
import Loading from '../loadingComponents/Loading';
import SortNewEvents from '../cardComponents/SortNewEvents';
import SortOldEvents from '../cardComponents/SortOldEvents';
import { useSession } from 'next-auth/react';
import { updateGoogleEvents } from '@/app-library/GoogleCalendarControls/updateGoogleEvents';
import { updateGoogleInboundEvent } from '@/app-library/GoogleCalendarControls/updateGoogleInbound';
import { updateGoogleOutboundEvent } from '@/app-library/GoogleCalendarControls/updateGoogleOutbound';

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
      updateGoogleInboundEvent(session?.accessToken, 'primary', dbData);
      updateGoogleEvents(session?.accessToken, 'primary', dbData);
      updateGoogleOutboundEvent(session?.accessToken, 'primary', dbData);
    }
  }, [loading]);

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
      <i>*Events updated on google may take time to update in the app</i>
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

