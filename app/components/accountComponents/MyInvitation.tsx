import { getUserInvitations } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useState } from 'react';
import Loading from '../loadingComponents/Loading';
import SortNewEvents from '../cardComponents/SortNewEvents';
import SortOldEvents from '../cardComponents/SortOldEvents';

export default function MyInvitation() {
  const [updateClick, setUpdateClick] = useState<boolean>(false);
  const { dbData, loading } = useDbQuery(getUserInvitations, null, updateClick);
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
        <h2>You have invitations</h2>
      </section>
    );
  }

  return (
    <>
      <h2 className="promo-image">
        INBOX <i className="--grey-text">( {dbData && dbData.length} )</i>
      </h2>
        <SortNewEvents dbData={dbData} handleUpdateClick={handleUpdateClick} admin={false}/>
        <SortOldEvents dbData={dbData} handleUpdateClick={handleUpdateClick} admin={false}/>
    </>
  );
}
