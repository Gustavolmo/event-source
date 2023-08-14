import { getUserInvitations } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useEffect, useRef, useState } from 'react';
import CardMyInvitation from '../cardComponents/CardMyInvitation';
import DotsDivider from '../DotsDivider';
import Loading from '../Loading';

export default function MyInvitation() {
  const [updateClick, setUpdateClick] = useState<boolean>(false);
  const { dbData, loading } = useDbQuery(getUserInvitations, null, updateClick);
  const [doLoader, setDoLoader] = useState<boolean>(true);

  const handleUpdateClick = () => {
    setDoLoader(false)
    setUpdateClick(!updateClick);
  };

  if (loading && doLoader) {
    return <Loading />
  }

  if (dbData?.length === 0) {
    return (
      <section className="--centered-text">
        <h2>You have no invitations</h2>
      </section>
    )
  }

  return (
    <>
      <h2>INVITATIONS</h2>
      {dbData &&
        dbData.map((event, index) => {
          return (
            <span key={`${index}__${event._id}`}>
              <section key={`${index}_${event._id}`}>
                <CardMyInvitation
                  event={event}
                  handleUpdateClick={handleUpdateClick}
                />
              </section>
              <DotsDivider key={`${index}${event._id}`}/>
            </span>
          );
        })}
    </>
  );
}
