import React, { useContext } from 'react'
import Categories from './Categories'
// import SearchBar from './SearchBar'
import Sbaby from '../summarycomp/Sbaby';
import Sbreak from '../summarycomp/Sbreak';
import Sbakery from '../summarycomp/Sbakery';
import Schiken from '../summarycomp/Schiken';
import Sclean from '../summarycomp/Sclean';
import Scold from '../summarycomp/Scold';
import Sdairy from '../summarycomp/Sdairy';
import Sfruits from '../summarycomp/Sfruits';
import Shealthy from '../summarycomp/Shealthy';
import Soil from '../summarycomp/Soil';
import Spet from '../summarycomp/Spet';
import Ssnack from '../summarycomp/Ssnack';
import Ssause from '../summarycomp/Ssause';
import Stea from '../summarycomp/Stea';
import Start from '../components/Start';
import { ShopContext } from '../ShopContext';

const summaryConfigs = [
  {
    key: 'Sbaby',
    component: Sbaby,
    category: 'Baby Care',
  },
  {
    key: 'Sbreak',
    component: Sbreak,
    category: 'Breakfast & Dairy',
  },
  {
    key: 'Sbakery',
    component: Sbakery,
    category: 'Bakery & Biscuits',
  },
  {
    key: 'Schiken',
    component: Schiken,
    category: 'Chicken, Meat & Fish',
  },
  {
    key: 'Sclean',
    component: Sclean,
    category: 'Cleaning & Household',
  },
  {
    key: 'Scold',
    component: Scold,
    category: 'Cold Drinks & Juices',
  },
  {
    key: 'Sdairy',
    component: Sdairy,
    category: 'Dairy',
  },
  {
    key: 'Sfruits',
    component: Sfruits,
    category: 'Fruits & Vegetables',
  },
  {
    key: 'Shealthy',
    component: Shealthy,
    category: 'Organic & Healthy Living',
  },
  {
    key: 'Soil',
    component: Soil,
    category: 'Oil & Ghee',
  },
  {
    key: 'Spet',
    component: Spet,
    category: 'Pet Care',
  },
  {
    key: 'Ssnack',
    component: Ssnack,
    category: 'Snacks & Munchies',
  },
  {
    key: 'Ssause',
    component: Ssause,
    category: 'Sauces & Spreads',
  },
  {
    key: 'Stea',
    component: Stea,
    category: 'Tea, Coffee & Beverages',
  },
];

const Home = () => {
  const { searchResults } = useContext(ShopContext);

  // Helper: For a given category, does searchResults include any products?
  const hasResultsForCategory = (category) => {
    if (!Array.isArray(searchResults) || searchResults.length === 0) return false;
    return searchResults.some(item => item.category === category);
  };

  // Check if we're currently searching
  const isSearching = searchResults.length > 0;

  return (
    <div>
      {!isSearching && (
        <>
          <Start/>
          <Categories/>
          {summaryConfigs.map(({ key, component: Comp }) => (
            <Comp key={key} />
          ))}
        </>
      )}
      {isSearching && (
        <>
          {/* Only show the summary components whose category has search results */}
          {summaryConfigs.map(({ key, component: Comp, category }) =>
            hasResultsForCategory(category) ? <Comp key={key} /> : null
          )}
        </>
      )}
    </div>
  )
}

export default Home