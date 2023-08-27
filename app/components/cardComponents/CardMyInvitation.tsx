import { EventData } from '@/app-types/types';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  addGuestToListController,
  removeGuestFromList,
} from '@/app-library/InvitationControls';
import CardMyInvitationSmall from './CardMyInvitationSmall';
import CardMyInvitationBig from './CardMyInvitationBig';

type Props = {
  event: EventData;
  handleUpdateClick: Function;
};

export default function CardMyInvitation({ event, handleUpdateClick }: Props) {
  const { data: session, status } = useSession();
  const [seeGuests, setSeeGuests] = useState(false);
  const [seeAccepted, setSeeAccepted] = useState(false);
  const [seeVirtual, setSeeVirtual] = useState(false);
  const [seeRejected, setSeeRejected] = useState(false);
  const [seePax, setSeePax] = useState(false);
  const [seePaxOutbound, setSeePaxOutbound] = useState(false);
  const [seeAboutTransit, setSeeAboutTransit] = useState(false);
  const [seeAboutEvent, setSeeAboutEvent] = useState(false);
  const [toggleCard, setToggleCard] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);

  const handleListToggle = (list: boolean, cb: Function) => {
    cb(!list);
  };

  const deleteInvitation = () => {
    handleUpdateClick();
    removeGuestFromList(session?.user?.email, event._id, 'invited');
    removeGuestFromList(session?.user?.email, event._id, 'maybeAccepted');
    removeGuestFromList(session?.user?.email, event._id, 'rejected');
    removeGuestFromList(session?.user?.email, event._id, 'acceptedLive');
    removeGuestFromList(session?.user?.email, event._id, 'passengersInbound');
    removeGuestFromList(session?.user?.email, event._id, 'passengersOutbound');
  };

  const handleOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };

  const handleAcceptInvitation = () => {
    addGuestToListController(session?.user?.email, event._id, 'acceptedLive');
    handleUpdateClick();
  };

  const handleAcceptVirtually = () => {
    addGuestToListController(session?.user?.email, event._id, 'maybeAccepted');
    handleUpdateClick();
  };

  const handleRejectInvitation = () => {
    addGuestToListController(session?.user?.email, event._id, 'rejected');
    handleUpdateClick();
  };

  const handleJoinRideInbound = () => {
    addGuestToListController(
      session?.user?.email,
      event._id,
      'passengersInbound'
    );
    handleUpdateClick();
  };

  const handleLeaveRideInbound = () => {
    removeGuestFromList(session?.user?.email, event._id, 'passengersInbound');
    handleUpdateClick();
  };

  const handleJoinRideOutbound = () => {
    addGuestToListController(
      session?.user?.email,
      event._id,
      'passengersOutbound'
    );
    handleUpdateClick();
  };

  const handleLeaveRideOutbound = () => {
    removeGuestFromList(session?.user?.email, event._id, 'passengersOutbound');
    handleUpdateClick();
  };

  const handleEventToggle = () => {
    setToggleCard(!toggleCard);
  };

  if (!toggleCard) {
    return (
      <CardMyInvitationSmall
        event={event}
        handleEventToggle={handleEventToggle}
        handleAccept={handleAcceptInvitation}
        handleAcceptVirtually={handleAcceptVirtually}
        handleReject={handleRejectInvitation}
        handleJoinRideInbound={handleJoinRideInbound}
        handleLeaveRideInbound={handleLeaveRideInbound}
        handleJoinRideOutbound={handleJoinRideOutbound}
        handleLeaveRideOutbound={handleLeaveRideOutbound}
      />
    );
  }

  return (
    <CardMyInvitationBig
      event={event}
      handleEventToggle={handleEventToggle}
      handleAccept={handleAcceptInvitation}
      handleAcceptVirtually={handleAcceptVirtually}
      handleReject={handleRejectInvitation}
      handleJoinRideInbound={handleJoinRideInbound}
      handleLeaveRideInbound={handleLeaveRideInbound}
      handleJoinRideOutbound={handleJoinRideOutbound}
      handleLeaveRideOutbound={handleLeaveRideOutbound}
      handleUpdateClick={handleUpdateClick}
      handleListToggle={handleListToggle}
      seeGuests={seeGuests}
      setSeeGuests={setSeeGuests}
      seeAccepted={seeAccepted}
      setSeeAccepted={setSeeAccepted}
      seeVirtual={seeVirtual}
      setSeeVirtual={setSeeVirtual}
      seeRejected={seeRejected}
      setSeeRejected={setSeeRejected}
      seeAboutEvent={seeAboutEvent}
      setSeeAboutEvent={setSeeAboutEvent}
      seePax={seePax}
      setSeePax={setSeePax}
      seePaxOutbound={seePaxOutbound}
      setSeePaxOutbound={setSeePaxOutbound}
      seeAboutTransit={seeAboutTransit}
      setSeeAboutTransit={setSeeAboutTransit}
      handleOpenDialogue={handleOpenDialogue}
      handleCloseDialogue={handleCloseDialogue}
      deleteInvitation={deleteInvitation}
      openDialogue={openDialogue}
    />
  );
}
