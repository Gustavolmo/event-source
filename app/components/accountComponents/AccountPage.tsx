'use client';
import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import ManageEvent from './ManageEvent';
import MyInvitation from './MyInvitation';
import MyInfo from './MyInfo';
import { useSession } from 'next-auth/react';
import LoadingUi from '../LoadingUi';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [selection, setSelection] = useState<string | null>(
    typeof window !== 'undefined'
      ? localStorage.getItem('lastSelection')
        ? localStorage.getItem('lastSelection')
        : 'info'
      : 'info'
  );

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
          My Info
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
          Manage
        </button>

        <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === 'invitation' ? 'page-button--selected' : 'page-button'
          }
          name="invitation"
        >
          Invitations
        </button>
      </header>

      <section className="account-components">
        {selection === 'info' && <MyInfo />}
        {selection === 'create' && <CreateEvent setSelection={setSelection} />}
        {selection === 'manage' && <ManageEvent/>}
        {selection === 'invitation' && <MyInvitation />}
      </section>
    </>
  );
}
