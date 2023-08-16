'use client';
import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import ManageEvent from './ManageEvent';
import MyInvitation from './MyInvitation';
import MyInfo from './MyInfo';
import { useSession } from 'next-auth/react';
import LoadingUi from '../LoadingUi';
import useDbQuery from '@/app/customHooks/useDbQuery';
import { getAllUserEvents, getUserInvitations } from '@/app-library/DbControls';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [renderClick, setRenderClick] = useState(false);
  const { dbData: allEvents } = useDbQuery(getAllUserEvents, null, renderClick);
  const { dbData: allInvites } = useDbQuery(
    getUserInvitations,
    null,
    renderClick
  );
  const [selection, setSelection] = useState<string | null>(
    typeof window !== 'undefined'
      ? localStorage.getItem('lastSelection')
        ? localStorage.getItem('lastSelection')
        : 'create'
      : 'create'
  );

  const handleUpdateCount = () => {
    setRenderClick(!renderClick);
  };

  const selectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelection(e.currentTarget.name);
    localStorage.setItem('lastSelection', e.currentTarget.name);
  };

  if (status !== 'authenticated') {
    return (
      <div className="Loading-ui">
        <LoadingUi />
      </div>
    );
  }

  return (
    <>
      <header className="account-buttons">
        <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === 'info' ? 'page-button--selected' : 'page-button'
          }
          name="info"
        >
          Profile
        </button>

        <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === 'create' ? 'page-button--selected' : 'page-button'
          }
          name="create"
        >
          Create
        </button>

        <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === 'manage' ? 'page-button--selected' : 'page-button'
          }
          name="manage"
        >
          {allEvents && <i>( {allEvents?.length} ) </i>}
          Sent
        </button>

        <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === 'invitation' ? 'page-button--selected' : 'page-button'
          }
          name="invitation"
        >
          {allInvites && <i>( {allInvites?.length} ) </i>}
          Inbox
        </button>
      </header>

      <section className="account-components">
        {selection === 'info' && <MyInfo />}
        {selection === 'create' && (
          <CreateEvent
            setSelection={setSelection}
            handleUpdateCount={handleUpdateCount}
          />
        )}
        {selection === 'manage' && (
          <ManageEvent handleUpdateCount={handleUpdateCount} />
        )}
        {selection === 'invitation' && <MyInvitation handleUpdateCount={handleUpdateCount}/>}
      </section>
    </>
  );
}
