'use client';
import { EventData } from '@/app-types/types';
import React, { useState } from 'react';
import { deleteEvent } from '@/app-library/DbControls';
import CardManageEditMode from './CardManageEditMode';
import CardManageBig from './CardManageBig';
import CardManageSmall from './CardManageSmall';

type Props = {
  event: EventData;
  funcUpdateClick: Function;
};

export default function CardManageEvent({
  event,
  funcUpdateClick: funcUpdateClick,
}: Props) {
  const [seeGuests, setSeeGuests] = useState(true);
  const [seeAccepted, setSeeAccepted] = useState(false);
  const [seeVirtual, setSeeVirtual] = useState(false);
  const [seeRejected, setSeeRejected] = useState(false);
  const [seePax, setSeePax] = useState(false);
  const [seeAboutTransit, setSeeAboutTransit] = useState(false);
  const [seeAboutEvent, setSeeAboutEvent] = useState(false);
  const [toggleCard, setToggleCard] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);

  const handleListToggle = (list: boolean, cb: Function) => {
    cb(!list);
  };

  const handleDelete = () => {
    deleteEvent(event._id);
    funcUpdateClick();
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleEventToggle = () => {
    setToggleCard(!toggleCard);
  };

  const handleOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };

  if (edit) {
    return (
      <CardManageEditMode
        event={event}
        handleEdit={handleEdit}
        funcUpdateClick={funcUpdateClick}
      />
    );
  }

  if (!toggleCard) {
    return (
      <CardManageSmall
        event={event}
        handleEventToggle={handleEventToggle} />
    );
  }

  return (
    <CardManageBig
      event={event}
      funcUpdateClick={funcUpdateClick}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleEventToggle={handleEventToggle}
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
      seeAboutTransit={seeAboutTransit}
      setSeeAboutTransit={setSeeAboutTransit}
      handleOpenDialogue={handleOpenDialogue}
      handleCloseDialogue={handleCloseDialogue}
      openDialogue={openDialogue}
    />
  );
}
