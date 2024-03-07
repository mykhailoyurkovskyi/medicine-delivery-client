import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MedicineContext } from '../../contexts/MedicineContext';
import { CartContext } from '../../contexts/CartContext';

const MedicineDetails = () => {

  const { id } = useParams();
  const { medicinesFromServer } = useContext(MedicineContext);
  const { addToCart } = useContext(CartContext);

  const medicine = medicinesFromServer.find((item) => {
    return item.id === parseInt(id!);
  });

  if (!medicine) {
    return <p>Medicine not found.</p>;
  }

  const { 
    name,
    price,
    photo,
    description,
    dosageInstructions,
    medicinalForm,
    expirationDate
  } = medicine;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{name}</h1>
          <div className="flex mb-4">
            <a className="flex-grow text-indigo-500 border-b-2 
              border-indigo-500 py-2 text-lg px-1">
                Description
            </a>
          </div>

          <p className="leading-relaxed mb-4">{description}</p>

          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Form</span>
            <span className="ml-auto text-gray-900">{medicinalForm}</span>
          </div>

          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Expiration Date</span>
            <span className="ml-auto text-gray-900"> {new Date(expirationDate).toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
              })}
            </span>
          </div>

          <div className="flex border-t border-b mb-6 border-gray-200 py-2">
            <span className="text-gray-500">Dosage Instructions</span>
            <span className="ml-auto text-gray-900">{dosageInstructions}</span>
          </div>

          <div className="flex">
            <span className="title-font font-medium text-2xl text-gray-900">
              ${price}
            </span>

            <button className="flex ml-auto text-white bg-indigo-500 border-0 
              py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              onClick={() => addToCart(medicine, parseInt(id!))}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <img 
          alt="ecommerce" 
          className="max-w-[550px]"  
          src={`http://localhost:3008/${photo}`} 
        />
      </div>
    </div>
  </section>
  );
};

export default MedicineDetails;