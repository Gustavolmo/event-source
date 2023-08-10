import { getUserInvitations } from '@/app-library/DbControls';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useState } from 'react'
import CardMyInvitation from '../cardComponents/CardMyInvitation';

export default function MyInvitation() {
  const [updateClick, setUpdateClick] = useState<boolean>(false)
  const {dbData} = useDbQuery(getUserInvitations, null, updateClick)

  const handleUpdateClick = () => {
    setUpdateClick(!updateClick)
  }

  return (
    <>
      {dbData && dbData.map((event, index) => {
        return (
          <div key={`${index}_${event._id}`}>
            <CardMyInvitation event={event} handleUpdateClick={handleUpdateClick}/>
          </div>
        )
      })}
    </>
  );
}
