'use client'
import React from 'react';
import Image from 'next/image';
import create from '../../assets/create.png';
import guests from '../../assets/guests.png';
import passengers from '../../assets/passengers.png';
import answers from '../../assets/answer.png';
import joinRide from '../../assets/join-ride.png';
import profile from '../../assets/profile.png';

export default async function AppDescription() {
  const width = '300';
  return (
    <>
      <header className="app-description">
        <h1>
          Welcome to <i className="--red-highlight-text">EventSauce</i>
        </h1>
        <p>We are in Beta, google calendar coming soon...</p>
        <h1>Features</h1>

        <li>Keep track of attendance</li>
        <li>Add and manage transportation</li>
        <li>Manage all guest lists in one place</li>
        <li>Let guests tell you their preferences</li>
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
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Manage Attendance</p>
          <Image
            className="promo-image-unit"
            src={guests}
            alt="manage-events"
            width={width}
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Manage Passengers</p>
          <Image
            className="promo-image-unit"
            src={passengers}
            alt="invitations"
            width={width}
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
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Join Event Transit</p>
          <Image
            className="promo-image-unit"
            src={joinRide}
            alt="user-profile"
            width={width}
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Save Your Preferences</p>
          <Image
            className="promo-image-unit"
            src={profile}
            alt="user-profile"
            width={width}
          />
        </div>

        <div className="--spacer-20px"></div>

      </section>
    </>
  );
}
