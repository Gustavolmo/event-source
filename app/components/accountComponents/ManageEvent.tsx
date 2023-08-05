'use client';
import { getAllMyEvents } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React from 'react';

export default function ManageEvent() {
  const [dbData] = useDbQuery(getAllMyEvents)

  return (
    <>
      <h2>ManageEvent</h2>
      {JSON.stringify(dbData)}
    </>
  );
}
