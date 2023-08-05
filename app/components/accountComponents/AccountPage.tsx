'use client';
import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import ManageEvent from './ManageEvent';
import MyInvitation from './MyInvitation';
import MyInfo from './MyInfo';
import Greeting from '../Greeting';

export default function AccountPage() {
  const [selection, setSelection] = useState(localStorage.getItem('lastSelection') || 'info');

  const selectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelection(e.currentTarget.name);
    localStorage.setItem('lastSelection', e.currentTarget.name)
  };

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
      </header>

      <div className='greeting-image'>
        <Greeting />
      </div>

      <section className="account-components">
        {selection === 'info' && <MyInfo />}
        {selection === 'create' && <CreateEvent />}
        {selection === 'manage' && <ManageEvent />}
        {selection === 'invitation' && <MyInvitation />}
      </section>
    </>
  );
}
