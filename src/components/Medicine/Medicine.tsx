import React, { FC, useContext } from 'react';
import { MedicineType } from '../../types/Medicine';
import { BsPlus, BsEyeFill } from 'react-icons/bs'; 
import { Link } from 'react-router-dom';
import { title } from 'process';
import { CartContext } from '../../contexts/CartContext';

interface Props {
  medicine: MedicineType
}

const Medicine: FC<Props> = (props) => {
  const { 
    description,
    dosageInstructions,
    expirationDate,
    id,
    categoryId,
    name,
    price,
    photo 
  } = props.medicine;

  const { addToCart } = useContext(CartContext);

  return (
    <div>
    {/* Product Image */}
      <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex justify-center items-center'>
          <img 
            className='max-h-[160px] group-hover:scale-110 transition duration-300'
            src={`http://localhost:3008/${photo}`}
            alt=''
          />
        </div>

        {/* Buttons */}
        <div className='absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <button onClick={() => addToCart(props.medicine, id)}>
            <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500 rounded-full'>
              <BsPlus className='text-3xl'/>
            </div>
          </button>

          <Link to={`/medicine/${id}`} className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl rounded-full'>
            <BsEyeFill />
          </Link>
          
        </div>
      </div>

      {/* Product Details */}
      <div>
        <Link to={`/medicine/${id}`}>
          <h2 className='font-semibold mb-1'>{name}</h2>
        </Link>
        <div className='font-semibold'>$ {price}</div>
      </div>
  </div>
  );
};

export default Medicine;
