import { getUserInvitations } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useState } from 'react';
import CardMyInvitation from '../cardComponents/CardMyInvitation';
import DotsDivider from '../DotsDivider';

export default function MyInvitation() {
  const [updateClick, setUpdateClick] = useState<boolean>(false);
  const { dbData } = useDbQuery(getUserInvitations, null, updateClick);

  const handleUpdateClick = () => {
    setUpdateClick(!updateClick);
  };

  return (
    <>
      <h2>INVITATIONS</h2>
      {dbData &&
        dbData.map((event, index) => {
          return (
            <>
              <section className="event-card" key={`${index}_${event._id}`}>
                <CardMyInvitation
                  event={event}
                  handleUpdateClick={handleUpdateClick}
                />
              </section>
              <DotsDivider/>
            </>
          );
        })}
    </>
  );
}
