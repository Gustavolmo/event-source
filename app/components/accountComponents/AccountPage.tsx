'use client';
import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import ManageEvent from './ManageEvent';
import MyInvitation from './MyInvitation';
import MyInfo from './MyInfo';
import { useSession } from 'next-auth/react';
import LoadingUi from '../loadingComponents/LoadingUi';
import DashboardButton from '../buttonComponents/dashboardButton';

const definedSelectionOnMount = () => {
  return typeof window !== 'undefined'
    ? localStorage.getItem('lastSelection')
      ? localStorage.getItem('lastSelection')
      : 'create'
    : 'create';
};

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [selection, setSelection] = useState<string | null>(
    definedSelectionOnMount()
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
        <DashboardButton
          selectionHandler={selectionHandler}
          selection={selection}
          nameValue={'Profile'}
        />

        <DashboardButton
          selectionHandler={selectionHandler}
          selection={selection}
          nameValue={'Create'}
        />

        <DashboardButton
          selectionHandler={selectionHandler}
          selection={selection}
          nameValue={'Sent'}
        />

        <DashboardButton
          selectionHandler={selectionHandler}
          selection={selection}
          nameValue={'Inbox'}
        />
      </header>

      <section className="account-components">
        {selection === 'Profile' && <MyInfo />}
        {selection === 'Create' && <CreateEvent setSelection={setSelection} />}
        {selection === 'Sent' && <ManageEvent />}
        {selection === 'Inbox' && <MyInvitation />}
      </section>
    </>
  );
}
