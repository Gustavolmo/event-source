import React, { useEffect } from 'react';
import quotes from '../quotes';
import DotsDivider from './DotsDivider';

export default function EasterEgg() {
  const randomQuoteNumber = () => {
    return Math.floor(Math.random() * 15);
  };

  return (
    <section className="easter-egg">
      <cite>{quotes[randomQuoteNumber()]}</cite>
      <DotsDivider />
    </section>
  );
}
