import { EventData, User } from '@/app-types/types'
import React from 'react'

type Props = {
  event: EventData,
  handleJoinRide: React.MouseEventHandler<HTMLButtonElement>
  handleLeaveRide: React.MouseEventHandler<HTMLButtonElement>,
  userEmail: User['email']
}

export default function JoinRideButton({event, handleLeaveRide, handleJoinRide, userEmail}: Props) {
  return (
    <section className="--margin-ltr16px">
            {event.passengers.includes(String(userEmail)) ? (
              <button onClick={handleLeaveRide} className="navbar__button">
                Leave
              </button>
            ) : event.passengers.length >= event.seatsAvailable ? (
              <button className="navbar__button"> FULL </button>
            ) : (
              <button onClick={handleJoinRide} className="action-button">
                Join
              </button>
            )}
          </section>
  )
}
