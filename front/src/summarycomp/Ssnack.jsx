import React from 'react';
import SummaryCarouselSection from './SummaryCarouselSection';

const Ssnack = () => {
  return (
    <SummaryCarouselSection
      title="Snacks & Munchies"
      category="Snacks & Munchies"
      viewAllTo="/Snacks"
      limit={8}
    />
  );
};

export default Ssnack;