import { getUserInvitations } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React from 'react'
import CardMyInvitation from '../cardComponents/CardMyInvitation';

export default function MyInvitation() {
  const [dbData] = useDbQuery(getUserInvitations)

  return (
    <>
      <h2>My Invitations</h2>
      {dbData && dbData.map((event, index) => {
        return (
          <div key={`${index}_${event._id}`}>
            <CardMyInvitation event={event}/>
          </div>
        )
      })}
    </>
  );
}
