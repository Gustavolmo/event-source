'use client';
import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import ManageEvent from './ManageEvent';
import MyInvitation from './MyInvitation';
import MyInfo from './MyInfo';

export default function AccountPage() {
  const [selection, setSelection] = useState('create');

  const selectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelection(e.currentTarget.name);
  };

  return (
    <>
      <header className='account-buttons'>
        <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === 'create' ? 'page-button--selected' : 'page-button'
          }
          name="create"
        >
          Create Event
        </button>

        <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === 'manage' ? 'page-button--selected' : 'page-button'
          }
          name="manage"
        >
          Manage Event
        </button>

        <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === 'invitation' ? 'page-button--selected' : 'page-button'
          }
          name="invitation"
        >
          My Invitations
        </button>

        <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === 'info' ? 'page-button--selected' : 'page-button'
          }
          name="info"
        >
          My Info
        </button>
      </header>
      <section className='account-components'>
          {selection === 'create' &&  <CreateEvent/>}
          {selection === 'manage' && <ManageEvent/>}
          {selection === 'invitation' && <MyInvitation/>}
          {selection === 'info' && <MyInfo/>}
      </section>
    </>
  );
}
