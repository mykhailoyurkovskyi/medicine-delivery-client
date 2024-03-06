import React, { useContext } from 'react';

import { MedicineContext } from '../../contexts/MedicineContext';
import Medicine from '../../components/Medicine/Medicine';

const Home = () => {
  const { medicinesFromServer } = useContext(MedicineContext);

  const filteredMedicines = medicinesFromServer.slice(0, 10);

  return (
    <div>
    <section className='py-16'>
      <div className="container mx-auto">
       <div className='grid grid-cols-1 md:grid-cols-2 
       lg:grid-cols-4 xl:grid-cols-5 gap-[30px] 
       max-w-sm mx-auto md:max-w-none md:mx-0'>
        {filteredMedicines.map(medicine => {
          return <Medicine medicine={medicine} key={medicine.id}/>
        })}
       </div>
      </div>
    </section>
  </div>
  );
};

export default Home;