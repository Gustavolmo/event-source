import React from 'react';
import quotes from '../quotes';

export default function EasterEgg() {
  const randomQuoteNumber = () => {
    return Math.floor(Math.random() * 14);
  };

  return (
    <section className="easter-egg">
      <cite>{quotes[randomQuoteNumber()]}</cite>
    </section>
  );
}
