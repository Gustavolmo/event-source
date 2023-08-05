'use client';
import { getAllMyEvents } from '@/app-library/DbControls';
import { User } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';

export default function ManageEvent() {
  const [allEvents, setAllEvents] = useState()
  const { data: session, status } = useSession();

  const fetchDbEvents = useCallback(async (sessionEmail: User['email']) => {
    const eventData: any = await getAllMyEvents(sessionEmail);
    setAllEvents(eventData)
  }, [])
  
  useEffect(() => {
      if (status !== 'authenticated') return;
      fetchDbEvents(session.user?.email).catch(console.error)
  }, [fetchDbEvents, session]);

  return (
    <>
      <h2>ManageEvent</h2>
      {JSON.stringify(allEvents)}
    </>
  );
}
