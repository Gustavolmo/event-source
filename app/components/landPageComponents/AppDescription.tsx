'use client'
import React from 'react';
import Image from 'next/image';
import create from '../../assets/create-form.png';
import guests from '../../assets/guests.png';
import passengers from '../../assets/passengers.png';
import answers from '../../assets/answer.png';
import joinRide from '../../assets/join-ride.png';
import profile from '../../assets/user-profile.png';

export default async function AppDescription() {
  const width = '332';
  return (
    <>
      <header className="app-description">
        <h1>
          Welcome to <i className="--red-highlight-text">EventSauce</i>
        </h1>
        <p>We are in Beta, google calendar coming soon...</p>
        <h1>Features</h1>

        <p>Keep track of attendance</p>
        <p>Add and manage transportation</p>
        <p>Manage all guest lists in one place</p>
        <p>Let guests tell you their preferences</p>
      </header>

        <h1 className="--promo-text-highlight">FOR PLANNERS</h1>
      <section className="app-description__section">

        <div className="promo-image">
          <p className="promo-title">Create Events</p>
          <Image
            className="promo-image-unit"
            src={create}
            alt="create-form"
            width={width}
            loading='lazy'
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Manage Attendance</p>
          <Image
            className="promo-image-unit"
            src={guests}
            alt="manage-events"
            width={width}
            loading='lazy'
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Manage Passengers</p>
          <Image
            className="promo-image-unit"
            src={passengers}
            alt="invitations"
            width={width}
            loading='lazy'
          />
        </div>
      </section>

        <h2 className="--promo-text-highlight">FOR GUESTS</h2>
      <section className="app-description__section">

        <div className="promo-image">
          <p className="promo-title">Answer Invitations</p>
          <Image
            className="promo-image-unit"
            src={answers}
            alt="user-profile"
            width={width}
            loading='lazy'
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Join Event Transit</p>
          <Image
            className="promo-image-unit"
            src={joinRide}
            alt="user-profile"
            width={width}
            loading='lazy'
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Save Your Preferences</p>
          <Image
            className="promo-image-unit"
            src={profile}
            alt="user-profile"
            width={width}
            loading='lazy'
          />
        </div>

        <div className="--spacer-20px"></div>

      </section>
    </>
  );
}
