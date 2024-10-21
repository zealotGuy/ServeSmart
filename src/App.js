import React, { useState } from 'react';
import Beginner from './Beginner';  // Beginner component
import Intermediate from './Intermediate';  // Intermediate component
import Advanced from './Advanced';  // Advanced component

const App = () => {
  const [selectedTab, setSelectedTab] = useState('Beginner');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Beginner':
        return <Beginner />;
      case 'Intermediate':
        return <Intermediate />;
      case 'Advanced':
        return <Advanced />;
      default:
        return <Beginner />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Updated Tailwind Navbar */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="flex items-center justify-center">
            <div className="flex items-center p-1 border border-blue-600 dark:border-blue-400 rounded-2xl shadow-lg">
              <button
                onClick={() => setSelectedTab('Beginner')}
                className={`${
                  selectedTab === 'Beginner' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400'
                } px-6 py-3 text-sm font-medium capitalize transition-colors duration-300 rounded-2xl md:px-12 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500`}
              >
                Beginner
              </button>
              <button
                onClick={() => setSelectedTab('Intermediate')}
                className={`${
                  selectedTab === 'Intermediate' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400'
                } px-6 py-3 mx-2 text-sm font-medium capitalize transition-colors duration-300 rounded-2xl md:mx-6 md:px-12 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setSelectedTab('Advanced')}
                className={`${
                  selectedTab === 'Advanced' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400'
                } px-6 py-3 text-sm font-medium capitalize transition-colors duration-300 rounded-2xl md:px-12 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500`}
              >
                Advanced
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content rendering based on the selected tab */}
      <div className="mt-4 bg-white p-6 rounded-xl shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
