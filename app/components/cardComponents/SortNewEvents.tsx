import { EventData } from '@/app-types/types';
import React from 'react';
import CardManageEvent from './CardManageEvent';
import CardMyInvitation from './CardMyInvitation';

const getEventExpiryDate = (event: EventData) => {
  const dayInMiliSec = 24 * 60 * 60 * 1000;
  let pickupDate: number = new Date(event.pickupDate).getTime() || 0;
  let returnDate: number = new Date(event.returnDate).getTime() || 0;
  let eventEndDate: number = new Date(event.eventEndDate).getTime() || 0;
  let eventDate: number = new Date(event.eventDate).getTime() || 0;
  const datesForCompare = [
    pickupDate + dayInMiliSec,
    returnDate + dayInMiliSec,
    eventEndDate + dayInMiliSec,
    eventDate + dayInMiliSec,
  ];
  return Math.max(...datesForCompare);
};

type Props = {
  dbData: EventData[] | undefined;
  handleUpdateClick: Function;
  admin: boolean;
};

export default function SortNewEvents({
  dbData,
  handleUpdateClick,
  admin,
}: Props) {
  if (dbData)
    return dbData
      .slice()
      .reverse()
      .map((event: EventData, index: number) => {
        const lastDay = getEventExpiryDate(event);
        if (lastDay > new Date().getTime()) {
          return (
            <span key={`${index}__${event._id}`}>
              <section key={`${index}_${event._id}`}>

                {admin ? (
                  <CardManageEvent
                    event={event}
                    funcUpdateClick={handleUpdateClick}
                  />
                ) : (
                  <CardMyInvitation
                    event={event}
                    handleUpdateClick={handleUpdateClick}
                  />
                )}
                
              </section>
              <div className="--spacer-60px"></div>
            </span>
          );
        }
      });
}
