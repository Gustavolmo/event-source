import React, { useEffect } from 'react';
import quotes from '../quotes';
import DotsDivider from './DotsDivider';

type Props = {
  divider?: boolean
}

export default function EasterEgg({divider}: Props) {
  const randomQuoteNumber = () => {
    return Math.floor(Math.random() * 15);
  };

  return (
    <section className="easter-egg">
      <cite>{quotes[randomQuoteNumber()]}</cite>
    </section>
  );
}
