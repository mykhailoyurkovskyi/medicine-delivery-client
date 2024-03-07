import React, { useContext, useState } from 'react';

import { MedicineContext } from '../../contexts/MedicineContext';
import Medicine from '../../components/Medicine/Medicine';
import Hero from '../../components/Hero/Hero';
import travolta from '../../assests/pulp-fiction-john-travolta.gif';

const Home = () => {
  const { medicinesFromServer } = useContext(MedicineContext);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleFilterChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSortBy(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: { target: { value: string; }; }) => {
    setItemsPerPage(parseInt(event.target.value));
  };


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  const filteredAndSortedMedicines = medicinesFromServer
    .filter(medicine => medicine.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

    const paginatedMedicines = filteredAndSortedMedicines.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredAndSortedMedicines.length / itemsPerPage);

  return (
    <div>
      <Hero />
    <section className='py-16'>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
        
          {/* Filter input */}
          <input
            type="text"
            placeholder="Search by name..."
            value={filter}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        
          {/* Sort select */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 dark:bg-gray-700 
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
              dark:focus:border-blue-500"
          >
            <option value="">Sort by</option>
            <option value="price">Price</option>

          </select>

          {/* Sort order toggle button */}
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 border-0 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 
              active:bg-indigo-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500 w-[150px]"
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>

          {/* Items per page select */}
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          {/* Add more options if needed */}
        </select>
        </div>

        

        {/* Display medicines or message if there are no results */}
          {filteredAndSortedMedicines.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
              {paginatedMedicines.map(medicine => (
                <Medicine medicine={medicine} key={medicine.id} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <img src={travolta} alt='' />
            </div>
          )}
        </div>

        {/* Pagination */}
       <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-2 border border-gray-300 rounded-md mx-1 ${currentPage === i + 1 ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      </section>
    </div>
  );
};

export default Home;