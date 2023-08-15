import { EventData, User } from '@/app-types/types'
import React, { useEffect, useState } from 'react'

type Props = {
  event: EventData,
  handleJoinRide: React.MouseEventHandler<HTMLButtonElement>
  handleLeaveRide: React.MouseEventHandler<HTMLButtonElement>,
  userEmail: User['email']
}

export default function JoinRideButton({event, handleLeaveRide, handleJoinRide, userEmail}: Props) {
  const [spinner, setSpinner] = useState(false);
  
  useEffect(() => {
    setSpinner(false);
  }, [event]);

  const spinnerHandler = () => {
    setSpinner(true)
  }

  return (
    <section className="--margin-ltr16px">
            {event.passengers.includes(String(userEmail)) ? (
              <button onClick={(e) => {handleLeaveRide(e); spinnerHandler()}} className="navbar__button  --width60px">
                {spinner? <div className="spinner"></div> : 'Leave'}
              </button>
            ) : event.passengers.length >= event.seatsAvailable ? (
              <button className="navbar__button"> FULL </button>
            ) : (
              <button onClick={(e) => {handleJoinRide(e); spinnerHandler()}} className="action-button-positive">
                {spinner? <div className="spinner"></div> : 'Join'}
              </button>
            )}
          </section>
  )
}
